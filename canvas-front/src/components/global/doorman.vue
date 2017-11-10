<template lang="pug">
  .doorman
    transition(name="component-fade")
      keep-alive
        photostart(v-if="onPhotoPage")
        videostart(v-if="!onPhotoPage")

</template>
<script>
import Naming from '@/store/naming'
import Photostart from '@/components/global/photostart.vue'
import Videostart from '@/components/global/videostart.vue'
export default {
  name: '',
  data: () => ({
    onPhotoPage: true
  }),
  components: {
    Photostart, Videostart
  },
  methods: {
    swapPage () {
      this.onPhotoPage = !this.onPhotoPage
    }
  },
  mounted () {
    this.$store.dispatch(Naming.Actions.GET_PRICE_EXTENT)
  }
}
</script>
<style lang="stylus" scoped>
.doorman
  width 100%
  height calc(100% - 60px)

.component-fade-enter-active, .component-fade-leave-active
  transition 0.3s ease

.component-fade-leave
  transform translateX(-1000)
  transition 0.3s ease

.component-fade-leave-to
  transform translateX(-50%)
  opacity 0

.component-fade-enter-to
  transform translateX(50%)
  opacity 0

</style>
