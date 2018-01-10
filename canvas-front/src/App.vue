<template lang="pug">
main.is-screen-height-maxed#App
  canvas-header
  transition(name="fade", mode="out-in")
    keep-alive
      router-view
  popup(v-show='visible', @close='closeModal', ref="modalWindow")
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
import Popup from '@/components/global/popup';
import Naming from '@/store/naming.js';
import axios from 'axios';
export default {
  components: {
    About, Catalog, Doorman, Events, CanvasHeader, Login, Signup, Popup
  },
  data () {
    return {
      message: 'Hello Vue!'
    }
  },
  computed: {
    visible() {
      return this.$store.state.popup.visible;
    },
  },
  router,
  store,
  methods: {
    closeModal() {
      if (this.$store.state.popup.onCloseCallback) {
        this.$store.state.popup.onCloseCallback();
      }
      this.$store.commit(Naming.Mutations.SET_MODAL_VISIBILITY, {
        visibility: false,
      });
    },
    checkMobile(){
      this.$store.commit(Naming.Mutations.SET_MOBILE_MODE, {
        enabled: window.innerWidth < 769,
      })
    }
  },
  created() {
    const user = localStorage.getItem('current_user');
    if(user) {
      const json = JSON.parse(user);
      this.$store.commit(Naming.Mutations.SET_TOKEN, {
        token: json.token
      })
      axios.defaults.headers.common.Authorization = 'Bearer ' + json.token;
      this.$store.dispatch(Naming.Actions.USER_INFO)
      .then(() => {
        this.$store.commit(Naming.Mutations.SET_READY);
      })
    } else {
      this.$store.commit(Naming.Mutations.SET_READY);
    }
  },
  mounted() {
    const modal = this.$refs.modalWindow;
    this.$store.commit(Naming.Mutations.SET_MODAL_CONTAINER, {
      container: modal.getContainer(),
    });
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.checkMobile();
      } , 250);
    });
  }

}
</script>

<style lang="stylus" scoped>
p
  font-size 2em

  text-align center
main
  min-height: calc(100vh - 4rem)
  height 100%
  width 100%
.wrap
  height 100%
  width 100%
</style>
