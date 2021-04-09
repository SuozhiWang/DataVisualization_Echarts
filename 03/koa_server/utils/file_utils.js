/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-08 22:28:17
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-09 09:39:09
 */
// 读取json文件中的数据
const fs = require('fs')
module.exports.getFileJsonData = (filePath) => {
    // 根据文件路径 读取文件内容
    return new Promise((resolve,reject) => {
        fs.readFile(filePath,'utf-8',(error,data) => {
            if(error){
                //读取文件失败
                reject(error)
            }else{
                //读取文件成功
                resolve(data)
            }
        })
    })
}