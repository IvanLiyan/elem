<template>
  <div class="index">
    <v-headerco :title="title"></v-headerco>
    <div class="search-wrapper">
      <input type="text" class="inpt" placeholder="搜索商家、商品"/>
    </div>
    <mt-swipe :auto="4000">
      <mt-swipe-item><a href="#/detail/goods"><img src="./swiper1.png"></a></mt-swipe-item>
      <mt-swipe-item><a href="#/detail/goods"><img src="./swiper2.png"></a></mt-swipe-item>
    </mt-swipe>
    <div class="sellList" >
      <ul class="sellUl">
        <li><a href="#detail/goods"><img src="./1.png"></a></li>
        <li><a href="#detail/goods"><img src="./2.png"></a></li>
        <li><a href="#detail/goods"><img src="./3.png"></a></li>
        <li><a href="#detail/goods"><img src="./4.png"></a></li>
        <li><a href="#detail/goods"><img src="./5.png"></a></li>
        <li><a href="#detail/goods"><img src="./6.png"></a></li>
        <li><a href="#detail/goods"><img src="./7.png"></a></li>
        <li><a href="#detail/goods"><img src="./8.png"></a></li>
        <li><a href="#detail/goods"><img src="./10.png"></a></li>
        <li><a href="#detail/goods"><img src="./11.png"></a></li>
        <li><a href="#detail/goods"><img src="./12.png"></a></li>
        <li><a href="#detail/goods"><img src="./13.png"></a></li>
        <li><a href="#detail/goods"><img src="./14.png"></a></li>
        <li><a href="#detail/goods"><img src="./15.png"></a></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Headerco from '../common/headerCom/headerCom.vue';
  export default{
    name: "v-index",
    data(){
      return {
          title:"外卖首页"
      }
    },
    components: {
      'v-headerco': Headerco,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .index
    .search-wrapper
      position: relative
      top: 43px
      left: 0
      height: 80x
      background: #0096ff
      width: 100%
      display: flex
      .inpt
        width: 90%
        margin: 20px auto;
        text-align center;
        border-radius:40px;
        height: 40px
        background: #fff;
        border:none;
        font-size:14px;
    .mint-swipe
      position: relative;
      top: 44px;
      height: 180px
      margin-bottom: 10px
      img
        width: 100%
    .sellList
      position: relative
      top: 20px
      width: 100%
      margin-top 20px
      .sellUl
        li
          width: 100%
        img
          width: 100%
          height: 100%

</style>
