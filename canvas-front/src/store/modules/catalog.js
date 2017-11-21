import Naming from '@/store/naming';
import axios from 'axios'
const state = {
  video: {
    priceExtent: {
      min: 0,
      max: 100
    }
  },
  photo: {
    priceExtent: {
      min: 0,
      max: 100
    }
  }
};

const mutations = {
  [Naming.Mutations.SET_VIDEO_PRICE_EXTENT](state, { extent }) {
    if(extent.min === extent.max){
      extent.max = extent.min + 100;
    }
    state.video.priceExtent = extent;
  },
  [Naming.Mutations.SET_PHOTO_PRICE_EXTENT](state, { extent }) {
    if(extent.min === extent.max){
      extent.max = extent.min + 100;
    }
    state.photo.priceExtent = extent;
  },
};

const actions = {
  [Naming.Actions.GET_PRICE_EXTENT]({commit }) {
    axios.get('/api/price-extent')
      .then(response => {
        commit(Naming.Mutations.SET_PHOTO_PRICE_EXTENT, {
          extent: response.data.photo
        })
        commit(Naming.Mutations.SET_VIDEO_PRICE_EXTENT, {
          extent: response.data.video
        })
        /* eslint-disable no-console */
        console.log(response);
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.error(error);
      })
  },
};

export default {
  state,
  mutations,
  actions
};
