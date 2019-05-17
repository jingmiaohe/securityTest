<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  export default {
    name: 'pie',
    props: {
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
        default: '200px'
      },
      scoreLevel: {
        type: String,
        default: '--'
      },
      skill: {
        type: Number,
        default: 0
      },
      knowledge: {
        type: Number,
        default: 0
      },
      awareness: {
        type: Number,
        default: 0
      }
    },
    methods: {
      initChart() {
        var that = this;
        var dataStyle = {
          normal: {
            label: {show:false},
            labelLine: {show:false}
          }
        };
        var placeHolderStyle = {
          normal : {
            color: '#ddd',
            label: {show:false},
            labelLine: {show:false}
          },
          emphasis : {
            color: '#ddd'
          }
        };
        this.chart = echarts.init(this.$el, 'macarons');
        this.chart.setOption({
          title: {
            text: this.scoreLevel,
            x: 'center',
            y: 'center',
            textStyle : {
              color : 'rgba(30,144,255,0.8)',
              fontFamily : '微软雅黑',
              fontSize : 25,
              fontWeight : 'bolder'
            }
          },
          tooltip : { // 悬停
//            show: true,
//            a（系列名称），b（数据项名称），c（数值）, d（饼图：百分比 | 雷达图：指标名称）
            formatter: "{b} : {d}%"
          },
          legend: { // 图例
            orient: 'vertical',
            show: true,
            right: 0,
            bottom: 10,
            itemGap: 5,
            data:['S(技能)','K(知识)','A(意识)']
          },
          series : [
            {
              name:'1',
              type:'pie',
              clockWise:true, // 顺时针
              radius: [65, 80],
              hoverOffset: 2,
              itemStyle : {
                normal:{
                color: '#f8b62d',
                label: {show:false},
                labelLine: {show:false}
              }
              },
              data:[
                {
                  value: this.skill,
                  name:'S(技能)'
                },
                {
                  value:100-this.skill,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            },
            {
              name:'2',
              type:'pie',
              clockWise:true, // 顺时针
              radius : [45, 60],
              hoverOffset: 2,
              itemStyle : {normal:{
                color: '#ea5514',
                label: {show:false},
                labelLine: {show:false}
              }},
              data:[
                {
                  value:this.knowledge,
                  name:'K(知识)'
                },
                {
                  value:100-this.knowledge,
                  name:'invisible',
                  itemStyle : placeHolderStyle,
                  toolTip: {
                    show:false
                  }
                }
              ]
            },
            {
              name:'3',
              type:'pie',
              clockWise:true, // 顺时针
              radius : [25, 40],
              hoverOffset: 2,
              itemStyle : {normal:{
                color: '#8fc31f',
                label: {show:false},
                labelLine: {show:false}
              }},
              data:[
                {
                  value:this.awareness,
                  name:'A(意识)'
                },
                {
                  value: 100-this.awareness,
                  name:'invisible',
                  itemStyle : placeHolderStyle,
                  toolTip: {
                    show:false
                  }
                }
              ]
            }
          ]
        })
//        this.chart.on('mouseOver', function(e) {
//          if (e.name === 'invisible') {
//            console.log(e)
//            that.chart.dispatchAction({
//              type: 'hideTip'
//            });
//          } else {
//            that.chart.dispatchAction({
//              type:'showTip',
//              name:e.name,
//              x:e.event.offsetX,
//              y:e.event.offsetY
//            });
//          }
//        })
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
    mounted() {
      this.initChart();
      this.selfAdaption();
    }
  }
</script>

<style lang="less" scoped>
</style>
