import Vue from 'vue';
import Vuex from 'vuex';
import news from './modules/news';

import VuexLoading from '../../src';
// 创建 VuexLoading
const vxl = VuexLoading.create();

Vue.use(Vuex);

export default new Vuex.Store(vxl.store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    news,
  }
}));
