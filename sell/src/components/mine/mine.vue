<template>
  <div class="mine">
    <v-headerco :title="title"></v-headerco>
    <p>
      <img src="./mine.png" >
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headerco from '../common/headerCom/headerCom.vue';
  export default{
    name:"v-mine",
    data(){
      return {
        title:"我的"
      }
    },
    components: {
      'v-headerco': Headerco,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.mine
  margin-top: 43px
  img
    width: 100%
</style>
