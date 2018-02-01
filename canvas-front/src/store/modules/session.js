import Vue from 'vue'
import Naming from '@/store/naming'
import axios from 'axios'
const { $log } = Vue
const TAG = 'UserStore'
/* eslint-disable no-undef */
const state = {
  user: null,
  token: null,
  ready: false
}

const mutations = {
  [Naming.Mutations.SET_CURRENT_USER] (state, payload) {
    state.user = payload.user;
  },
  [Naming.Mutations.REMOVE_CURRENT_USER] (state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('current_user');
  },
  [Naming.Mutations.SET_CURRENT_USER_PROFILE] (state, payload) {
    state.user.profile = payload.profile
  },
  [Naming.Mutations.SET_TOKEN] (state, payload) {
    state.token = payload.token;
  },
  [Naming.Mutations.SET_READY] (state) {
    state.ready = true;
  }
}

const actions = {
  [Naming.Actions.USER_INFO] ({commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/users/self')
        .then(response => {
          commit(Naming.Mutations.SET_CURRENT_USER, {
            user: response.data
          }),
          resolve()
        })
        .catch(err => {
          $log.error(TAG, err)
          reject(err)
        })
    })
  },
  [Naming.Actions.SIGN_IN] ({ state, commit }, user) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/signin', user)
        .then(response => {
          login(commit, response.data)
          resolve()
        })
        .catch(err => {
          $log.error(TAG, err)
          reject(err)
        })
    })
  },
  [Naming.Actions.SIGN_UP] ({ state, commit }, user) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/signup', user)
        .then(response => {
          // login(commit, response.data)
          resolve(response)
        })
        .catch(err => {
          $log.error(TAG, err)
          reject(err)
        })
    })
  },
  [Naming.Actions.GET_PROFILE] ({ state, commit }, {userid}) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/users/${userid}/profile`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          $log.error(TAG, err)
          reject(err)
        })
    })
  },
  [Naming.Actions.POST_PROFILE] ({ state, commit }, {userid, profile}) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/users/${userid}/profile`, profile)
        .then(() => {
          resolve()
        })
        .catch(err => {
          $log.error(TAG, err)
          reject(err)
        })
    })
  },
  // [Naming.Actions.GET_PORTFOLIO] ({ state, commit }, {userid}) {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`/api/users/${userid}/portfolio`)
  //       .then(response => {
  //         resolve(response.data)
  //       })
  //       .catch(err => {
  //         $log.error(TAG, err)
  //         reject(err)
  //       })
  //   })
  // },
  // [Naming.Actions.POST_COMMENT] ({ state, commit }, comment) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`/api/comments`, comment)
  //       .then(response => {
  //         resolve(response.data)
  //       })
  //       .catch(err => {
  //         $log.error(TAG, err)
  //         reject(err)
  //       })
  //   })
  // },
  // [Naming.Actions.POST_VIDEO_OFFER] ({ state, commit }, offer) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`/api/video-offers`, offer)
  //       .then(response => {
  //         resolve(response.data)
  //       })
  //       .catch(err => {
  //         $log.error(TAG, err)
  //         reject(err)
  //       })
  //   })
  // },
}

function login(commit, sessionInfo){
  localStorage.setItem('current_user', JSON.stringify(sessionInfo))
  commit(Naming.Mutations.SET_CURRENT_USER, {
    user: sessionInfo.user
  }),
  commit(Naming.Mutations.SET_TOKEN, {
    token: sessionInfo.token,
  })
  axios.defaults.headers.common.Authorization = 'Bearer ' + sessionInfo.token;
}

const getters = {
  isSigned (state) {
    return state.user && state.user.roles.length !== 0
  },
  isAdmin (state) {
    return state.user && state.user.roles.filter(name => name === 'ROLE_ADMIN').length > 0
  },
  currentUser(state){
    return state.user || {};
  },
  linkToProfile: (state, getters) => id => {
    return `/users/${id || getters.currentUser.id}/profile`;
  },
  linkToPortfolio: (state, getters) => id => {
    return `/users/${id || getters.currentUser.id}/portfolio`;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
