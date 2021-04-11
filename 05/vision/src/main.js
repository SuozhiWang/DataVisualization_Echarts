/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-10 17:34:24
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-11 09:15:29
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体的文件
import './assets/font/iconfont.css'
// 引入全局的样式文件
import './assets/css/global.less'
import axios from 'axios'
import socketService from '@/utils/socket_service'
// 对服务端进行websocket的连接
socketService.Instance.connect()
// 将socket的instance对象挂在到vue原型对象上,其他的组件就可以通过this.$socket来调用
Vue.prototype.$socket = socketService.Instance
// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到Vue的原型对象上
// 在别的组件中 this.$http
Vue.prototype.$http = axios

// 将全局的echarts对象挂载到Vue的原型对象上
// 别的组件中 this.$echarts
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
