/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-07 22:59:29
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-07 23:23:14
 */
//1. 创建Koa对象
const Koa = require('koa')
const app = new Koa()
//2. 编写响应函数（中间件）
app.use((ctx,next) => {
    console.log(ctx.request.url);
    ctx.request.body = 'hello world'
})
//3.绑定端口号 3000
app.listen(3000)

