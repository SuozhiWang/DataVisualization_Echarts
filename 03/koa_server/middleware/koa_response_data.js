/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-08 22:27:07
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-09 09:45:14
 */
// 处理业务逻辑中间件
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx,next) => {
    //根据url
    const url = ctx.request.url;    //  设置/api/seller   ../data/seller.json
    let filePath = url.replace('/api', '')  //  /seller
    filePath = '../data' + filePath + '.json'  //    ../data/seller.json
    filePath = path.join(__dirname,filePath)
    try{
        const ret = await fileUtils.getFileJsonData(filePath)   //通过调用getFileJsonData这个函数实现json数据的解析
        ctx.response.body = ret
    }catch{
        const errorMsg = {
            message: "读取失败，文件资源不存在",
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }    
    console.log(filePath)
    await next()
}