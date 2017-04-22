<template>
  <div class="find">
    <v-headerco :title="title"></v-headerco>
    <p>
      <img src="./find.png" >
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headerco from '../common/headerCom/headerCom.vue';
  export default{
    name: "v-find",
    data(){
      return {
        title:"发现"
      }
    },
    components: {
      'v-headerco': Headerco,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .find
    margin-top: 43px
    img
      width: 100%
</style>
