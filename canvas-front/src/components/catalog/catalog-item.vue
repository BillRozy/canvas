<template lang="pug">
.catalog-item-card.box
  .card(v-show="fronted",style="height: 100%; min-width: 220px")
    .card-header
      .card-header-title(style="justify-content: center") {{offer.user.profile.name + " " + offer.user.profile.surname}}
    .card-image
      figure.image.is-128x128(style="margin: 0 auto;")
        img(:src="avatar")
    .card-content
      b-field
        .option {{periodOnCanvas}}
      b-field
        .option Рейтинг   
    .card-footer
      .card-footer-item
        div.is-size-5 {{`${offer.price}  `}}
        div.is-size-7 РУБ
      .card-footer-item
          button.button.is-small.is-primary.is-outlined(@click="goToPortfolio") Подробнее...
  .catalog-item-card-back-side.card(v-show="!fronted || !isMobile")
    .catalog-item-card-examples.hero
      .swiper-container.gallery-top(:data-category="offer.category")
        .swiper-wrapper
          .swiper-slide(v-for="photo in photos", key="photo.id")
            img(:src="`/api/uploads/${photo.path}`")
        .swiper-button-prev
        .swiper-button-next
      .swiper-container.gallery-thumbs(:data-category="offer.category")
        .swiper-wrapper
          .swiper-slide(v-for="photo in photos")
            img(:src="`/api/uploads/${photo.path}`")
  .switch-control.switch-control-back(v-if="isMobile", @click="fronted = !fronted")
</div>
</template>
<script>
import defaultAvatar from '@/assets/images/default-avatar-space-astronaut.png'
import Swiper from 'swiper/dist/js/swiper.js'
export default {
  name: "",
  props: ['offer'],
  data: () => ({
    swiperTop: null,
    swiperThumb: null,
    fronted: true,
  }),
  computed: {
    avatar() {
      return this.offer.user.profile.avatar || defaultAvatar;
    },
    photos(){
      return this.offer.photos;
    },
    periodOnCanvas(){
      return ((Date.now() - (new Date(this.offer.user.createdAt)).getTime()) / 1000 / 60 / 60).toFixed() + ' часов на сайте'
    },
    isMobile(){
      return this.$store.getters.isMobileMode;
    }
  },
  methods: {
    goToPortfolio(){
      this.$router.push(this.$store.getters.linkToPortfolio(this.offer.user.id))
    }
  },
  mounted(){
      const galleryTop = new Swiper(this.$el.querySelector('.gallery-top'), {
        spaceBetween: 10,
        centeredSlides: true,
        slideToClickedSlide: true,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      const galleryThumbs = new Swiper(this.$el.querySelector('.gallery-thumbs'), {
        spaceBetween: 1,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
      });
      this.$log.info(galleryTop)
      this.$log.info(galleryThumbs)
      galleryTop.controller.control = galleryThumbs;
      galleryThumbs.controller.control = galleryTop;
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/css/consts"
.catalog-item-card-examples
  display flex
  align-items center
  justify-content center
  box-sizing border-box
  border 1px solid white
  width 100%
  height 40%

.catalog-item-card
  position relative
  width 300px
  height 440px
  box-sizing border-box
  overflow hidden
  font-weight 700
  margin 10px
  a
    text-decoration none
    color hotpink
    &:hover
      text-decoration underline
  .catalog-item-card-front-side, .catalog-item-card-back-side
    display flex
    flex-direction column
    align-items center
    width 260px
    height 400px
    box-sizing border-box
    padding 20px
    transition 0.1s
    font-weight 700

  .catalog-item-card-front-side
    justify-content space-around

  .catalog-item-card-back-side
    justify-content center

  .switch-control
    position absolute
    display none
    width 25px
    height 40px
    top calc(50% - 25px)
    z-index 10
    background white
    &:hover
      cursor pointer
      filter drop-shadow(1px 1px 2px darkgray)

    &.switch-control-front
      background url('~assets/images/icons/back.png') no-repeat 50% 50%
      background-size cover
      left 5px
      display none

    &.switch-control-back
      background url('~assets/images/icons/next.png') no-repeat 50% 50%
      background-size cover
      right 5px
      display block      

  .catalog-item-card-front-side
    .name-of-author
      font-weight 100
      color black
      font-size 1.1em

  .catalog-item-card-avatar:hover img
    filter drop-shadow(1px 1px 2px gray)

@media  screen and (min-width: $screen-mobile)
  .catalog-item-card
    display flex
    justify-content center
    align-items center
    position relative
    width 100%
    max-width 620px
    min-width 620px
    height 380px
    box-sizing border-box
    overflow hidden
    margin 10px

    .catalog-item-card-front-side, .catalog-item-card-back-side
      display flex
      flex-direction column
      align-items center
      height 340px
      box-sizing border-box
      transition 0.1s

    .catalog-item-card-front-side
      position relative
      width 220px
      justify-content space-around
      border-right 1px black dashed

    .catalog-item-card-back-side
      padding 0
      position relative
      min-width 360px
      overflow-y auto

    .switch-control
      display none

    .catalog-item-card-examples
      display flex
      align-items center
      justify-content center
      flex-direction column
      box-sizing border-box
      border 1px solid white
      width 100%
      height 100%

      .swiper-container
        overflow hidden

  .freewall-container
    flex-grow 10
    min-width 160px
    flex-basis 160px
    position relative
    height 100%

  .img-in-freewall
    display block
    height auto
    width 100%
    outline-offset -1px

.catalog-item-card-avatar
  box-sizing border-box
  display flex
  align-items center
  justify-content center
  width 120px
  height 120px
  overflow hidden

.catalog-item-card-field
  display flex
  align-items center
  justify-content center
  width 220px
  height 50px
  border-bottom 1px lightgrey solid

.card-item-avatar-img
  height 100%
  width auto
  max-width 100%
  min-height 120px
  min-width 80px
  border-radius 20px

.catalog-item-card-price
  font-size 1.2em
  font-weight 100

.mosaicflow__column
  float left

.swiper-container
  width 100%
  height 300px
  margin-left auto
  margin-right auto

.swiper-slide
  overflow hidden
  display flex
  justify-content center
  align-items center
  background-size cover
  background-position center
  img
    max-width 100%

.gallery-top
  height 75%
  width 100%

.gallery-thumbs
  height 25%
  box-sizing border-box
  padding 10px 0

.gallery-thumbs .swiper-slide
  width 25%
  height 100%
  opacity 0.4
  img
    &:hover
      cursor pointer

.gallery-thumbs .swiper-slide-active
  opacity 1

</style>
