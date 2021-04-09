<!--
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-09 17:30:35
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-09 22:50:43
-->
<template>
  <div class='com-container' @contextmenu.prevent="revertMap">
    <div class='com-chart' ref='map_ref'></div>
  </div>
</template>

<script>
import axios from 'axios'
import {getProvinceMapInfo} from '@/utils/map_utils'
export default {
  data() {
    return {
        chartInstance: null,
        allData: null,
        mapData: {}  //获取的省份的地图矢量数据
    }
  },
  mounted(){
      this.initChart()
      this.getData()
      window.addEventListener('resize',this.screenAdapter)
      this.screenAdapter()

  },
  destroyed () {
      window.removeEventListener('resize',this.screenAdapter)
  },
  methods: {
      async initChart(){
          this.chartInstance = this.$echarts.init(this.$refs.map_ref,'chalk')
          // 获取中国地图的矢量数据
          // http://localhost:8999/static/map/china.json
          // 由于我们现在获取的数据并不是位于koa2的后台，所以不能使用this.$http来获取数据
          // 只能通过axios的方法来获取
        //   let dataurl = 'http://localhost:8999/public/static/map/china.json'
          const ret = await axios.get('http://localhost:9001/static/map/china.json')
          this.$echarts.registerMap('china',ret.data)  // 进行地图的注册
          const initOption = {
              title: {
                  text: "▎商家分布",
                  left: 20,
                  top: 20                  
              },
              geo: {
                  type: 'map',
                  map: 'china',
                  top: '5%',
                  bottom: '5%',
                  itemStyle: {
                      areaColor: '#2E72BF',  // 表示地图区域的每一块颜色
                      borderColor: '#333'
                  }
              },
              legend: {
                  left: '5%',
                  bottom: '5%',
                  orient: 'vertical'
              }
          }
          this.chartInstance.setOption(initOption)
          this.chartInstance.on('click', async arg => {
              // arg.name 得到所点击的省份，这个省份又是中文
            //   console.log(arg)
            const provinceInfo = getProvinceMapInfo(arg.name)
            // console.log(provinceInfo)
            // 获取这个身份的地图矢量数据
            // 判断所要获取的数据是否已加入mapData
            if(!this.mapData[provinceInfo.key]){
            // 只有当所要获取的数据没有加载到mapData中时，才需要发起Ajax请求
                const ret = await axios.get('http://localhost:9001' + provinceInfo.path)
                // console.log(ret)
                this.mapData[provinceInfo.key] = ret.data
                this.$echarts.registerMap(provinceInfo.key,ret.data)
                // 切换地图的显示
            }
            
            const chengeOption = {
                geo: {
                    map: provinceInfo.key
                }
            }
            this.chartInstance.setOption(chengeOption)
          })
      },
      async getData(){
          // 获取服务器数据，对this.allData进行赋值之后，调用updateChart方法更新图表
          const {data: ret} = await this.$http.get('map')
          this.allData = ret
          console.log(this.allData)
          this.updateChart()
      },
      updateChart(){
          // 处理图表需要的数据
          // 图例的数据
          const legendArr = this.allData.map(item => {
              return item.name
          })
          const seriesArr = this.allData.map(item => {
              // return的对象代表一个类别的多个散点数据
              // 如果想在
              return {
                  type: 'effectScatter',
                  rippleEffect:{
                      scale: 5,   // 设置更为明显的涟漪效果
                      brushType: 'stroke'   // 设置空心涟漪效果
                  },
                  name: item.name,
                  data: item.children,
                  coordinateSystem: 'geo'
              }
         })
          const dataOption = {
              series: seriesArr,
              legend: {
                  data: legendArr
              }
          }
          this.chartInstance.setOption(dataOption)
      },
      screenAdapter(){
          // 处理屏幕缩放时的分辨率大小问题
          const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
          const adaptOption ={
              title: {
                  textStyle: {
                      fontSize: titleFontSize
                  }
              },
              legend: {
                  itemWidth: titleFontSize / 2,
                  itemHeight: titleFontSize / 2,
                  itemGap: titleFontSize / 2,
                  textStyle: {
                      fontSize: titleFontSize / 2
                  }
              }
          }
          
          this.chartInstance.setOption(adaptOption)
          this.chartInstance.resize()   // 此设置可以自适应地根据外层的容器大小来控制图标的大小
      },
      // 回到中国地图
      revertMap(){
          const revertOption = {
              geo: {
                  map: 'china'
              }
          }
          this.chartInstance.setOption(revertOption)
      }

  }
}
</script>

<style scoped>

</style>
