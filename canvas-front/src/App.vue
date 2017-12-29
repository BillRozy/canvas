<template lang="pug">
main#App
  canvas-header
  transition
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
