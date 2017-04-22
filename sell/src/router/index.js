import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index.vue'
import Order from '../components/order/order.vue'
import Mine from '../components/mine/mine.vue'
import Find from '../components/find/find.vue'
import Tabs from '../components/tabs/tabs.vue'
import Detail from '../components/detail/detail.vue'
import Goods from '../components/goods/goods.vue'
import Ratings from '../components/ratings/ratings.vue'
import Seller from '../components/seller/seller.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/tabs',
      name: 'Tabs.name',
      component: Tabs,
      children:[
        {
          path: 'index',
          name: 'Index.name',
          component: Index
        },
        {
          path: 'order',
          name: 'Order.name',
          component: Order
        },
        {
          path: 'mine',
          name: 'Mine.name',
          component: Mine
        },
        {
          path: 'find',
          name: 'Find.name',
          component: Find
        }
      ]
    },
    {
      path: '/detail',
      name: 'Detail.name',
      component: Detail,
      children: [
        {
          path: 'seller',
          name: 'Seller.name',
          component: Seller
        },
        {
          path: 'ratings',
          name: 'Ratings.name',
          component: Ratings
        },
        {
          path: 'goods',
          name: 'Goods.name',
          component: Goods
        }
      ]
    }
  ]
})
