<template>
  <div class="headerco">
    <a href="javascript:window.history.go(-1);" class="icon-arrow_lift"></a>
    <p class="title">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: "v-headerco",
    props:{
      title:{
         type:String,
         default:"顶部"
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .headerco
    height: 44px
    width: 100%
    position: absolute
    top: 0
    left: 0
    text-align: center
    font-size 18px
    background: #0096ff
    .title
      height: 44px
      width: 100%
      line-height: 44px
      color: #ffffff
      font-weight: 700
      margin: 0 auto

  .icon-arrow_lift
    position: absolute
    left: 0
    top: 0
    font-size: 18px
    font-weight: 700px
    color: #ffffff
    line-height: 44px
    width: 44px
    text-align: center
</style>
