# @tw666/vuex-loading

自动处理 vuex action中的 loading 状态，不用一遍遍地写 showLoading 和 hideLoading

灵感来自于 [dva-loading](https://github.com/dvajs/dva/tree/master/packages/dva-loading)

---

## 安装 vuex-loading
```shell
$ npm i -S @tw666/vuex-loading
```


## 例子

```javascript
import Vue from 'vue';
import Vuex, { mapActions, mapState } from 'vuex';
import vuexLoading, { mapLoadings } from 'vuex-loading';
import axios from 'axios';

Vue.use(Vuex);

// after before Hook
vuexLoading.beforeAction = (actionType, payload) => {}
vuexLoading.afterAction = (actionType, payload) => {}

//   将store对象传入vuexLoading
const store = new Vuex.Store(vuexLoading.store({
  modules: {
    news: {
      namespaced: true,
      state: {
        news: [],
      },
      mutations: {
        updateNews(state, news) {
          Object.assign(state, { news });
        },
      },
      actions: {
        async getNews({commit}) {
          const res = await axios.get('/news');
          commit('updateNews', res.data.data);
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
    },
  },
}));

new Vue({
  el: '#app',
  store,
  computed: {
    // 将 this.newsLoading 映射为 this.$sotre.state.loadings.news
    // 将 this.otherLoading 映射为 this.$sotre.state.loadings.other
    ...mapLoadings(['news', 'other']),
    ...mapState('news', ['news']),
  },
  methods: {
    ...mapActions('news', ['getNews', 'otherAction']),
  },
  created() {
    this.getNews();
  },
  render() {
    return (
      <main>
        {
          this.newsLoading ?
            <div>加载中...</div> :
            <div>{this.news}</div>
        }
        <button onClick={this.getNews}>重新加载</button>
      </main>
    );
  },
});

```

更多用法见 [demo](https://github.com/tw1997/vuex-loading/tree/master/demo)

