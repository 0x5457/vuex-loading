export default {
  namespaced: true,
  state: {
    news: []
  },
  mutations: {
    updateNews(state, news) {
      Object.assign(state, {news});
    }
  },
  actions: {
    getNews({commit}) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('updateNews', [{
            title: 'news1',
            content: 'news1news1news1news1news1news1',
          }, {
            title: 'news2',
            content: 'news2news2news2news2news2news2',
          }, {
            title: 'news3',
            content: 'news3news3news3news3news3news3',
          }]);
          resolve();
        }, 1000);
      });
    },
  }
};
