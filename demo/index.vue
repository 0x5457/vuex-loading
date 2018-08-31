<template>
  <div class="wrapper">
    <button @click="getNews">重新加载</button>
    <div class="loading" v-if="newsLoading">加载中...</div>
    <div class="news-item" v-else v-for="(item, index) in news">
      <h3>{{item.title}}</h3>
      <p>{{item.content}}</p>
      <button :disabled="likeLoading" @click="doLike(index)">{{item.like ? '取消' : '赞'}}</button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import {mapLoadings} from '../src';

  export default {
    name: 'Index',
    computed: {
      ...mapLoadings(['news', 'like']),
      ...mapState('news', ['news'])
    },
    methods: mapActions('news', ['getNews', 'doLike']),
    mounted() {
      this.getNews();
    },
  }
</script>

<style scoped>
  .wrapper{
    width: 350px;
    margin: 0 auto;
    padding: 10px;
  }
  .news-item{
    border: 2px solid #333;
    padding: 10px;
    margin: 10px;
  }
  .news-item h3{
    margin: 0;
  }
  .loading{
    text-align: center;
    line-height: 240px;
  }
</style>
