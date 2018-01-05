<template lang="pug">
a.flipper-wrapper(@touchstart="toggle", :class="{hover: hovered}", :style="style")
  .flipper
    .flipper-front
      slot
    .flipper-back {{description}}
</template>

<script>
export default {
  name: 'flip-button',
  props: {
    description: {default: 'description here'},
    size: {required: true}
  },
  data() {
    return {
      hovered: false,
    }
  },
  computed: {
    formattedSize() {
      return this.size + 'px';
    },
    style() {
      return {
        width: this.formattedSize|| '140px',
        height: this.formattedSize || '140px'
      }
    }
  },
  methods: {
    toggle(){
      this.hovered = !this.hovered;
    }
  }
  
} 
</script>

<style lang="stylus" scoped>
@import "~assets/css/consts.styl"
.flipper-wrapper:hover .flipper, .flipper-wrapper.hover .flipper
  transform rotateY(180deg)
.flipper-wrapper
  display block
  margin 5px
  transition 0.5s
  max-width 200px
  max-height 200px
  perspective 1000px
  &:hover
    cursor pointer
.flipper
  height 100%
  transition 0.5s
  transform-style preserve-3d
  position relative

.flipper-front
  width 100%
  height 100%
  backface-visibility hidden
  position absolute
  top 0
  left 0
  z-index 2
  transform rotateY(0deg)

.flipper-back
  display flex
  align-content center
  justify-content center
  align-items center
  background-color #b0c2d2
  width 100%
  height 100%
  backface-visibility hidden
  position absolute
  top 0
  left 0
  transform rotateY(180deg)
  z-index 10
</style>