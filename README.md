# vuexl

自动处理 vuex action中的 loading 状态，不用一遍遍地写 showLoading 和 hideLoading

灵感来自于 [dva-loading](https://github.com/dvajs/dva/tree/master/packages/dva-loading)

---

## 安装 vuexl
```shell
$ npm i -S vuexl
```


## 例子

```javascript
import Vue from 'vue';
import Vuex, { mapActions, mapState } from 'vuex';
import Vuexl, { mapLoadings } from 'vuexl';
import axios from 'axios';

Vue.use(Vuex);

// 创建 Vuexl
const vxl = Vuexl.create({
  beforeAction(actionType, payload) {},
  afterAction(actionType, payload) {},
});

// vxl.create(store);  将store对象传入vxl
const store = new Vuex.Store(vxl.store({
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
      },
    },
  },
}));

new Vue({
  el: '#app',
  store,
  computed: {
    // 将 this.newsLoading 映射为 this.$sotre.state.loadings.news
    ...mapLoadings(['news']),
    ...mapState('news', ['news']),
  },
  methods: {
    ...mapActions('news', ['getNews']),
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
