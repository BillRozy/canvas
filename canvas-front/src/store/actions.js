import Naming from '@/store/naming'
import axios from 'axios'
export default {
  [Naming.Actions.DELETE_OFFER]({commit }, {id}){
    /* eslint-disable no-undef*/
    return new Promise((resolve, reject) => {
      axios.delete('/api/photo-offers/' + id)
      .then(() => {
        resolve(id)
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}
