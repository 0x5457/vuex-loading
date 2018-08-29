export default {
  namespaced: true,
  state: {},
  mutations: {
    startLoading(state, name) {
      Object.assign(state, { [name]: true });
    },
    endLoading(state, name) {
      Object.assign(state, { [name]: false });
    }
  },
  actions: {}
};

