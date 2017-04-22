<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Tabs from './components/tabs/tabs.vue';
  import Goods from './components/detail/detail.vue';
  export default {
    name: 'app',
    data(){
      return {

      }
    },
    components: {
      'v-tabs': Tabs
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
