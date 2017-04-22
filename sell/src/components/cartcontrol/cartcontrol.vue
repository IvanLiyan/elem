<template>
  <div class="cartcontrol">
    <transition name="move"> <!--在外层套transition设置move动画-->
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">   <!--外层设置平移动画-->
        <span class="inner icon-remove_circle_outline"></span> <!--为了动画，多个inner内层负责滚动动画，图标文字在内层-->
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>  <!--用传来的food添加一个新的属性count来显示-->
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'; /*引入vue为了使用vue.set()*/

  export default{
    name:"cartcontrol",
    props: {
      food: { /*加减控件接收goods父组件传来的food，（为了给food添加count属性以判别那个food点加号了）每个商品的食物*/
        type: Object
      }
    },
    created(){
//        console.log(this.food);
    },
    methods: {
      addCart(event){/*设置加号控件的点击事件，即点击哪个food，就给那个food添加一个count属性，在利用是否有count属性判断是否是selectFoods*/
        if (!event._constructed) {  /*取消PC端的better-scroll派发的click事件*/
          return;
        }
        if (!this.food.count) { /*当this.food不存在count属性时要通过vue.set设置新属性*/
          Vue.set(this.food, 'count', 1);  /*利用Vue.set(元素，“新属性”，属性值)*/
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event){
        if (!event._constructed) {  /*取消PC端的better-scroll派发的click事件*/
          return;
        }
        if(this.food.count){
            this.food.count--;
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1  /*外层设置初始的透明度和位置*/
      transform: translate3d(0, 0, 0)  /*开启transform3D加速提高动画效果*/
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear   /*控制内层过度时间*/
        transform: rotate(0)  /*内层设置初始ratate为0*/
      &.move-enter-active, &.move-leave-active   /*设置动画激活时时间*/
        transition: all 0.4s linear  /*控制外层的过度时间*/
      &.move-enter, &.move-leave-active  /*设置动画前和消失后样式*/
        opacity: 0
        transform: translate3d(24px, 0, 0)  /*外层的样式*/
        .inner
          transform: rotate(180deg)   /*内层的样式*/
    .cart-count
      display inline-block
      vertical-align: top;
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
