<template lang="pug">
.page-wrapper
  .portfolio-main-section
    #switch-buttons-block
      #photocamera-button.tabs_button.tabs_button_fade.active_tab_button.active_tab_button_fade(clicked='true')
      #videocamera-button.tabs_button.tabs_button_fade(clicked='false')
      .simple_button(v-if='isOwner && inEditMode', id='done_edit_portfolio_button')
      .simple_button(v-if='isOwner && !inEditMode',id='edit_portfolio_button')
    #categories_container.tabs_container_fade
      #photo-categories-block.tab_item_fade.active_tab_fade
        .horizontal_flex(v-for="offer in appliedPhotoCategories")
          .photo-category.link-to-category {{offer}}
          .delete_button(v-if="isOwner && inEditMode")
        .horizontal_flex(v-if="isOwner")
          .link-to-category(@click="addPhotoOffer") Добавить
      #video-categories-block.tab_item_fade
        .horizontal_flex(v-for="offer in appliedVideoCategories")
          .photo-category.link-to-category {{offer}}
          .delete_button(v-if="isOwner && inEditMode")
        .horizontal_flex(v-if="isOwner")
          .link-to-category(@click="addVideoOffer") Добавить
    .info_and_avatar_block
      a(href='')
        img.avatar-photo(src='avatar')
      .name-surname-block
        span.name-of-author {{name}}
        span.name-of-author {{surname}}
    #rating-regards-block
      #rating-wrapper(v-if='signed_in')
      #rating-wrapper(v-else='', style='pointer-events:none;')
  #contact-and-info-buttons-block
    #contact-author-button(clicked='false')  Contact
    #show-info-author-button(clicked='false') Personal info
  #onButton-clicked-author-block.moving-block-with-information(style='display: none;')
  .tabs_container
    .tab_item.active_tab
      .container
        spoiler(title="Фотосъемка")
          .shooting-block(v-for="offer in photoOffers")
            .shooting-description-block
              div {{offer.category}}
              div(style="font-size: 0.8em") {{offer.price.toFixed(0) + " РУБ/ЧАС"}}
              div(v-if="signed_in && isOwner")
                 .add-new-item(@click="addNewItem")
            .slider-container
              .showcase(v-for="photo in photos", v-if="photo.category === offer.category")
                .image_plugin_container
                  img(:src="'/api/uploads/' + photo.path")
    .tab_item
      .container
        spoiler(title="Видеосъемка")
          .videography-block(v-for="offer in videoOffers")
            .videography-description-block
              div {{offer.category}}
              div(style="font-size: 0.8em") {{offer.price.toFixed(0) + " РУБ/ЧАС"}}
              div(v-if="signed_in && isOwner")
                 .add-new-item(@click="addNewItem")
            .slider-container
  #comments.container
    spoiler(title="Комментарии")
      comment(v-for="comment in comments", :comment_data="comment", key="comment.id")
      new-comment(:portfolio_id="portfolio.id", :user="$store.state.user.username", :avatarsrc="$store.state.user.profile.avatar")
</template>
<script>
import Naming from '@/store/naming';
import Spoiler from '@/components/global/spoiler.vue'
import Comment from '@/components/global/comment.vue'
import NewComment from '@/components/global/new-comment.vue'
const TAG = "Portfolio";
const photoCategories = [
  'TFP','Fashion','Свадебная','Детская и семейная', 'Праздники', 'Концерты и вечеринки',
  'Персональная', 'Love Story', 'Коммерческая','Интерьерная','Предметная','Другие'
];
const videoCategories = [
   'Клипы', 'Творческие', 'Свадьбы', 'Праздники', 'Вечеринки',
   'Love story', 'Коммерческие', 'Другие', 'Motion Design'
];
export default {
  name: "",
  data: () => ({
    portfolio: {},
    inEditMode: false,
  }),
  components: {
    Comment, Spoiler, NewComment
  },
  computed: {
    isOwner() {
      return this.portfolio.userId === this.$store.state.user.id;
    },
    name(){

    },
    surname(){

    },
    signed_in(){
      return true;
    },
    comments(){
      return this.portfolio.comments;
    },
    photos(){
      return this.portfolio.user.photos;
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
  },
  created() {
    this.$store.dispatch(Naming.Actions.GET_PORTFOLIO, {userid: this.$route.params.id})
    .then(portfolio => {
      this.portfolio = portfolio;
    })
    .catch(err => {
      this.$log.error(TAG, err);
    })
  },
  methods: {
    addPhotoOffer(){
      this.$store.dispatch(Naming.Actions.POST_PHOTO_OFFER, {
        portfolioId: this.portfolio.id,
        category: this.availablePhotoCategories[Math.floor(Math.random() * this.availablePhotoCategories.length)],
        price: Math.floor(Math.random() * 1000),
        description: 'test item'
      })
    },
    addVideoOffer(){
      this.$store.dispatch(Naming.Actions.POST_VIDEO_OFFER, {
        portfolioId: this.portfolio.id,
        category: this.availableVideoCategories[Math.floor(Math.random() * this.availableVideoCategories.length)],
        price: Math.floor(Math.random() * 1000),
        description: 'test item'
      })
    },
    addNewItem(){

    }
  },
  mounted(){}
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

#contact-and-info-buttons-block
  width 100%
  background #ffffff
  height 120px

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

.container
  width 100%
  background url('~assets/images/noisy_grid.png') repeat
  margin 10px auto

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
  width 80%
  justify-content space-between
  align-content center
  align-items center
  margin-bottom 5px
  margin-top 15px
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

.spoiler-title
  background-color lightyellow
  height 75px
  line-height 75px

.spoiler-title h1
  margin 0

.spoiler-body
  display flex
  flex-direction column
  justify-content space-around
  align-content center
  align-items center
</style>
