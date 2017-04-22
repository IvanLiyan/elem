<template>
  <div class="order">
    <v-headerco :title="title"></v-headerco>
    <p>
      <img src="./order.png" >
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headerco from '../common/headerCom/headerCom.vue';
  export default{
    name: "v-order",
    data(){
      return {
        title: "订单"
      }
    },
    components: {
      'v-headerco': Headerco,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .order
    margin-top: 43px
    img
      width: 100%
</style>
