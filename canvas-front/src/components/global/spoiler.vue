<template lang="pug">
.spoiler
    .spoiler-title(class="{closed: isClosed}" @click="toggleState")
        h1 {{title}}
    .spoiler-body(:class="{closed: isClosed}")
        slot
</template>

<script>
export default {
  data() {
      return {
          isClosed: false
      }
  },
  props: {
      title: {default: "Spoiler"}
  },
  methods: {
      toggleState() {
          this.isClosed = !this.isClosed;
      }
  }
}
</script>

<style lang="stylus" scoped>
.spoiler-title
    background-color lightyellow
    height 75px
    line-height 75px
    cursor pointer

.spoiler-title h1
    margin 0

.spoiler-body
    display flex
    flex-direction column
    justify-content space-around
    align-content center
    align-items center
    max-height 2000px
    overflow hidden
    transition 0.5s
    opacity 1

.spoiler-body.closed
    max-height 0
    opacity 0
    transition 0.5s

</style>
