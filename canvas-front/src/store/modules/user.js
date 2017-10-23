import Vue from 'vue'
import Naming from '@/store/naming'
import axios from 'axios'
const { $log } = Vue
const TAG = 'UserStore'
/* eslint-disable no-undef */
const state = {
  username: null,
  roles: [],
  ready: false
}

const mutations = {
  [Naming.Mutations.SET_CURRENT_USER] (state, payload) {
    state.username = payload.user.username
    payload.user.role.forEach(r => {
      state.roles.push(r);
    })
  }
}

const actions = {
  [Naming.Actions.SIGN_IN] ({ state, commit }, user) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/signin', user)
        .then(response => {
          localStorage.setItem('current_user', JSON.stringify(response.data))
          commit(Naming.Mutations.SET_CURRENT_USER, {
            user: response.data.user
          })
          resolve()
        })
        .catch(err => {
          $log.error(TAG, err)
          reject(err)
        })
    })
  }
}

const getters = {
  isSigned (state) {
    return state.roles.length !== 0
  },
  isAdmin (state) {
    return state.roles.filter(name => name === 'ROLE_ADMIN').length > 0
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
