/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-08 22:27:34
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-09 09:57:28
 */
// 计算响应头的中间件
module.exports = async (ctx,next) => {
    const contentType = 'application/json; charset=utf-8'
    ctx.set('Content-type',contentType)
    /**
     * 设置跨域
     */
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
    await next()
}