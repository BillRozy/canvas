import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLogger from 'vuejs-logger'
import Vuex from 'vuex'
import Helpers from '@/vue_global_helpers'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueLogger)
Vue.use(Buefy)
Vue.use(VuePlyr)
Vue.mixin({
  methods: {
    ...Helpers,
  },
});

export default Vue
