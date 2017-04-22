<template>
  <!--传入一个starType对象来绑定不同的class，从而设置为不同大小图片-->
  <!--遍历itemClasses数组（一个span一个数组元素on/off/half作为class）传入class每个span的star的样式（全，半，空）-->
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass,index) in itemClasses" :class="itemClass" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default{
//    name: 'star',
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
        /*starType拼接class的格式为star-24*/
      },
      itemClasses() {  /*返回一个数组，[on,on,on,on,half,off]*/
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    .star-item /*设置每个星星的公用样式*/
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px /*计算出48px的星星的间距*/
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        /*设置最后一个星的右侧没间距*/
        &.on /*再加一个class来进行根据全、半、空添加背景图（加&.是因为是star-item同一个class如果不加&.则表示其子级的class名on）*/
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
