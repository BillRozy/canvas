<template lang="pug">
header
  .navbar.is-fixed-top(:class="[{'is-transparent': menuIsOpened},{ 'is-bordered': !menuIsOpened}]")
    .container.is-fullhd
      .navbar-brand(:class="[{'is-white': menuIsOpened},{ 'is-active': !menuIsOpened}]")
        .navbar-item
          router-link(to='/')
            figure
        a.navbar-burger(:class="{'is-active': menuIsOpened}", @click="menuIsOpened = !menuIsOpened", slot=)
          span
          span
          span
      .navbar-menu(:class="{'is-active': menuIsOpened}").is-transparent
        .navbar-start
          .navbar-item
            router-link.level-item(to='/about') О нас
          .navbar-item  
            router-link.level-item(to='/catalog/photo') Каталог
          .navbar-item
            router-link.level-item(to='/events') Новости
        .navbar-end
          personal-cabinet(v-if="$store.state.session.ready", :plain="menuIsOpened")
</template>
<script>
import PersonalCabinet from '@/components/global/personal-cabinet.vue'
export default {
  name: '',
  components: {
    PersonalCabinet
  },
  data: () => ({
    menuIsOpened: false
  }),
  mounted() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.menuIsOpened = false
      } , 250);
    });
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/consts'
.is-transparent
  background transparent
.is-white
  background white  
.is-bordered  
  border-bottom 1px solid lightgray
.navbar
  box-sizing border-box
  .navbar-brand
    border-bottom 1px solid lightgray
    &.is-active
      border none
  .navbar-menu.is-active
    display flex
    flex-direction column-reverse
    max-width 200px
    float right
    background white
    .navbar-item
      width 100%
header
  box-sizing border-box
  #hidden-main-link
    display none
    @media screen and (max-width: $header-critical-size)
      display flex
  #logo
      position relative
      height 100%
      width auto
      min-width 120px
      background url('~assets/images/canvaslogo.png') no-repeat 50% 50%
      background-size 90%

      @media screen and (max-width: $header-critical-size)
        display none

  &.onmain .header_decor_triangle
    width 0
    height 0
    border-left 80px solid transparent
    border-right 80px solid transparent
    border-top 40px solid white
    position absolute
    left calc(50% - 80px)
    bottom -40px
    z-index inherit

  .menu
    position relative
    display inline-flex
    justify-content space-around
    align-items center
    align-content center
    height 100%
    width 80%
    transition 0.2s
    z-index 150

    a
      display inline-flex
      height 100%
      min-height 50px
      align-items center

    @media screen and (max-width: $header-critical-size)
      position absolute
      width 200px
      left -200px
      top $header-mini-height
      flex-direction column
      height 200px
      background rgba(100,100,100,0.98)

      &.activated
        left 0
      a
        box-sizing border-box
        padding-left 20px
        width 100%
        color whitesmoke
        display flex
        border-bottom 1px darkgray solid

  .menu-button
    float left
    position relative
    -webkit-transform rotate(0deg)
    -moz-transform rotate(0deg)
    -o-transform rotate(0deg)
    transform rotate(0deg)
    -webkit-transition .5s ease-in-out
    -moz-transition .5s ease-in-out
    -o-transition .5s ease-in-out
    transition .5s ease-in-out
    cursor pointer
    width 50px
    height 35px
    margin "calc(%s - 35px/2) 20px" % ($header-mini-height)
    display none

    span
      display block
      position absolute
      height 7px
      width 100%
      background black
      border-radius 7px
      opacity 1
      left 0
      -webkit-transform rotate(0deg)
      -moz-transform rotate(0deg)
      -o-transform rotate(0deg)
      transform rotate(0deg)
      -webkit-transition .25s ease-in-out
      -moz-transition .25s ease-in-out
      -o-transition .25s ease-in-out
      transition .25s ease-in-out

    span:nth-child(1)
      top 0px

    span:nth-child(2), span:nth-child(3)
      top 16px

    span:nth-child(4)
      top 32px

    &.open span:nth-child(1)
      top 16px
      width 0%
      left 50%

    &.open span:nth-child(2)
      -webkit-transform rotate(45deg)
      -moz-transform rotate(45deg)
      -o-transform rotate(45deg)
      transform rotate(45deg)

    &.open span:nth-child(3)
      -webkit-transform rotate(-45deg)
      -moz-transform rotate(-45deg)
      -o-transform rotate(-45deg)
      transform rotate(-45deg)

    &.open span:nth-child(4)
      top 16px
      width 0%
      left 50%

    @media screen and (max-width: $header-critical-size)
      display inline-block
.navbar-brand
  figure
    min-width 120px
    min-height 40px
    background url('~assets/images/canvaslogo.png') no-repeat 50% 50%;     
    background-size cover
</style>
