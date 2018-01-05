import Naming from '@/store/naming';
import axios from 'axios'
import Vue from 'vue'
import Promise from 'Promise'
const state = {
  portfolios: {},
};

const mutations = {
  [Naming.Mutations.ADD_PORTFOLIO](state, { portfolio }) {
    Vue.set(state.portfolios, portfolio.userId, portfolio)
  },
  [Naming.Mutations.ADD_COMMENT_TO_PORTFOLIO](state, { comment, userId }) {
    state.portfolios[userId + ""].comments.push(comment);
  },
  [Naming.Mutations.ADD_PHOTO_TO_PORTFOLIO](state, { photo, userId }) {
    state.portfolios[userId + ''].user.photos.push(photo);
  },
  [Naming.Mutations.ADD_VIDEO_TO_PORTFOLIO](state, { video, userId }) {
    state.portfolios[userId + ''].user.videos.push(video);
  },
  [Naming.Mutations.ADD_PHOTO_OFFER_TO_PORTFOLIO](state, { photoOffer, userId }) {
    state.portfolios[userId + ''].photoOffers.push(photoOffer);
  },
  [Naming.Mutations.ADD_VIDEO_OFFER_TO_PORTFOLIO](state, { videoOffer, userId }) {
    state.portfolios[userId + ''].videoOffers.push(videoOffer);
  },
  [Naming.Mutations.REMOVE_PHOTO_OFFER_FROM_PORTFOLIO] (state, { id, userId }) {
    state.portfolios[userId + ''].photoOffers = state.portfolios[userId + ''].photoOffers.filter(offer => offer.id !== id);
  },
};

const actions = {
  [Naming.Actions.GET_PORTFOLIO] ({ state, commit }, {userId}) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/users/${userId}/portfolio`)
        .then(response => {
          commit(Naming.Mutations.ADD_PORTFOLIO, {
            portfolio: response.data,
          })
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [Naming.Actions.POST_COMMENT] ({ state, commit }, {comment, portfolioUserId}) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/comments`, comment)
        .then(response => {
          commit(Naming.Mutations.ADD_COMMENT_TO_PORTFOLIO, {
            comment: response.data,
            userId: portfolioUserId
          })
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [Naming.Actions.POST_VIDEO_OFFER] ({ state, commit }, offer) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/video-offers`, offer)
        .then(response => {
          commit(Naming.Mutations.ADD_VIDEO_OFFER_TO_PORTFOLIO, {
            videoOffer: response.data,
            userId: response.data.user.id
          })
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [Naming.Actions.DELETE_PHOTO_OFFER]({commit }, {id, userId}){
    /* eslint-disable no-undef*/
    return new Promise((resolve, reject) => {
      axios.delete('/api/photo-offers/' + id)
      .then(() => {
        commit(Naming.Mutations.REMOVE_PHOTO_OFFER_FROM_PORTFOLIO, {id, userId})
        resolve()
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  [Naming.Actions.POST_PHOTO_OFFER] ({ state, commit }, {offer, userId}) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/photo-offers`, offer)
        .then(response => {
          commit(Naming.Mutations.ADD_PHOTO_OFFER_TO_PORTFOLIO, {
            photoOffer: response.data,
            userId,
          })
          resolve(response.data)
        })
        .catch(err => {
          $log.error(TAG, err)
          reject(err)
        })
    })
  },
};

const getters = {
  portfolioByUserId(state) {
    return userId => {
      return state.portfolios[userId];
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
};
