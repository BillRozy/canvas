<template lang="pug">
.catalog-item-card
  .catalog-item-card-front-side(v-show="fronted")
    a.catalog-item-card-avatar(href="")
      img.card-item-avatar-img
    .catalog-item-card-name.catalog-item-card-field
      a.name-of-author {{offer.user.profile.name + " " + offer.user.profile.surname}}
    .catalog-item-card-price.catalog-item-card-field {{offer.price + " РУБ/ЧАС"}}
    .catalog-item-card-rating.catalog-item-card-field
    .catalog-item-card-skills.catalog-item-card-field {{offer.user.createdAt}}
    .catalog-item-card-more.catalog-item-card-field
      a(href="") Подробнее...
  .catalog-item-card-back-side(v-show="fronted")
    .catalog-item-card-examples
      .swiper-container.gallery-top(:data-category="offer.category")
        .swiper-wrapper
          .swiper-slide(v-for="photo in photos", key="photo.id")
            img(:src="`api/uploads/${photo.path}`")
        .swiper-button-prev
        .swiper-button-next
      .swiper-container.gallery-thumbs(:data-category="offer.category")
        .swiper-wrapper
          .swiper-slide(v-for="photo in photos")
            img(:src="`api/uploads/${photo.path}`")
  .switch-control.switch-control-back(@click="fronted = !fronted")
</div>
</template>
<script>
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
    photos(){
      return this.offer.photos;
    }
  },
  mounted(){
      const galleryTop = new Swiper(this.$el.querySelector('.gallery-top'), {
        spaceBetween: 10,
        centeredSlides: true,
        slideToClickedSlide: true,
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

.catalog-item-card
  font-weight 700
  a
    text-decoration none
    color hotpink
    &:hover
      text-decoration underline

  .catalog-item-card-front-side
    .name-of-author
      font-weight 100
      color black
      font-size 1.1em

  .catalog-item-card-avatar:hover img
    filter drop-shadow(1px 1px 2px gray)

@media  screen and (max-width: $screen-md-min)
  .catalog-item-card
    position relative
    width 300px
    height 440px
    box-sizing border-box
    overflow hidden

    .catalog-item-card-front-side, .catalog-item-card-back-side
      display flex
      flex-direction column
      align-items center
      width 260px
      height 400px
      border 1px solid black
      box-sizing border-box
      padding 20px
      margin 20px
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

  .freewall-container
    width 100%
    height 100%

  .img-in-freewall
    display block
    height 100%
    width auto

    min-height 120px
    max-width 220px
    max-height 250px
    margin 0 auto
    outline none

  .mosaicflow__item
    position relative
    height 100%
    max-width 220px
    margin-right 5px

  .catalog-item-card-examples
    display flex
    align-items center
    justify-content center
    box-sizing border-box
    border 1px solid white
    width 100%
    height 40%

@media  screen and (min-width: $screen-md-min)
  .catalog-item-card
    display flex
    justify-content center
    align-items center
    position relative
    width 100%
    max-width 1200px
    min-width 600px
    height 440px
    border 2px solid black
    box-sizing border-box
    overflow hidden
    margin-bottom 20px

    .catalog-item-card-front-side, .catalog-item-card-back-side
      display flex
      flex-direction column
      align-items center
      height 400px
      box-sizing border-box
      padding 20px
      transition 0.1s

    .catalog-item-card-front-side
      position relative
      width 300px
      justify-content space-around
      border-right 1px black dashed

    .catalog-item-card-back-side
      padding 0
      position relative
      width calc(100% - 340px)
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
  background-size cover
  background-position center

.gallery-top
  height 80%
  width 100%

.gallery-thumbs
  height 20%
  box-sizing border-box
  padding 10px 0

.gallery-thumbs .swiper-slide
  width 25%
  height 100%
  opacity 0.4

.gallery-thumbs .swiper-slide-active
  opacity 1

</style>
