/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-08 22:27:18
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-08 22:47:34
 */
// 计算服务器耗时的中间件
module.exports = async(ctx,next) => {
    //记录开始的时间
    const start = Date.now()
    //让内层中间件得到执行
    await next()
    //记录结束的时间
    const end = Date.now()
    const duration = end - start
    //设置响应头
    ctx.set('X-Response-Time',duration + 'ms')
}