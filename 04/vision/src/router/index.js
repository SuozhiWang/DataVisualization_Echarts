/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-10 10:41:56
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-10 11:00:34
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '@/views/SellerPage'
import TrendPage from '@/views/TrendPage'
import MapPage from '@/views/MapPage'
import RankPage from '@/views/RankPage'
import HotPage from '@/views/HotPage'
// import StockPage from '@/views/StockPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sellerpage',
    component: SellerPage
  },
  {
    path: '/trendpage',
    component: TrendPage
  },
  {
    path: '/mappage',
    component: MapPage
  },
  {
    path: '/rankpage',
    component: RankPage
  },
  {
    path: '/hotpage',
    component: HotPage
  }
  // {
  //   path: '/stockpage',
  //   component: StockPage
  // }
]

const router = new VueRouter({
  routes
})

export default router
