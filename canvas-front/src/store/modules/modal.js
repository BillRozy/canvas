import Naming from '@/store/naming';
const state = {
  visible: false,
  content: {},
  container: {},
  onCloseCallback: null,
};

const mutations = {
  [Naming.Mutations.SET_MODAL_CONTAINER](state, { container }) {
    state.container = container;
  },
  [Naming.Mutations.SET_MODAL_CONTENT](state, { content, closeCallback }) {
    state.container.innerHTML = '';
    state.container.appendChild(content);
    state.onCloseCallback = closeCallback;
  },
  [Naming.Mutations.SET_MODAL_VISIBILITY](state, { visibility }) {
    state.visible = visibility;
  },
};

export default {
  state,
  mutations,
};
