import Vuex from 'vuex'
import mutations from '@/store/mutations'
import user from '@/store/modules/user'

/* eslint-disable no-undef */
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user
  },
  state: {
  },
  mutations
})

export default store
