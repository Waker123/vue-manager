<template>
  <div class="myExcel">
    <Excel class="excelStyle">
      <h3 slot="excelHeadText">导出用户数据</h3>
      <button type="primary" slot="excelButton" @click="exportPersonData">
        导出
      </button>
    </Excel>
    <Excel class="excelStyle">
      <h3 slot="excelHeadText">导出票务数据</h3>
      <button type="primary" slot="excelButton" @click="exportRailData">
        导出
      </button>
    </Excel>
  </div>
</template>

<script>
import { getExcelData, getRailExcelData } from "../../api/data";
import MyExcel from "../../src/Excel/Excel.vue";

export default {
  name: "MyPageOne",
  components: { Excel: MyExcel },
  data() {
    return {
      historyList: [],
      excelData: [],
    };
  },
  methods: {
    // 用户数据生成表
    //触发按钮点击下载事件
    exportPersonData() {
      this.historyList = [];
      this.excelData = [];
      this.$confirm("是否导出数据到Excel表", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 获取mock随机生成的数据
        getExcelData().then((res) => {
          // 把响应返回的数据传入historyList中
          res.data.forEach((item) => {
            this.historyList.push(item);
          });
          // console.log(this.historyList, "his");
          this.excelData = this.historyList; //将你要导出的数组数据（historyList）赋值给excelDate
          this.export2ExcelPerson(); //调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
          this.$message({
            type: "success",
            message: "导出成功",
          });
        });
      });
    },
    // 表格数据写入excel
    export2ExcelPerson() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/Excel/Export2Excel.js");
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = ["id", "姓名", "地址", "年龄", "出生日期", "性别"]; // 导出的excel表头字段名，需要导出表格字段名
        const filterVal = Object.keys(that.excelData[0]); // 导出的excel表头名信息
        console.log(filterVal, "fil");
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "用户信息汇总"); // 导出的表格名称，根据需要自己命名
      });
    },

    // 导出地铁表
    exportRailData() {
      this.historyList = [];
      this.excelData = [];
      this.$confirm("是否导出数据到Excel表", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 获取mock随机生成的数据
        getRailExcelData().then((res) => {
          // 把响应返回的数据传入historyList中
          res.data.forEach((item) => {
            this.historyList.push(item);
          });
          // console.log(this.historyList, "his");
          this.excelData = this.historyList; //将你要导出的数组数据（historyList）赋值给excelDate
          this.export2ExcelRail(); //调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
          this.$message({
            type: "success",
            message: "导出成功",
          });
        });
      });
    },

    export2ExcelRail() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/Excel/Export2Excel.js");
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = [
          "id",
          "出发地",
          "目的地",
          "出发时间",
          "当前票价",
          "剩余票数",
          "剩余班次",
        ]; // 导出的excel表头字段名，需要导出表格字段名
        const filterVal = Object.keys(that.excelData[0]); // 导出的excel表头名信息
        console.log(filterVal, "fil");
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "票务信息汇总"); // 导出的表格名称，根据需要自己命名
      });
    },

    //格式转换，直接复制即可,不需要修改什么
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>

<style lang='less' scoped>
.myExcel {
  display: flex;
  justify-content: center;
  .excelStyle {
    position: relative;
    margin: auto 50px auto 50px;
    border-radius: 15px;
    background-color: rgba(205, 112, 30, 0.7);
    h3 {
      text-align: center;
      margin-top: -20px;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px;
      border-radius: 7px;
      border: 0;
      background-color: skyblue;
      cursor: pointer;
    }
  }
}
</style>
