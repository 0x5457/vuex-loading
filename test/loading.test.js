import Vue from "vue";
import Vuex, {mapActions} from "vuex";
import vuexLoading, {getLoadings} from "../src/";


Vue.config.productionTip = false;
Vue.use(Vuex);

it("test loading", done => {
  const store = new Vuex.Store({
    plugins: [vuexLoading],
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
  });
  const vm = new Vue({
    methods: {
      ...mapActions('news', ['getNews', 'otherAction']),
      ...mapActions('news/child', ['getChild']),
    },
    computed: {
      ...getLoadings((loadings) => ({
        newsLoading: loadings.action('news/getNews'),
        otherLoading: loadings.action('news/otherAction'),
        loadingGroup: loadings.action(['news/otherAction', 'news/getNews']),
        childLoading: loadings.action('news/child/getChild'),
      })),
    },
    store,
  });

  expect(vm.otherLoading).toBe(false);
  expect(vm.loadingGroup).toBe(false);
  vm.otherAction().then(() => {
    expect(vm.otherLoading).toBe(false);
    expect(vm.loadingGroup).toBe(false);
    done();
  });
  expect(vm.otherLoading).toBe(true);
  expect(vm.loadingGroup).toBe(true);


  expect(vm.newsLoading).toBe(false);
  vm.getNews().then(() => {
    expect(vm.newsLoading).toBe(false);
    done();
  });
  expect(vm.newsLoading).toBe(true);


  expect(vm.childLoading).toBe(false);
  vm.getChild().then(() => {
    expect(vm.childLoading).toBe(false);
    done();
  });
  expect(vm.childLoading).toBe(true);

});


