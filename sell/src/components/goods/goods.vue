<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>  <!--当获取的当前currentIndex和自己的index相等时添加current的class样式-->
          <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
            <span class="text  border-1px">
              <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">  <!--遍历每个goods大分类，设置标题-->
            <h1 class="title">{{item.name}}</h1>
            <ul>   <!--给每个li绑定点击事件，selectFood用来设置food组件显示(传入food数据和event对象)-->
              <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                <!--遍历goods里面的每个food食物，给每个li-->
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月销售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>  <!--将li循环的food传给加减按钮控件-->
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--给购物车组件传递selectfoods计算属性，返回选中的food数组，即有选中的food的price和count！-->
      <v-shopcart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                  :minPrice="seller.minPrice"></v-shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>  <!--给子组件添加ref，方便获取子组件dom元素-->
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import shopcart from "../shopcart/shopcart.vue";
  import cartcontrol from "../cartcontrol/cartcontrol.vue"
  import food from "../foods/foods.vue"
  export default{
    name: "v-goods",
    components: {
      "v-shopcart": shopcart,
      "cartcontrol": cartcontrol,
      "food":food
    },
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0, /*用来记录滚动时的高度*/
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {   /*利用computed计算属性：对滚动距离scrollY与listHeight每个高度比较返回左边menu的index*/
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]; /*height1为第一个高度*/
          let height2 = this.listHeight[i + 1]; /*height2为第二个高度即第一个的底部*/
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {  /*在1和2之间或没有2时index为1*/
            return i;
          }
        }
        return 0;
      },
      selectFoods(){  /*根据food是否有count属性，添加被用户选中的food到一个新的foods数组中*/
        let foods = [];  /*设置一个空的foods数组用来保存用户添加的food信息（这个food信息从goods里拿来push进foods）*/
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {  /*用户点击哪个加号，则那个加号对应的food就添加了count属性*/
              foods.push(food);    /*将有count属性的food加到foods数组中*/
            }
          })
        })
        return foods;
      }
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {/*为了取消浏览器接收的better-scroll派发的点击事件（产生两次点击事件）*/
          return;
        }
        let foodList = this.$refs.foodList;
        /*利用ref获取DOM元素，获取到foodlist的li元素*/
        let el = foodList[index];
        /*传入index找到对应的li赋值为el*/
        this.foodsScroll.scrollToElement(el, 300);
        /*利用better-scroll的scrollToElement方法滚动到el元素再设置时间300ms*/
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3  /*better-srcoll的方法用来试试监听滚动的距离*/
        });
        this.foodsScroll.on('scroll', (pos) => {  /*通过on绑定scroll滚动事件，利用pos.y获取到y轴的滚动距离赋给scrollY*/
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {  /*计算每个li的高度*/
        let foodList = this.$refs.foodList;
        /*利用ref获取li的DOM元素ref名为foodList*/
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      /*设置每个food的li的点击事件，传入food和事件对象，将传入的food数据赋给data中的selectedFood*/
      selectFood(food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food;
        this.$refs.food.show()  /*这里在点击时利用ref获取到子组件food的DOM再调用food的方法show来显示food组件*/
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === 0) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          })
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    width: 100%
    top: 174px
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease /*给每个icon的父级的不同class设置不同的bg-img(利用mixin填入图片名)*/
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px


</style>
