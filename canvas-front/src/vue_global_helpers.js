import Naming from '@/store/naming';
import moment from 'moment'
export default {
  showPopup(content, closeCallback) {
    this.$store.commit(Naming.Mutations.SET_MODAL_CONTENT, {
      content,
      closeCallback,
    });
    this.$store.commit(Naming.Mutations.SET_MODAL_VISIBILITY, {
      visibility: true,
    });
  },
  hidePopup() {
    this.$store.commit(Naming.Mutations.SET_MODAL_VISIBILITY, {
      visibility: false,
    });
  },
  formatSeqDateString(seqDate) {
    moment.locale('ru');
    return moment(seqDate).format("Do MMMM YYYY, HH:mm");
  },
  daysFromSeqToNow(seqDate) {
    moment.locale('ru');
    return moment(seqDate).fromNow();
  },
  objToQueryString(obj) {
    let res = '';
    if(!obj){
      return res;
    }
    Object.keys(obj).forEach(key => {
      res += `${key}=${obj[key]}&`
    })
    return res;
  }
};
