<template>
  <div>
    <router-view></router-view>
    <div class="footercom">
      <ul class="footer-ul">
        <li @click="actived(0)" :class="active==0?'active':''">
          <span class="iconfont icon-iconpingtaieleyao"></span>
          <a href="#/tabs/index">外卖</a>
        </li>
        <li @click="actived(1)" :class="active==1?'active':''">
          <span class="iconfont icon-faxian"></span>
          <a href="#/tabs/find">发现</a>
        </li>
        <li @click="actived(2)" :class="active==2?'active':''">
          <span class="iconfont icon-order"></span>
          <a href="#/tabs/order">订单</a>
        </li>
        <li @click="actived(3)" :class="active==3?'active':''">
          <span class="iconfont icon-wo"></span>
          <a href="#/tabs/mine">我的</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import './iconfont.css'
  export default{
    name: "v-footerco",
    data() {
      return {
        active: 0
      }
    },
    methods: {
      actived (i) {
        this.active = i
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .footercom
    position: fixed
    bottom: 0
    width: 100%
    left: 0
    height: 55px
    background: #fff
    .footer-ul
      display flex
      justify-content: space-between
      box-sizing: border-box
      overflow hidden
      width 100%
      height: 55px
      li
        flex: 1
        padding: 10px
        width: 18%
        text-align center
        list-style: none
        a
          display inline-block
          width: 100%
          font-size: 12px
          color: #666666
          line-height 12px
          text-align center
        img
          width: 20px
          height: 20px
          margin: 5 auto
        .selected
          display: none
        #app .iconfont
          font-size 18px
          color: #666
      .active a
        color: #0096ff
      .active span
        color: #0096ff

</style>
