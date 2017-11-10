import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import user from '@/store/modules/user'
import catalog from '@/store/modules/catalog'
import popup from '@/store/modules/modal'

/* eslint-disable no-undef */
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    popup,
    catalog,
  },
  state: {
  },
  mutations,
  actions,
})

export default store
