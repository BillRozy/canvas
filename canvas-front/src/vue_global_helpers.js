import Naming from '@/store/naming';
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
};
