<template lang="pug">
.container.is-fullhd.noisy
  .section 
    .box.is-paddingless(style="background-color: rgba(255, 255, 255, 0.7)")
      .columns.is-gapless(style="height: 250px")
        #switch-buttons-block.column.is-one-quarter
          #photocamera-button.tabs_button.tabs_button_fade(:class="{active_tab_button: pageSelector==='photo'}", @click="setTab('photo')")
          #videocamera-button.tabs_button.tabs_button_fade(:class="{active_tab_button: pageSelector==='video'}", @click="setTab('video')")
          .simple_button(v-if='isOwner && inEditMode', id='done_edit_portfolio_button', @click="inEditMode=false")
          .simple_button(v-if='isOwner && !inEditMode',id='edit_portfolio_button', @click="inEditMode=true")
        #categories_container.tabs_container_fade.column.is-one-third
          .columns.is-gapless(style="height:100%;")
            #photo-categories-block.tab_item_fade.column.is-half(:class="{active_tab_fade: pageSelector==='photo'}")
              .media(v-for="(offer, index) in appliedPhotoCategories", :key="index")
                .media-content
                  .content {{offer}}
                .media-right
                  button.button.delete(v-if="isOwner && inEditMode", @click="deletePhotoOffer(offer)")
              .horizontal_flex(v-if="isOwner")
                .link-to-category(v-if="isOwner && inEditMode", @click="addPhotoOffer") Добавить
            #video-categories-block.tab_item_fade.column.is-half(:class="{active_tab_fade: pageSelector==='video'}")
              .horizontal_flex(v-for="offer in appliedVideoCategories")
                .photo-category.link-to-category {{offer}}
                .delete_button(v-if="isOwner && inEditMode")
              .horizontal_flex(v-if="isOwner")
                .link-to-category(v-if="isOwner && inEditMode", @click="addVideoOffer") Добавить
        .info_and_avatar_block.column.is-one-quarter
          .card
            .card-image
              router-link(:to='$store.getters.linkToProfile')
                img.avatar-photo(:src='avatar')
            .card-footer
              .card-footer-item {{`${name} ${surname}`}}
        #rating-regards-block.column.is-one-third(style="height: 100%")
          interactive-rating(v-if="!!portfolio.rating", :prop_portfolio_id="portfolio.id", :prop_rating="portfolio.rating", :prop_state="ratingState")  
  .container#contact-and-info-buttons-block
    b-tabs(type="is-toggle", position="is-centered", :animated="false")
      b-tab-item(label="Контакты")
        .box(style="max-width: 400px; margin: 0 auto")
          b-field(label="Телефон", v-if="!!profile.phone_number")
            div {{profile.phone_number}}
          b-field(label="E-Mail", v-if="!!profile.social_email")
            div {{profile.social_email}}  
      b-tab-item(label="Об авторе", disabled)
        .box(style="max-width: 400px; margin: 0 auto")
  .section
    .tabs_container
      .tab_item(v-if="pageSelector==='photo'")
        b-collapse.card.is-primary(:open.sync="openedPhotos")
          .card-header(slot="trigger")
            p.card-header-title.is-centered Фотосъемка
            a.card-header-icon
              b-icon(:icon="openedPhotos ? 'menu-down' : 'menu-up'")
          .card-content
            .content
              .shooting-block.columns.is-gapless(v-for="offer in photoOffers")
                .shooting-description-block.column.is-2
                  .card.is-shadowless
                    .card-content
                      p {{offer.category}}
                    .card-footer
                      .card-footer-item
                        div.is-size-5 {{`${offer.price}  `}}
                        div.is-size-7 РУБ
                      .card-footer-item(v-if="isOwner && inEditMode")
                        span.icon(@click="addNewItem(offer.category)")
                          i.mdi.mdi-48px.mdi-dark.mdi-plus
                .swiper-container.column(:data-category="offer.category")
                  .swiper-wrapper
                    .swiper-slide(v-for="photo in photos", v-if="photo.category === offer.category")
                      img(:src="'/api/uploads/' + photo.path", @click="openImageInModal")
                  .swiper-button-prev
                  .swiper-button-next

      .tab_item(v-if="pageSelector==='video'")
        b-collapse.card.is-primary(:open.sync="openedVideos")
          .card-header(slot="trigger")
            p.card-header-title.is-centered Видеосъемка
            a.card-header-icon
              b-icon(:icon="openedVideos ? 'menu-down' : 'menu-up'")
          .card-content
            .content
              .videography-block(v-for="offer in videoOffers")
                .videography-description-block
                  div {{offer.category}}
                  div(style="font-size: 0.8em") {{offer.price.toFixed(0) + " РУБ/ЧАС"}}
                  .add-new-item(v-if="isOwner && inEditMode", @click="addNewItem")
                .slider-container       
  .section
    b-collapse.card.is-primary(:open.sync="openedComments")
      .card-header(slot="trigger")
        p.card-header-title.is-centered Комментарии
        a.card-header-icon
          b-icon(:icon="openedComments ? 'menu-down' : 'menu-up'")
      .card-content
        .content
          comment(v-for="comment in comments", :comment_data="comment", key="comment.id")
          new-comment(:portfolio_id="portfolio.id", :portfolio_user_id="portfolio.userId", :user="$store.getters.currentUser.username", :avatarsrc="avatar")
  b-loading(:active="!loaded")     
