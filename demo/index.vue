<template>
  <div style="padding: 10px; width: 300px;">
    <button @click="getNews">重新加载</button>
    <div style="line-height: 240px; text-align: center;" v-if="newsLoading">加载中...</div>
    <div v-else v-for="item in news">
      <h3>{{item.title}}</h3>
      <p>{{item.content}}</p>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import {mapLoadings} from '../src';

  export default {
    name: 'Index',
    computed: {
      ...mapLoadings(['news']),
      ...mapState('news', ['news'])
    },
    methods: mapActions('news', ['getNews']),
    mounted() {
      this.getNews();
    },
  }
</script>

