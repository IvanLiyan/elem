// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/stylus/index.styl'  /*通过引入index的styl文件来引入所有的styl文件*/
import VueResource from 'vue-resource';
import MintUI from "mint-ui";
import './common/stylus/mint-style.css'
Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
