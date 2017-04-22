<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <!--根据父级调用时传递的selectType是否为对应的数字来判断是否被激活-->
      <span @click="select(2,$event)" class="block positive" :class="{active:selectType===2}">{{desc.all}} <span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{active:selectType===0}">{{desc.positive}} <span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{active:selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    props: {
      ratings: {
        /*接收ratings数据*/
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        /*设置传入默认显示的rating类型*/
        type: Number,
        default: ALL
      },
      onlyContent: {
        /*设置是否只看评论的参数*/
        type: Boolean,
        default: false
      },
      desc: {
        /*设置选择类型的描述文字*/
        type: Object,
        default() {
          return {
            all: "全部",
            positive: "满意",
            negative: "不满意"
          }
        }
      }
    },
    methods: {
      select(type, event) { /*设置选中的type利用emit传递给父组件修改 this.selectType来改变显示*/
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type)
      },
      toggleContent(event) {  /*通过自己的方法emit传递给父组件，告诉父组件改变了数据*/
        if (!event._constructed) {
          return;
        }
        this.$emit('toggleContent');
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px


</style>
