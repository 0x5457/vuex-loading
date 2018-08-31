import Vue from 'vue';
import Index from './index.vue';
import store from './store';

new Vue({
  el: 'body',
  store,
  ...Index,
});
