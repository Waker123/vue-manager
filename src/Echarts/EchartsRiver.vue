<template>
  <div ref="echarts" class="main"></div>
</template>

<script>
import * as echarts from "echarts";
import { getMonthData } from "../../api/data";
let myChart;
export default {
  name: "EchartsRiver",
  data() {
    return {
      riverData: [],
    };
  },
  mounted() {
    this.updated();
  },
  methods: {
    updated() {
      myChart = echarts.init(this.$refs.echarts);
      const shanghaiData = [];
      const hangzhouData = [];
      const beijingData = [];
      const suzhouData = [];
      const chengduData = [];
      const guangzhouData = [];

      getMonthData().then((res) => {
        //   console.log(res, "rrrrrrrrrr");
        const { code, data } = res.data;
        if (code === 20000) {
          data.forEach((item) => {
            if (item[2] === "上海线") shanghaiData.push(item);
            if (item[2] === "杭州线") hangzhouData.push(item);
            if (item[2] === "北京线") beijingData.push(item);
            if (item[2] === "苏州线") suzhouData.push(item);
            if (item[2] === "成都线") chengduData.push(item);
            if (item[2] === "广州线") guangzhouData.push(item);
          });
          // 将排序好的数组再合并为riverData
          this.riverData = [
            ...shanghaiData,
            ...hangzhouData,
            ...beijingData,
            ...suzhouData,
            ...chengduData,
            ...guangzhouData,
          ];
          // console.log(this.riverData, "rrrrrrrrrrssss");
          const option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "line",
                lineStyle: {
                  color: "rgba(0,0,0,0.2)",
                  width: 1,
                  type: "solid",
                },
              },
            },
            legend: {
              data: [
                "上海线",
                "杭州线",
                "北京线",
                "苏州线",
                "成都线",
                "广州线",
              ],
            },
            singleAxis: {
              top: 50,
              bottom: 50,
              axisTick: {},
              axisLabel: {},
              type: "time",
              axisPointer: {
                animation: true,
                label: {
                  show: true,
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                  opacity: 0.2,
                },
              },
            },
            series: [
              {
                type: "themeRiver",
                emphasis: {
                  itemStyle: {
                    shadowBlur: 20,
                    shadowColor: "rgba(0, 0, 0, 0.8)",
                  },
                },
                data: this.riverData,
              },
            ],
          };

          option && myChart.setOption(option);
        }
      });
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