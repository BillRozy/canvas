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
  .hero.is-fullheight
    .hero-head
    .hero-body
      .container.is-widescreen
        div.tabs.is-large.is-boxed.is-centered
          ul
            li.about-tab-label(:class="{'is-active': activeTab === 0}", @click="selectTab(0)")
              a
                span О НАС
            li.about-tab-label(:class="{'is-active': activeTab === 1}", @click="selectTab(1)")
              a
                span ОПИСАНИЕ
            li.about-tab-label(:class="{'is-active': activeTab === 2}", @click="selectTab(2)")
              a
                span КОНТАКТЫ
        transition-group(tag="div", class="tab-content-wrapper")
          .tab-content.column(v-if="activeTab === 0", :key="0")    
            .huge-logo CANVAS
            br
            span.is-size-3 ОТКРЫТЫЙ КАТАЛОГ ВСЕХ ФОТОГРАФОВ И ВИДЕОГРАФОВ ГОРОДА 
          .tab-content.column(v-if="activeTab === 1", :key="1")    
            .level(style="width: 100%; height: 100%")
              .level-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description Возникла потребность в фото- или видеосъемке? 
                  img(src="~assets/images/svg/guys.svg")
              .level-item.short-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description
                  .divider  
              .level-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description CANVAS может с этим помочь!
                  img(src="~assets/images/svg/comp.svg")
              .level-item.short-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description
                  .divider      
              .level-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description Выбер ценовой диапазон (включая бесплатные!) 
                  img(src="~assets/images/svg/coin.svg")
              .level-item.short-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description
                  .divider      
              .level-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description Выбери раздел, от семейной до коммерческой съемки
                  img(src="~assets/images/svg/trees.svg")
              .level-item.short-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description
                  .divider  
              .level-item
                .img-with-description.column(:class="{'hidden-description': noDescriptions}")
                  .description Свяжись с понравившимся автором и проверь выбор 
                  img(src="~assets/images/svg/paperplane.svg")      

            .tab-content.column(v-if="activeTab === 2", :key="2")   
    .hero-foot
      .container
        .level(style="width: 100%")
          .level-item
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
      activeTab: 0,
      noDescriptions: true,
    }
  },
  methods: {
    selectTab(n) {
      this.activeTab = n;
    }
  },
  mounted() {
    const scene = this.$el.querySelector('.scene');
    this.parallax = new Parallax(scene);
  },
  watch: {
    activeTab() {
      if (this.activeTab === 1) {
        setTimeout(() => {
          this.noDescriptions = false;
        }, 2000);
      }
    }
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
.huge-logo
  text-align center
  color black
  font-weight bold
  font-size 8em    
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
.hero
  position absolute
  width 100%
  left 0
  top 0
.tab-content-wrapper
  display flex
  justify-content center
  align-items center
  width 100%
  height 40vh
  border-radius 20px 
  background rgba(255, 255, 255, 0.5)

  .short-item
    max-width 52px  

.divider
  width 30px
  height 3px
  background white
  &.transparent
    background transparent
.img-with-description
  transition 0.5s
  display flex
  justify-content center
  align-items center
  max-width 150px
  .description
    transition 0.5s
    opacity 1
    height 100px
    margin-bottom 5px
  &.hidden-description
    .description
      opacity 0
      height 0  
  img
    max-width 110px    
.social-buttons
  display flex
  justify-content space-around
  align-items center
  height 80px
  width 200px
  span.icon
    transition 0.2s
    cursor pointer
    &:hover
      i
        transform scale(1.05)
        color pink

.tabs 
  margin-bottom 0
  .about-tab-label
    &:hover
      a
        background inherit
        text-decoration underline
    &.is-active
      a
        color black
        border none
        background-color rgba(255, 255, 255, 0.5)
    a  
      font-weight bold
      color white     

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