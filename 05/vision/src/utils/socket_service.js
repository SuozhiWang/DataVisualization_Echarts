/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-10 22:16:18
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-11 09:59:32
 */
export default class SocketService{
    /**
     * 单例设计模式
     */
    static instance = null;
    static get Instance (){
        if(!this.instance){
            this.instance = new SocketService()
        }
        return this.instance
    }

    // 和服务端连接的socket对象
    ws = null
    
    // 存储回调函数
    callBackMapping = {
    }
    // 标识是否连接到服务器
    connected = false
    // 记录重新尝试发送数据次数
    sendRetryCount = 0
    // 记录重新连接服务器次数
    connectRetryCount = 0
    // 定义连接服务器的方法
    connect(){
        // 连接服务器
        if(!window.WebSocket){
           return console.log('您的浏览器不支持websocket')
        }
        this.ws = new WebSocket('ws://localhost:9998')

        // 连接成功的事件
        this.ws.onopen = () => {
            console.log('连接服务端成功')
            this.connected = true
            // 当连接成功之后，将连接重试次数重置为0
            this.connectRetryCount = 0
        }

        // 连接服务端失败
        // 以下两种情况下调用
        // 1.服务器连接失败
        // 2.当连接成功后，服务器关闭
        this.ws.onclose = () => {
            console.log('连接服务端失败')
            this.connected = false
            this.connectRetryCount++
            setTimeout(() => {
                this.connect()
            }, this.connectRetryCount * 500);
        }
        // 获取服务端发送过来的数据
        this.ws.onmessage = msg => {
            console.log('从服务端获取到了数据')
            // 真正从服务端发送来的数据
            // console.log(msg.data)
            const recvData = JSON.parse(msg.data)
            const socketType = recvData.socketType
            // 判断回调函数是否存在
            if(this.callBackMapping[socketType]){
                const action = recvData.action
                // 如果action为getData
                if(action === 'getData'){
                    const realData = JSON.parse(recvData.data)
                    this.callBackMapping[socketType].call(this,realData)
                }else if(action === 'fullScreen'){  // 如果action为fullScreen
                    
                }else if(action === 'themeChange'){  // 如果action为themeChange
                    
                }
            }
        }
    }
    // 回调函数的注册
    registerCallBack(socketType,callBack){
        this.callBackMapping[socketType] = callBack
    }
    // 取消回调函数
    unRegisterCallBack(socketType){
        this.callBackMapping[socketType] = null
    }

    // 定义发送数据的方法
    send(data){
        // 判断此刻有没有连接成功服务器
        if(this.connected){
            this.sendRetryCount = 0
            this.ws.send(JSON.stringify(data))
        }else{
            this.sendRetryCount++
            setTimeout(() => {
                this.send(data)
            }, this.sendRetryCount * 500);
        }   
    }
}