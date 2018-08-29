import Vue from "vue";
import Vuex, { mapActions } from "vuex";
import VuexLoading, { mapLoadings } from "../src/";


Vue.config.productionTip = false;
Vue.use(Vuex);


const vxl = VuexLoading.create();
export default new Vue({
  methods: {
    ...mapActions("news", ["getNews"])
  },
  computed: {
    ...mapLoadings(["news", "news/child"]),
    ...mapLoadings({
      newsLoading1: "news",
      newsLoading2: state => state.news,
      childLoading1: "news/child"
    })
  },
  store: new Vuex.Store(vxl.store({
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
                }, reject => {
                });
              }
            }
          }
        }
      }
    }
  }))
});
