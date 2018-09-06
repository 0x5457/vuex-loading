import Vue from 'vue';
export default {
  namespaced: true,
  state: {
  },
  mutations: {
    addLoading(state, name) {
      Vue.set(state, [name], false);
    },
    startLoading(state, name) {
      if (state[name] !== undefined) {
        Object.assign(state, {[name]: true});
      }
    },
    endLoading(state, name) {
      if (state[name] !== undefined) {
        Object.assign(state, {[name]: false});
      }
    }
  },
};

