<template lang="pug">
  .doorman
    transition(name="component-fade")
      keep-alive
        photostart(v-if="onPhotoPage")
        videostart(v-if="!onPhotoPage")

</template>
<script>
import Photostart from '@/components/global/photostart.vue'
import Videostart from '@/components/global/videostart.vue'
import axios from 'axios'
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
    axios.get('/api/doormanprices')
      .then(responce => {
        console.log(responce)
      })
      .catch(error => {
        console.log(error)
      })
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
