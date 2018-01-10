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
  min-height: calc(100vh - 4rem)
  background-color #ffffff
  background-image url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a9a7ac' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
  
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
