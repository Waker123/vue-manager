<template>
  <div>
    <!-- gutter是栅格内距，意为中间的大盒子外边框为20px -->
    <el-row class="home" :gutter="20">
      <!-- span为栅格数，默认为24格，8格就为页面的1/3大小 -->
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <p>上次登录的时间：<span>2022-7-14</span></p>
          <p>上次登录的地点：<span>杭州</span></p>
        </el-card>
        <el-card style="margin-top: 20px; height: 725px">
          <el-table :data="tableData" :row-style="{ height: '90px' }">
            <!-- prop	对应列内容的字段名，也可以使用 property 属性 -->
            <!-- label	显示的标题 -->
            <!-- 这里的val为课程。。。，key为name。。。 -->
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px">
        <!-- 下面这段css在less中 -->
        <el-card shadow="hover" style="height: 450px" class="card">
          <echarts-week
            :echartsData="dataList"
            style="height: 400px"
          ></echarts-week>
        </el-card>
        <!-- 折线图 -->
        <el-card shadow="hover" style="height: 260px">
          <!-- <div style="height: 280px" ref="lineEcharts"></div> -->
          <Echarts
            :chartData="echartData.order"
            style="height: 240px"
          ></Echarts>
        </el-card>
        <div class="graph">
          <!-- 柱状图 -->
          <el-card shadow="hover" style="height: 260px">
            <!-- <div style="height: 240px" ref="userEcharts"></div> -->
            <Echarts
              :chartData="echartData.user"
              style="height: 240px"
            ></Echarts>
          </el-card>
          <!-- 饼图 -->
          <el-card style="height: 260px">
            <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
            <Echarts
              :chartData="echartData.video"
              style="height: 240px"
              :isAxisChart="false"
            ></Echarts>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../../api/data.js";
// import * as echarts from "echarts";
// 引入echarts公共组件
import Echarts from "../../src/Echarts/EchartsConfig.vue";
import EchartsWeek from "../../src/Echarts/EchartsSolid.vue";

export default {
  name: "MyHome",
  data() {
    return {
      userImg: require("../../src/assets/image/xiaoren.jpg"),
      tableData: [],
      tableLabel: {
        name: "高铁线",
        todayPerson: "今日人流量",
        yesterdayPerson: "昨日人流量",
        monthPerson: "今月人流量",
      },
      dataList: [],

      echartData: {
        // 折线
        order: {
          xData: [],
          series: [],
        },
        // 柱状
        user: {
          xData: [],
          series: [],
        },
        // 饼图
        video: {
          series: [],
        },
      },
    };
  },
  components: {
    // 引入Echarts公共组件
    Echarts,
    EchartsWeek,
  },

  mounted() {
    // res是通过mock虚拟返回的响应数据
    getData().then((res) => {
      // es6解构赋值(这段是给echarts准备数据,把从mock收到虚拟的响应数据做成echarts)
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;

        this.dataList = data.dataList;

        // 折线图
        const order = data.orderData;
        // order.data就是mock里的数据 可以通过orderData里面的data属性返回List数组
        // 定义一个变量接收x轴的数据
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]); //这里的order.data[0]指的是push的第一个数据，是一个对象，里面有苹果，vivo等键值对数据
        // 这个series来给echarts提供数据来源，里面要用的属性见echarts示例
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // 折线图
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          // 有两个对象，一个是新增用户，一个是活跃用户
          {
            name: "今日人流量",
            data: data.userData.map((item) => item.todayPerson),
            // bar代表柱状图
            type: "bar",
          },
          {
            name: "相比于昨日浏量",
            data: data.userData.map((item) => item.addPerson),
            type: "bar",
          },
        ];

        this.echartData.video.series = [
          {
            // 饼图数据需要的是一个数组对象，里面要包含name和value
            data: data.videoData,
            type: "pie",
          },
        ];
      }
      console.log(res);
    });
  },
};
</script>

<style>
.card {
  padding: 0px;
  margin-bottom: 20px;
}
</style>