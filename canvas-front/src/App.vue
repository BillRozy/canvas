<template lang="pug">
main#App
  canvas-header
  transition
    keep-alive
      router-view
</template>

<script>
import store from '@/store'
import CanvasHeader from '@/components/global/canvas-header.vue'
import router from '@/router'
import About from '@/components/global/about.vue'
import Catalog from '@/components/global/catalog.vue'
import Doorman from '@/components/global/doorman.vue'
import Events from '@/components/global/events.vue'
import Login from '@/components/auth/login.vue'
import Signup from '@/components/auth/signup.vue'
import Naming from '@/store/naming.js';
import axios from 'axios';
export default {
  components: {
    About, Catalog, Doorman, Events, CanvasHeader, Login, Signup
  },
  data () {
    return {
      message: 'Hello Vue!'
    }
  },
  computed: {

  },
  router,
  store,
  mounted() {
    const user = localStorage.getItem('current_user');
    if(user) {
      const json = JSON.parse(user);
      this.$store.commit(Naming.Mutations.SET_CURRENT_USER, {
        user: json.user
      })
      axios.defaults.headers.common.Authorization = 'Bearer ' + json.token;
    }
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
