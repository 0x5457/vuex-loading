import Vue from "vue";
import Vuex, {mapActions} from "vuex";
import vuexLoading, {mapLoadings} from "../src/";


Vue.config.productionTip = false;
Vue.use(Vuex);


export default new Vue({
  methods: {
    ...mapActions('news', ['getNews', 'otherAction'])
  },
  computed: {
    ...mapLoadings(['news', 'news/child', 'other']),
    ...mapLoadings({
      newsLoading1: 'news',
      newsLoading2: state => state.news,
      childLoading1: 'news/child'
    })
  },
  store: new Vuex.Store(vuexLoading.store({
    modules: {
      news: {
        namespaced: true,
        state: {
          news: []
        },
        actions: {
          async getNews() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 500);
            }, reject => {
            });
          },
          @vuexLoading.loading('other')
          async otherAction() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 500);
            });
          }
        },
        modules: {
          child: {
            namespaced: true,
            actions: {
              async getChild() {
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                  }, 500);
                });
              }
            }
          }
        }
      }
    }
  }))
});
