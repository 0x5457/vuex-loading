import Vue from 'vue';
import store from './store';
import Index from './index.vue';

new Vue({
  el: 'body',
  store,
  ...Index,
});
