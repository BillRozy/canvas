import Naming from '@/store/naming'
import axios from 'axios'
export default {
  [Naming.Actions.DELETE_OFFER]({commit }, {id}){
    /* eslint-disable no-undef*/
    return new Promise((resolve, reject) => {
      axios.delete('/api/photo-offers/' + id)
      .then(() => {
        commit(Naming.Mutations.REMOVE_OFFER, {id})
        resolve(id)
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  [Naming.Actions.POST_PHOTO_OFFER] ({ state, commit }, offer) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/photo-offers`, offer)
        .then(response => {
          commit(Naming.Mutations.ADD_PHOTO_OFFER, {
            offer: response.data,
          })
          resolve(response.data)
        })
        .catch(err => {
          $log.error(TAG, err)
          reject(err)
        })
    })
  },
}
