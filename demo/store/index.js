import Vue from 'vue';
import Vuex from 'vuex';
import news from './modules/news';

import vuexLoading from '../../src';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    news,
  },
  plugins: [vuexLoading],
});
