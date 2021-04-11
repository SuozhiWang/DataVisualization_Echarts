<!--
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-04-10 16:18:35
 * @LastEditors: wsz
 * @LastEditTime: 2021-04-10 17:24:10
-->
<!-- 库存销量分析 -->
<template>
  <div class="com-container">
      <div class="com-chart" ref="stock_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        chartInstance: null,
        allData: null,
        currentIndex: 0,
        timerId: null  //定时器的标识
    }
  },
  mounted () {
      this.initChart()
      this.getData()
      window.addEventListener('resize',this.screenAdapter)
      this.screenAdapter()
  },
  destroyed () {
      window.removeEventListener('resize',this.screenAdapter)
      clearInterval(this.timerId)
  },
  methods: {
      initChart(){
          // 获取到echart实例
          this.chartInstance = this.$echarts.init(this.$refs.stock_ref,'chalk')
          const initOption = {
              title: {
                  text: '▎库存和销量分析',
                  left: 20,
                  top: 20
              }

          }          
          this.chartInstance.setOption(initOption)
          // 设置当用户鼠标移入图表的时候就取消定时器
          this.chartInstance.on('mouseover',() => {
              clearInterval(this.timerId)
          })
          // 设置当用户鼠标移出图表的时候重启定时器
          this.chartInstance.on('mouseout',() => {
              this.startInterval()
          })


      },
      async getData(){
          const { data: ret} = await this.$http.get('/stock')
          this.allData = ret
          console.log(this.allData)
          this.updateChart()
          this.startInterval()   //获取数据之后就启动定时器
      },
      updateChart(){
          // 设置每一个圆环的圆心坐标
        const centerArr = [
            ['18%', '40%'],
            ['50%', '40%'],
            ['82%', '40%'],
            ['34%', '75%'],
            ['66%', '75%']
        ]
        // 设置每一个圆环的颜色渐变范围
        const colorArr = [
            ['#4FF778', '#0BA82C'],
            ['#E5DD45', '#E8B11C'],
            ['#E8821C', '#E55445'],
            ['#5052EE', '#AB6EE5'],
            ['#23E5E5', '#2E72BF']
        ]
        const start = this.currentIndex * 5
        const end = (this.currentIndex + 1) * 5
          const showData = this.allData.slice(start,end)
          const seriesArr = showData.map((item,index) => {
              return {
                  type: 'pie',
                  radius: [110,100],
                  center: centerArr[index],
                  hoverAnimation: false,   // 设置关闭鼠标移入移出时的动画
                  labelLine: {
                      show: false
                  },
                  label: {
                      position: 'center',
                      color: colorArr[index][0]
                  },
                  data: [
                      {
                          // 销量数据
                          name: item.name + '\n' + item.sales,
                          value: item.sales,
                          itemStyle: {
                              color: new this.$echarts.graphic.LinearGradient(0,1,0,0,[
                                  {
                                      offset: 0,
                                      color: colorArr[index][0]
                                  },
                                  {
                                      offset: 1,
                                      color: colorArr[index][1]
                                  }
                              ])
                          }
                      },
                      {
                          // 库存数据
                          value: item.stock,
                          itemStyle: {
                              color: '#333843'
                          }
                      }
                  ]
              }
          })
          const dataOption = {
              series: seriesArr
          }
          this.chartInstance.setOption(dataOption)
      },
      screenAdapter(){
          const titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6
          const innerRadius = titleFontSize * 2
          const outterRadius = innerRadius * 1.125
          const adapterOption = {
              title: {
                textStyle: {
                    fontSize: titleFontSize
                }
                },
              series: [
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 2
                    }
                },
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 2
                    }
                },
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 2
                    }
                },
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 2
                    }
                },
                {
                    type: 'pie',
                    radius: [outterRadius, innerRadius],
                    label: {
                    fontSize: titleFontSize / 2
                    }
                }
                ]
          }
          this.chartInstance.setOption(adapterOption)
          this.chartInstance.resize()
      },
      startInterval(){
          if(this.timerId){
              clearInterval(this.timerId)   // 如果已经存在定时器，先清除然后重新启动
          }
          this.timerId = setInterval(() => {
              this.currentIndex ++
              if(this.currentIndex > 1){
                  this.currentIndex = 0
              }
              this.updateChart()   //在更改完currentIndex之后  需要更新界面
          }, 5000);
      }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>

</style>
