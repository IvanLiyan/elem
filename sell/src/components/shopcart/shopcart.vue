<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList"> <!--给购物车添加点击事件切换cartList的显示隐藏-->
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}"> <!--根据是否有totalcount来添加logo的highlight的class样式-->
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div> <!--购物车右上角小数字当toralCount>0时显示-->
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent='pay'><!--直接在点击事件后面+stop+prevent来阻止冒泡和默认事件-->
          <div class="pay" :class="this.totalPrice<this.minPrice?'not-enough':'enough'">{{payDesc}}</div>
        </div>
      </div>
      <!--<div class="ball-container">  &lt;!&ndash;设置小球的wrapper&ndash;&gt;-->
      <!--<div v-for="ball in balls">  &lt;!&ndash;遍历balls数组中小球数&ndash;&gt;-->
      <!--<transition name="drop">-->
      <!--<div class="ball" v-show="ball.show">  &lt;!&ndash;要结合v-show来设置动画&ndash;&gt;-->
      <!--<div class="inner inner-hock"></div>-->
      <!--</div>-->
      <!--</transition>-->
      <!--</div>-->
      <!--</div>-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow"> <!--通过listShow控制cartList显示隐藏-->
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <div class="empty" @click="empty">清空</div>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="listHide"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from "../cartcontrol/cartcontrol.vue"
  export default{
    name: "v-shopcart",
    data(){
      return {
        /*设置小球数组*/
//        balls: [
//          {
//            show: false
//          },
//          {
//            show: false
//          },
//          {
//            show: false
//          },
//          {
//            show: false
//          },
//          {
//            show: false
//          }
//        ],
        fold: true  /*设置折叠状态fold默认为ture即为折叠*/
      }
    },
    components: {
      cartcontrol
    },
    props: {
      selectFoods: {  /*通过这个数组控制购物车的显示！*/
        /*接收从goods传来的数组，用于保存选中的food的price和count*/
        type: Array,
        default(){  /*默认返回一个空[]*/
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {  /*如果没有数量直接将点击事件ruturn来防止连续点击切换turn和false*/
          return
        } else {   /*当有数量时取反来控制true和flase（默认为false）*/
          this.fold = !this.fold;
        }
      },
      empty(){
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      listHide() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        } else {
          window.alert(`支付${this.totalPrice}元`);
        }
      }
    },
    computed: {
      totalPrice() {  /*利用计算属性计算totalPrice*/
        let total = 0;
        this.selectFoods.forEach((food) => { /*利用forEach循环selectFoods数组，food即数组中每一个元素*/
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '支付';
        }
      },
      listShow(){
        if (!this.totalCount) { /*当没有count时利用设置fold为true，并且show为false*/
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        /*设置变量show,取反fold的值来控制，如果fold为false即展开时则show即为true显示*/
        if (show) {
          this.$nextTick(() => {   /*设置在显示时生成scroll*/
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  @import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    height: 48px
    background: #666
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px

      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41) /*设置ball过度时间和动画*/
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0) /*设置动画显示后样式（位置为相对于原来y轴平移100%）*/
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      /*设置激活时的动画时间*/
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      /*设置动画前的位置*/
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px /*设置最大高度*/
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)

</style>