</template>
<script>
/* eslint-disable no-unused-vars */
import Vue from '@/vue-instance'
import EventBus from '@/eventbus'
import Naming from '@/store/naming';
import Spoiler from '@/components/global/spoiler.vue'
import Comment from '@/components/global/comment.vue'
import NewComment from '@/components/global/new-comment.vue'
import InteractiveRating from '@/components/portfolio/interactive-rating';
import Uploader from '@/components/global/uploader'
const UploaderConstructor = Vue.component('uploader', Uploader)
import NewOffer from '@/components/portfolio/add-new-offer'
const NewOfferConstructor = Vue.component('add-new-offer', NewOffer)
import Swiper from 'swiper';
import Consts from '@/consts';
import defaultAvatar from '@/assets/images/default-avatar-space-astronaut.png'
const TAG = "Portfolio";
const photoCategories = Consts.PHOTO_CATEGORIES;
const videoCategories = Consts.VIDEO_CATEGORIES;
const PHOTO_PAGE = 'photo';
const VIDEO_PAGE = 'video';

export default {
  name: "",
  data: () => ({
    loaded: false,
    inEditMode: false,
    pageSelector: PHOTO_PAGE,
    swipers: {},
    openedComments: false,
    openedPhotos: true,
    openedVideos: true,
    userId: null,
  }),
  components: {
    Comment, Spoiler, NewComment, InteractiveRating
  },
  beforeRouteEnter (to, from, next) {

    next(vm => {
      vm.userId = to.params.id
      if(vm.$store.getters.portfolioByUserId(to.params.id)){
        vm.loaded = true;
      } else {
        vm.$store.dispatch(Naming.Actions.GET_PORTFOLIO, {userId: to.params.id})
        .then(() => {
          vm.loaded = true;
        })
        .catch(err => {
          vm.$log.error(TAG, err);
        })
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.loaded = false;
    this.userId = to.params.id
    if(this.$store.getters.portfolioByUserId(to.params.id)){
      this.loaded = true;
    } else {
      this.$store.dispatch(Naming.Actions.GET_PORTFOLIO, {userId: to.params.id})
      .then(() => {
        this.loaded = true;
      })
      .catch(err => {
        this.$log.error(TAG, err);
      })
    }
  },
  computed: {
    isOwner() {
      return this.$store.getters.currentUser && this.portfolio.userId === this.$store.getters.currentUser.id;
    },
    portfolio(){
      return this.$store.getters.portfolioByUserId(this.userId) || {}
    },
    user() {
      return this.portfolio.user || {};
    },
    avatar(){
      return this.profile.avatar || defaultAvatar;
    },
    profile() {
      return this.user.profile || {};
    },
    name(){
      return this.profile.name || '';
    },
    surname(){
      return this.profile.surname || '';
    },
    signed_in(){
      return true;
    },
    comments(){
      return this.portfolio.comments;
    },
    photos(){
      return this.user.photos;
    },
    photoOffers(){
      return this.portfolio.photoOffers;
    },
    videoOffers(){
      return this.portfolio.videoOffers;
    },
    appliedPhotoCategories(){
      if(!this.photoOffers){
        return [];
      }
      let categories = this.photoOffers.reduce(function(prev, curr) {
        const cat = curr.category;
        return prev.includes(cat) ? prev : [...prev, cat];
      }, []);
      return categories;
    },
    appliedVideoCategories(){
      if(!this.videoOffers){
        return [];
      }
      let categories = this.videoOffers.reduce(function(prev, curr) {
        const cat = curr.category;
        return prev.includes(cat) ? prev : [...prev, cat];
      }, []);
      return categories;
    },
    availablePhotoCategories(){
      return photoCategories.filter(cat => !this.appliedPhotoCategories.includes(cat));
    },
    availableVideoCategories(){
      return videoCategories.filter(cat => !this.appliedVideoCategories.includes(cat));
    },
    ratingState() {
      return this.isOwner ? 'static' : 'interactive';
    }
  },
  created() {
    this.pageSelector = [VIDEO_PAGE, PHOTO_PAGE].includes(this.$route.query.tab ) ? this.$route.query.tab : PHOTO_PAGE;
  },
  methods: {
    openImageInModal(e){
      const img = document.createElement('img');
      img.src = e.target.src;
      this.showPopup(img)
    },
    deletePhotoOffer(category){
      const offer = this.photoOffers.find(offer => offer.category === category);
      this.$store.dispatch(Naming.Actions.DELETE_PHOTO_OFFER, {
        id: offer.id,
        userId: this.portfolio.userId,
      })
    },
    addPhotoOffer(){
      const form = new NewOfferConstructor({
        propsData: {
          mode: 'photo',
          categories: this.availablePhotoCategories,
          portfolio_id: this.portfolio.id,
          portfolio_user_id: this.portfolio.userId,
        }
      })
      form.$store = this.$store
      form.$mount();
      this.showPopup(form.$el);
    },
    addVideoOffer(){
      this.$store.dispatch(Naming.Actions.POST_VIDEO_OFFER, {
        portfolioId: this.portfolio.id,
        category: this.availableVideoCategories[Math.floor(Math.random() * this.availableVideoCategories.length)],
        price: Math.floor(Math.random() * 1000),
        description: 'test item'
      })
    },
    addNewItem(category){
      const uploader = new UploaderConstructor();
      uploader.category = category;
      uploader.$store = this.$store;
      uploader.$mount();
      this.showPopup(uploader.$el);
    },
    removePhoto(id){

    },
    setTab(tab){
      this.pageSelector = tab;
      this.$router.push(this.$route.path + `?tab=${tab}`)
    }
  },

  mounted(){
    const stopper = setInterval(()=>{
      if(this.loaded){
        const sliders = this.$el.querySelectorAll('.swiper-container');
        this.$log.info(i)
        for (var i = 0; i < sliders.length; ++i) {
          this.$log.info(i)
          var item = sliders[i];
          this.swipers[item.dataset.category] = new Swiper (item, {
            // Navigation arrows
            slidesPerView: 'auto',
            grabCursor: true,
            spaceBetween: 10,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        }
        clearInterval(stopper)
      }
    },1000)
    EventBus.$on(EventBus.Events.PHOTO_UPDATE, ({photos}) => {
      const affectedCategories = [];
      photos.forEach(photo => {
        this.photos.unshift(photo);
        if(!affectedCategories.includes(photo.category)){
          affectedCategories.push(photo.category)
        }
      })
      this.$nextTick(done => {
        affectedCategories.forEach(category => {
          this.swipers[category].update();
        })
      })
    });

  },
  watch: {
    photos(){
      Object.values(this.swipers).forEach(swiper => {
        swiper.update();
      })
    }
  }

}
</script>
<style lang="stylus" scoped>
@import "~assets/css/consts"

.portfolio-main-section
  display flex
  width 100%
  height 300px
  min-height 300px
  max-height 600px
  background url("~assets/images/subtle_zebra_3d.png") repeat
  @media only screen and (max-width: $header-critical-size)
    height 600px
    flex-wrap wrap

#switch-buttons-block
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
  width 10%
  height 100%
  min-width 10%
  order 1
  @media only screen and (max-width: $header-critical-size)
    order 3
    height 50%
    flex-grow 1
    min-width 100px
    width 20%

#photocamera-button, #videocamera-button
  margin-top 20px
  width 50px
  height 50px
  background: url('~assets/images/photo-camera.png') no-repeat
  background-size cover
  opacity 0.5

#videocamera-button
  background: url('~assets/images/video-camera.png') no-repeat
  background-size cover
  margin-bottom 20px

#photocamera-button:hover, #videocamera-button:hover
  cursor pointer
  -webkit-filter drop-shadow(2px 2px 2px black)

#categories_container
  width 30%
  height 100%
  order 2
  @media only screen and (max-width: $header-critical-size)
    height 50%
    flex-grow 8
    min-width 200px
    width 80%
    order 4

  @media only screen and (max-width: 520px)
    width auto

#photo-categories-block
  float left
  width 50%
  height 100%
  background rgba(128, 128, 128, 0.5)

#video-categories-block
  float left
  width 50%
  height 100%
  background rgba(128, 128, 128, 0.5)

.link-to-category
  display block
  text-decoration none
  color black

.link-to-category:nth-child(1)
  margin-top: 20px

.link-to-category:hover
  filter drop-shadow(2px 2px 2px black)

.info_and_avatar_block
  width 20%
  height 100%
  min-width 100px
  border-left 1px solid lightgray
  border-right 1px solid lightgray
  order 3
  @media only screen and (max-width: $header-critical-size)
    background lightgrey
    height 50%
    width 50%
    order 1

.avatar-photo
  display block
  height 100%
  width auto
  max-width 120px
  max-height 120px
  margin 20px auto
  margin-top 50px
  border-radius 20%
  border 2px solid black

.name-surname-block
  margin-top 20px
  height 100px


#rating-regards-block
  display flex
  justify-content center
  align-items center
  width 40%
  height 100%
  order 4
  @media only screen and (max-width: $header-critical-size)
    background lightgrey
    height 50%
    width 50%
    order 2

.name-of-author
  display block
  margin 4px auto
  text-align center
  font-size 0.9em

#contact-author-button, #show-info-author-button
  margin 10px auto
  width 200px
  height 25px
  border 1px solid black
  background white
  padding 10px
  text-align center

#contact-author-button
  background #BBFFBB


#contact-author-button:hover, #show-info-author-button:hover
  cursor: pointer
  background: #d3d3d3

.moving-block-with-information
  width 100%
  background white
  padding 10px
  margin-top 10px

#onButton-clicked-author-block
  display block

.one-information-row
  width 50%
  text-align center
  margin 5px auto

.container-for-adding-shootings
  display flex
  align-items center
  justify-content center
  min-height 200px

.photo-block, .video-block
  display inline-block
  border 2px gray solid
  width 100px
  height 75px

.shooting-block, .videography-block
  display flex
  min-width 280px
  height 120px
  justify-content space-between
  align-content center
  align-items center
  margin 10px auto
  background rgba(255, 255, 255, 0.7)
  border-radius 20px;
  overflow hidden
  @media only screen and (min-width: $screen-xsm-min)
    height: 140px

  @media only screen and (min-width: $screen-sm-min)
    height: 160px

  @media only screen and (min-width: $screen-md-min)
    height: 180px

  @media only screen and (min-width: $screen-lg-min)
    height 200px

.shooting-description-block, .videography-description-block
  display flex
  flex-direction column
  justify-content center
  align-content center
  align-items center
  flex-grow 1
  flex-basis 100px
  box-sizing border-box
  min-height 120px
  height 100%
  min-width 120px
  max-width 250px
  text-align center
  font-size 1.5em
  padding 20px
  background-color rgba(230, 230, 230, 0.2)

.shooting-description-block-inner
  box-sizing border-box
  background rgba(150, 150, 150, 0.5)
  width 90%
  margin 0 auto
  height 90%
  min-height 208px
  border-radius 10px
  border 15px solid white

.scrollable-content-block
  display inline-block
  overflow hidden
  height 250px

.shooting-photo-block, .videography-video-block
  height 100px
  border 2px solid white
  width 150px
  display inline-block
  margin 0

.photo-preview, .video-preview
  display inline-block
  margin 0
  max-width 250px
  max-height 250px
  width auto
  height auto

.form-for-new-photo, .form-for-new-video
  width 80%
  margin 10px auto

.form-for-new-video
  height 300px

.shooting-add-block, .shooting-existed-block
  text-align center
  min-height 150px
  height 80%
  border 2px solid white
  width 80%
  display inline-block
  margin 10px
  border-radius 10px
  background: white url('~assets/images/plus.png') no-repeat
  background-position center
  background-size 50% auto
  text-decoration none
  color black
  vertical-align top

.shooting-existed-block
  background-image none

.form-for-shooting-add-block
  display block
  min-height 150px
  height 80%
  width 10%
  margin 0
  text-align center

#comments
  display: block
  width: 100%

.track
  flex-grow 10
  min-width 160px
  flex-basis 160px
  position relative
  height 100%

.view-port
  width 100%
  height 100%
  overflow hidden
  position relative

.silverlight-item
  position absolute
  width 160px
  height 120px
  margin-right 8px

  @media only screen and (min-width: $screen-xsm-min)
    height 140px
    width 180px

  @media only screen and (min-width: $screen-sm-min)
    height 160px
    width 210px

  @media only screen and (min-width: $screen-md-min)
    height 180px
    width 240px

  @media only screen and (min-width: $screen-lg-min)
    height 200px
    width 265px

.slick-list.draggable, .slick-track
  height 100%

.video_plugin_container
  position relative
  height 100%
  width 100%
  max-width 220px
  margin-right 5px

.image_plugin_container
  position relative
  height 100%
  margin-right 5px

.add-new-item
  display block
  width calc(100% - 40px)
  height 100%
  background url("~assets/images/icons/add_icon.png") no-repeat 50% 50%
  background-size 50%

.img-in-gallery
  display block
  height 100%
  width auto
  min-height 120px
  max-width 100%
  max-height 250px
  margin 0 auto

.track a.prev, .track a.next
  display block
  position absolute
  top 50%
  margin-top -32px
  width 64px
  height 64px
  background url("~assets/images/arrows.png")
  background-repeat no-repeat

.track a.prev.disabled, .track a.next.disabled
  display none

.track a.prev
  left 0
  background-position 0 0

.track a.prev:hover
  background-position 0 -66px

.track a.prev:active
  background-position 0 -132px

.track a.next
  right 0
  background-position: -64px 0

.track a.next:hover
  background-position -64px -132px

.track a.next:active
  background-position -64px -198px

.tab_item_fade
  opacity 0.5
  pointer-events none

.active_tab
   display block

.active_tab_fade
  opacity 1
  pointer-events:auto

.active_tab_button
  opacity 1 !important

.info_and_avatar_block
  .card
  .card-footer
  .card-footer-item
    box-shadow none
    background none 
    border none
  .card
    max-width 200px
    height 100%
    margin auto
    img.avatar-photo
      min-width 120px
      min-height 120px
#categories_container
  .media
    padding 10px
  .media + .media
    border none
    margin 0
    padding 10px      
#contact-and-info-buttons-block
  section.tab-content
    min-height 0    
.noisy
  background url('~assets/images/noisy_grid.png') repeat    
.collapse
  &.card
    .card-header
      background: black
      .card-header-title
        color white  
span.icon
  cursor pointer
  transition 0.15s
  &:hover
    transform scale(1.1)        
</style>
