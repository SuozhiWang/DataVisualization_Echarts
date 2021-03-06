/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-08 22:31:36
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-09 09:29:05
 */
// 服务器入口文件
// 1.创建koa的实例对象
const Koa = require('koa')
const app = new Koa()
//2. 绑定中间件
//绑定第一层中间件 
const respDurationMiddleware = require('./middleware/koa_response_duration')
app.use(respDurationMiddleware)
//绑定第二层中间件 响应头中间件
const resHederMiddleware = require('./middleware/koa_response_header')
app.use(resHederMiddleware)
//绑定第三层中间件
//读取文件当中内容
const resDataMiddleware = require('./middleware/koa_response_data')
app.use(resDataMiddleware)
//3.绑定端口号
app.listen(8888)