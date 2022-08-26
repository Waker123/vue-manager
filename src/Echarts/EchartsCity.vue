<template>
  <div ref="echarts" class="main"></div>
</template>

<script>
import * as echarts from "echarts";
let myChart;
export default {
  name: "EchartsCity",

  props: {
    category: Array,
    barData: Array,
  },

  mounted() {
    setTimeout(() => {
      this.updated();
    }, 1000);
  },
  methods: {
    // option
    updated() {
      myChart = echarts.init(this.$refs.echarts);
      // Generate data
      let lineData = [];
      let addNumber = this.barData.forEach((item) => {
        lineData.push(item + Math.floor(Math.random() * 4000));
      });
      const option = {
        backgroundColor: "#0f375f",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["今日高峰流量", "今日平均流量"],
          textStyle: {
            color: "#ccc",
          },
        },
        xAxis: {
          data: this.category,
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        series: [
          {
            name: "今日高峰流量",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            data: lineData,
          },
          {
            name: "今日平均流量",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" },
              ]),
            },
            data: this.barData,
          },
          {
            name: "今日高峰流量",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(20,200,212,0.5)" },
                { offset: 0.2, color: "rgba(20,200,212,0.2)" },
                { offset: 1, color: "rgba(20,200,212,0)" },
              ]),
            },
            z: -12,
            data: lineData,
          },
          {
            name: "今日高峰流量",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: "#0f375f",
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style>
/* 不设置宽高的话，走马灯中无法显示echarts */
.main {
  width: 1200px;
  height: 600px;
}
</style>