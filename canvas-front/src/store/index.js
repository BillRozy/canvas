import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import session from '@/store/modules/session'
import catalog from '@/store/modules/catalog'
import popup from '@/store/modules/modal'

/* eslint-disable no-undef */
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    session,
    popup,
    catalog,
  },
  state: {
  },
  mutations,
  actions,
})

export default store
