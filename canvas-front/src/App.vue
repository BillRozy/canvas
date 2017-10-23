<template lang="pug">
main#App
  canvas-header
  transition
    keep-alive
      router-view(v-if='ready')
</template>

<script>
import CanvasHeader from '@/components/global/canvas-header.vue'
import router from '@/router'
import About from '@/components/global/about.vue'
import Catalog from '@/components/global/catalog.vue'
import Doorman from '@/components/global/doorman.vue'
import Events from '@/components/global/events.vue'
import Login from '@/components/auth/login.vue'
import Signup from '@/components/auth/signup.vue'
export default {
  data () {
    return {
      message: 'Hello Vue!'
    }
  },
  computed: {
    ready () {
      return this.$auth.ready()
    }
  },
  router,
  components: {
    About, Catalog, Doorman, Events, CanvasHeader, Login, Signup
  }
}
</script>

<style lang="stylus" scoped>
p
  font-size 2em
  text-align center
main
  height 100%
  width 100%
.wrap
  height 100%
  width 100%
</style>
