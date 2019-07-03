<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  export default {
    name: 'doubleLine',
    props: {
      isMonth: {
        type: Boolean,
        default: true
      },
      lineDataStr: {
        type: String,
        default: ''
      },
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    methods: {
      getDays() {
        // 获取当前日期
        var lineDate = new Date();
        var arr = [];
        for(var i = 0;i<7;i++){
          arr.push(new Date(lineDate.getTime() - i*24*60*60*1000).getDate())
        }
        return arr.sort();
      },
      initChart() {
        var that = this;
        this.chart = echarts.init(this.$el, 'macarons');
        var lineData = that.lineDataStr?JSON.parse(that.lineDataStr):'';
        var leftData = that.lineDataStr?lineData.leftData:[0,0,0,0,0,0,0,0,0,0,0,0];
        var rightData = that.lineDataStr?lineData.rightData:[0,0,0,0,0,0,0,0,0,0,0,0];
        that.chart.setOption({
          legend: {
            data:['总题量','正确率']
          },
          xAxis : [
            {
              type : 'category',
              position: 'bottom',
              boundaryGap: false,
              axisLine : {    // 轴线
                show: true
              },
              axisTick : {    // 轴标记
                show:true,
                length: 4,
                lineStyle: {
                  width: 1
                }
              },
              axisLabel : {
                show:true,
                margin: 8,
                rotate: 45,
                formatter: that.isMonth?'{value}月':'{value}日',
                textStyle: {
                  fontSize: 12
                }
              },
              data :
                that.isMonth?[
                '1','2','3','4','5','6','7','8','9','10','11','12'
              ]:that.getDays()
      }
          ],
          yAxis : [
          {
            type : 'value',
            max: 100,
            min: 0,
            splitNumber: 10,
            position: 'left',
            axisLine : {    // 轴线
              show: false
            },
            axisTick : {    // 轴标记
              show:true,
              length: 4
            },
            axisLabel : {
              show:true,
              formatter: function (value) {
                return value + '%'
              },
              textStyle: {
                color: '#39C7C8'
              }
            },
            nameTextStyle: {
              width: 100,
              fontWeight: 'bold'
            },
            splitLine : {
              show:true,
              lineStyle: {
                color: '#ddd',
                width: 1
              }
            }
          },
          {
            type : 'value',
            boundaryGap: [0,0.1],
            axisLine : {    // 轴线
              show: false
            },
            axisLabel : {
              interval: 'auto',    // {number}
              margin: 8,
              formatter: '{value}',
              textStyle: {
                color: '#2E2AA4'
              }
              },
            splitLine : {
              show: false
            }
          }
        ],
          series : [
          {
            name: '正确率',
            type: 'line',
            smooth:false,
            data: leftData
          },
          {
            name:'总题量',
            type: 'line',
            smooth:false,
            yAxisIndex: 1,
            data: rightData
          }
        ]
        })
      },
      selfAdaption ()  {
        let _this = this
         setTimeout(() => {
           window.addEventListener('resize', function () {
             _this.chart.resize();
           })
         }, 10)
      }
    },
    watch: {
      lineDataStr(val, oldVal) {
        this.initChart();
      }
    },
    mounted() {
      this.initChart();
      this.selfAdaption();
    }
  }
</script>

<style lang="less" scoped>
</style>
