<template>
  <div class="mian" ref="chartDom"></div>
</template>

<script>
import * as echarts from "echarts";
let myChart = null;
export default {
  name: "EchartsWeek",
  props: {
    echartsData: Array,
  },
  mounted() {
    setTimeout(() => {
      this.update();
    }, 1000);
  },
  methods: {
    update() {
      myChart = echarts.init(this.$refs.chartDom);
      const seriesDatash = [];
      const seriesDatahz = [];
      const seriesDatabj = [];
      const seriesDatasz = [];
      const seriesDatacd = [];
      const seriesDatagz = [];

      const seriesDate = [];

      for (let i = 0; i < 6; i++) {
        seriesDate.push(`2022/5/${i + 1}`);
      }

      this.echartsData.forEach((item) => {
        seriesDatash.push(item["上海线"]);
        seriesDatahz.push(item["杭州线"]);
        seriesDatabj.push(item["北京线"]);
        seriesDatasz.push(item["苏州线"]);
        seriesDatacd.push(item["成都线"]);
        seriesDatagz.push(item["广州线"]);
      });

      const seriesData = [
        seriesDatash,
        seriesDatahz,
        seriesDatabj,
        seriesDatasz,
        seriesDatacd,
        seriesDatagz,
      ];
      console.log(seriesDate, "111");
      console.log(seriesData, "222");

      const option = {
        color: [
          "#80FFA5",
          "#00DDFF",
          "#37A2FF",
          "#FF0087",
          "#FFBF00",
          "#FF0123",
        ],
        title: {
          text: "周人口流量表",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["上海线", "杭州线", "北京线", "苏州线", "成都线", "广州线"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: seriesDate,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "上海线",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: seriesData[0],
          },
          {
            name: "杭州线",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: seriesData[1],
          },
          {
            name: "北京线",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: seriesData[2],
          },
          {
            name: "苏州线",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: seriesData[3],
          },
          {
            name: "成都线",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: seriesData[4],
          },
          {
            name: "广州线",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(25, 15, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(24, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: seriesData[5],
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style>
.main {
  height: 400px;
  width: 700px;
}
</style>