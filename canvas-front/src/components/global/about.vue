<template lang="pug">
.wrapper
  .scene(data-friction-x="0.1", data-friction-y="0.1", data-scalar-x="25", data-scalar-y="15")
    .layer.layer-01(data-depth="0.00")
    .layer.layer-11(data-depth="0.1")  
      .background
      .background-dark
    .layer(data-depth="0.12")
      .stars   
    .layer(data-depth="0.15")
      .cloud 
    .layer(data-depth="0.15")
      .city-glow
      .city-glow-left
      .city-glow-right
    .layer.layer-21(data-depth="0.2")
      .city-stripe
    .layer.layer-31(data-depth="0.5")
      .hero.is-fullheight
        .hero-head
        .hero-body
          .level(style="width: 100%")
            .level-item
              .logo CANVAS
        .hero-foot

  .social-buttons
    span.icon.is-large.has-text-white
      i.mdi.mdi-facebook.mdi-48px
    span.icon.is-large.has-text-white
      i.mdi.mdi-vk.mdi-48px.is-white
    span.icon.is-large.has-text-white
      i.mdi.mdi-twitter.mdi-48px.is-white            


</template>


<script>
import Parallax from 'parallax-js'
export default {
  data() {
    return {
      parallax: null,
    }
  },
  mounted() {
    const scene = this.$el.querySelector('.scene');
    this.parallax = new Parallax(scene);
  }
}
</script>

<style lang="stylus" scoped>
.wrapper 
  min-height 460px
  position absolute
  overflow hidden
  display table
  height 100%
  width 100%
  left 0
  top 0
.scene
  position relative
  overflow hidden
.scene
.layer
  display block
  height 100%
  width 100%
  padding 0
  margin 0
  div 
    -webkit-transform translate3d(0,0,0)
    -moz-transform translate3d(0,0,0)
    transform translate3d(0,0,0)
    -webkit-transform-style preserve-3d
    -moz-transform-style preserve-3d
    transform-style preserve-3d
    -webkit-backface-visibility hidden
    -moz-backface-visibility hidden
    backface-visibility hidden
.layer-01
  background black
.layer-11
  height 100vh
  box-shadow inset 0 0 40px #000000
.layer-21
  height 100vh
.layer-31
  .logo
    width 80vw
    height 40vh
    border 1px solid white
    border-radius 20px
    color black
    font-weight bold
    display flex
    justify-content center
    align-items center
    font-size 8em    
    background rgba(255, 255, 255, 0.5)
.waves
  height 400px
  width 100%
  background url('~assets/images/decor/wave-pattern-hi.png') repeat-x
  object-fit scale-down
.background
.background-dark
  background linear-gradient(to bottom, #9cecfb 0%,#65c7f7 51%,#0052d4 99%)
  animation opacity infinite alternate
  animation-duration 120s
  position absolute
  width 110%
  height 120%
  left -5%
  top -5%
  opacity 1
.background-dark
  opacity 0
  animation opacity-reverse infinite alternate
  animation-duration 120s
  background linear-gradient(to bottom, #414345 0%, #232526 99%)
.stars
  opacity 0
  animation opacity-reverse infinite alternate
  animation-duration 120s
  animation-delay 20s
  animation-timing-function ease-out-in
  background url('~assets/images/decor/stars.png') repeat-x 50% 50% 
  width 130%
  height 50%
  left -15%
  top -5%
.city-stripe 
  background url('~assets/images/decor/tcsh-2015.png') no-repeat 50% 50%
  background-size cover
  position: absolute
  width 130%
  height 90%
  left -15%
  bottom -5%
.cloud
  animation cloud-swim infinite
  animation-duration 240s
  background url('~assets/images/decor/giant-cloud.png') no-repeat 0% 50%
  background-size contain
  position: absolute
  width 130%
  height 50%
  left -5%
  top -5%
.city-glow, .city-glow-left, .city-glow-right
  opacity 0
  animation opacity-reverse infinite alternate
  animation-delay 40s
  animation-duration 180s
  background url('~assets/images/decor/city-glow.png') no-repeat 50% 50%
  background-size contain
  position: absolute
  width 30%
  height 30%
  left 35%
  bottom 5%  
.city-glow-left
  left 10%
  bottom -5%
.city-glow-right
  left 65%
  bottom 0  
.social-buttons
  display flex
  justify-content space-around
  align-items center
  margin 0 auto
  bottom 10%
  left calc(50% - 100px)
  position absolute
  height 80px
  width 200px
  border 1px solid white
  border-radius 10px

  span.icon
    transition 0.2s
    cursor pointer
    &:hover
      i
        transform scale(1.05)
        color pink

@keyframes cloud-swim 
  from 
    left -100%       
  to 
    left 200%

@keyframes opacity
  from 
    opacity 1   
  to 
    opacity 0

@keyframes opacity-reverse
  from 
    opacity 0 
  to 
    opacity 1    
    
</style>