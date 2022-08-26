

<template>
  <!-- Echarts公共组件封装 -->
  <div ref="echart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      // 柱状图默认配置
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      // 饼状图默认配置
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      echart: null,
    };
  },

  //#region
  /* 
    props: { };   

     1: 类型限制   （强制限制类型）

    props: {

        cmovies: array,       // 数组类型

        cmessage:   string    // 字符串类型

        2.2：   提供了一些默认值

       cmessage: {

           type: string ;     // 定义cmessage: 是字符串类型

           default： ”aaaaa“    //  默认值    （如果data 中没有数据，定义一个默认值）

          如果vue 的版本是大概是： 2.5.17 以后： 就会报错： 要写成函数形式。  default（） {return array || object}

           required: true;   //  表示必填项      （表示在使用子组件的时候： cmessage:  这个属性是必填项， 不填就会报错）

        }

  */
  //#endregion
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    // 从组件外传来的chartData
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  computed: {
    options() {
      // 返回柱状图或者饼图的默认配置
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.initChart();
      },
    },
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        //如果echart已经初始化过了
        this.echart.setOption(this.options);
      } else {
        //如果echart没有被初始化过
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      //当柱状图存在的时候
      if (this.isAxisChart) {
        //柱状图
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        //饼状图
        this.normalOption.series = this.chartData.series;
      }
    },
  },
};
</script>

<style>
</style>