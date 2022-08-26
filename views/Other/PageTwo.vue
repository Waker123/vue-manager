<template>
  <!-- <div><EchartsRiver style="height: 600px"></EchartsRiver></div> -->
  <div class="block">
    <span class="demonstration">数据详细展示</span>
    <el-carousel trigger="click" height="700px"  :interval='0'>
      <el-carousel-item class="item">
        <h3>今月人流量变化</h3>
        <EchartsRiver style="height:600px"></EchartsRiver>
      </el-carousel-item>
      <el-carousel-item class="item">
        <h3>上海线</h3>
        <echarts-city style="height:600px" :barData="shanghaiBar" :category="shanghaicate"></echarts-city>
      </el-carousel-item>  
      <el-carousel-item class="item">
        <h3>杭州线</h3>
        <echarts-city style="height:600px" :barData="hangzhouBar" :category="hangzhoucate"></echarts-city>
      </el-carousel-item>  
      <el-carousel-item class="item">
        <h3>北京线</h3>
        <echarts-city style="height:600px" :barData="beijingBar" :category="beijingcate"></echarts-city>
      </el-carousel-item>
            <el-carousel-item class="item">
        <h3>苏州线</h3>
        <echarts-city style="height:600px" :barData="suzhouBar" :category="suzhoucate"></echarts-city>
      </el-carousel-item>
            <el-carousel-item class="item">
        <h3>成都线</h3>
        <echarts-city style="height:600px" :barData="chengduBar" :category="chengducate"></echarts-city>
      </el-carousel-item>
      <el-carousel-item class="item">
        <h3>广州线</h3>
        <echarts-city style="height:600px":barData="guangzhouBar" :category="guangzhoucate"></echarts-city>
      </el-carousel-item>
      
    </el-carousel>
  </div>
</div>
</template>

<script>
import EchartsRiver from "../../src/Echarts/EchartsRiver.vue";
import EchartsCity from "../../src/Echarts/EchartsCity.vue";
import { getMonthData } from "../../api/data";

export default {
  name: "MyPageTwo",
  data() {
    return {
      shanghaiBar: [],
      hangzhouBar: [],
      beijingBar: [],
      suzhouBar: [],
      chengduBar: [],
      guangzhouBar: [],
      shanghaicate: [],
      hangzhoucate: [],
      beijingcate: [],
      suzhoucate: [],
      chengducate: [],
      guangzhoucate: [],
    };
  },
  components: {
    EchartsRiver,
    EchartsCity,
  },
  mounted() {
    getMonthData().then((res) => {
      //   console.log(res, "rrrrrrrrrr");
      const shanghaiData = [];
      const hangzhouData = [];
      const beijingData = [];
      const suzhouData = [];
      const chengduData = [];
      const guangzhouData = [];
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
        shanghaiData.forEach((item) => {
          this.shanghaiBar.push(item[1]);
          this.shanghaicate.push(item[0]);
        });
        hangzhouData.forEach((item) => {
          this.hangzhouBar.push(item[1]);
          this.hangzhoucate.push(item[0]);
        });
        beijingData.forEach((item) => {
          this.beijingBar.push(item[1]);
          this.beijingcate.push(item[0]);
        });
        suzhouData.forEach((item) => {
          this.suzhouBar.push(item[1]);
          this.suzhoucate.push(item[0]);
        });
        chengduData.forEach((item) => {
          this.chengduBar.push(item[1]);
          this.chengducate.push(item[0]);
        });
        guangzhouData.forEach((item) => {
          this.guangzhouBar.push(item[1]);
          this.guangzhoucate.push(item[0]);
        });
      }
    });
  },
  // beforeDestroy() {
  //   (this.shanghaiBar = []),
  //     (this.hangzhouBar = []),
  //     (this.beijingBar = []),
  //     (this.suzhouBar = []),
  //     (this.chengduBar = []),
  //     (this.guangzhouBar = []),
  //     (this.shanghaicate = []),
  //     (this.hangzhoucate = []),
  //     (this.beijingcate = []),
  //     (this.suzhoucate = []),
  //     (this.chengducate = []),
  //     (this.guangzhoucate = []);
  // },
};
</script>

<style lang='less' scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: orangered;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
