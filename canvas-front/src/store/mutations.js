import Naming from '@/store/naming'
export default {
  [Naming.Mutations.SET_MOBILE_MODE](state, {enabled}){
    state.mobile = enabled;
  }
}
