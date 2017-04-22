<template>
  <div class="detail">
    <v-headerDel :seller="seller"></v-headerDel>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/detail/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/detail/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/detail/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>  <!--通过vue的keep-alive组件来让组件的路由切换不用重新渲染，利用缓存状态来记录一些信息-->
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from "../../common/js/util";
  import HeaderDel from "../common/headerDel/headerDel.vue";
  const ERR_OK = 0;
  export default{
    name: "v-detail",
    components: {
      "v-headerDel": HeaderDel
    },
    data() {
      return {
        seller: {
          id:(()=> {  /*在传输seller数据时添加设置一个参数商家的id*/
              let queryParam = urlParse();  /*调用urlParse方法获取解析url后保存id的Obj对象*/
              return queryParam.id;  /*获取url中的id*/
          })()
        }
      }
    },
    mounted(){
      this.$http.get('/api/seller?id='+this.seller.id).then((response) => {  /*在请求数据时url中拼入id，根据商家id进行获取*/
        response = response.body;
        if (response.errno === ERR_OK) {
          /*为了在goods页面能获取到seller的id属性要利用 对象.assign方法（类似于extend）来给seller拓展新的属性以保存id和data*/
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl" /*利用import引入mixin*/
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.router-link-active  /*vue-router自带一个样式，当使用router-link-active可以直接在其classs上设置样式*/
          color: rgb(240, 20, 20)
</style>
