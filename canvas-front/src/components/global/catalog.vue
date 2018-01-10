<template lang="pug">
transition(name="fade", mode="out-in")
  keep-alive
    router-view
</template>
<script>
import PhotoCatalog from '@/components/global/photo-catalog.vue'
import VideoCatalog from '@/components/global/video-catalog.vue'
export default {
  name: "",
  components: {
    PhotoCatalog, VideoCatalog
  },
  data: () => ({
  }),
  mounted(){
  },

  methods: {
  }
}
</script>
<style lang="stylus" scoped>

</style>
