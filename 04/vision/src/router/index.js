/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-09 10:09:10
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-09 20:41:44
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '@/views/SellerPage'
import TrendPage from '@/views/TrendPage'
import MapPage from '@/views/MapPage'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
