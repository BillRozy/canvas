import Naming from '@/store/naming'
export default {
  [Naming.Mutations.REMOVE_OFFER] (state, { id }) {
    state.session.user.portfolio.photoOffers = state.session.user.portfolio.photoOffers.filter(offer => offer.id !== id);
  },
  [Naming.Mutations.ADD_PHOTO_OFFER] (state, { offer }) {
    state.session.user.portfolio.photoOffers.push(offer);
  },
}
