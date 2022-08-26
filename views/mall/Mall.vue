<template>
  <div class="manage">
    <el-dialog
      :visible.sync="isShow"
      :title="operateType === 'add' ? '新增数据' : '更新数据'"
    >
      <my-rail-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </my-rail-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addData">+新增</el-button>
      <my-rail-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getRailList(searchForm.keyword)"
          >搜索</el-button
        >
      </my-rail-form>
    </div>
    <!-- 传入table组件 -->
    <my-rail-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getRailList()"
      @edit="editData"
      @del="delData"
    ></my-rail-table>
  </div>
</template>

<script>
import MyRailForm from "../../src/components/CommonRailForm";
import MyRailTable from "../../src/components/CommonTable.vue";
import {
  getRailData,
  updateRailData,
  addRailData,
  delRailData,
} from "../../api/data";

export default {
  name: "MyMall",
  components: { MyRailForm, MyRailTable },
  data() {
    return {
      operateType: "add",
      isShow: false,
      // 存放在浏览器中输入的数据
      operateForm: {
        cityName: "",
        destination: "",
        goTime: "",
        ticketPrice: "",
        remainder: "",
        shift: "",
      },

      // 存放要显示在form上的数据
      operateFormLabel: [
        {
          model: "cityName",
          label: "出发地",
          type: "input",
        },
        {
          model: "destination",
          label: "目的地",
          type: "input",
        },
        {
          model: "goTime",
          label: "发车时间",
          type: "input",
        },
        {
          model: "ticketPrice",
          label: "票价",
          type: "input",
        },
        {
          model: "remainder",
          label: "剩余票数",
          type: "input",
        },
        {
          model: "shift",
          label: "剩余班次",
          type: "input",
        },
      ],
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "cityName",
          label: "出发地",
        },
        {
          prop: "destination",
          label: "目的地",
        },
        {
          prop: "goTime",
          label: "出发时间",
        },
        {
          prop: "ticketPrice",
          label: "当前票价",
        },
        {
          prop: "remainder",
          label: "剩余票数",
        },
        {
          prop: "shift",
          label: "剩余班次",
        },
      ],
      config: {
        page: 1,
        total: 2,
      },
    };
  },
  methods: {
    confirm() {
      console.log(this.operateForm, "zhizhizhi");
      if (this.operateType === "edit") {
        updateRailData(this.operateForm).then((res) => {
          this.isShow = false;
          this.getRailList();
        });
      } else {
        // add
        addRailData(this.operateForm).then((res) => {
          this.isShow = false;
          this.getRailList();
        });
      }
    },

    addData() {
      this.isShow = true;
      this.operaType = "add";
      this.operateForm = {
        cityName: "",
        destination: "",
        goTime: "",
        ticketPrice: "",
        remainder: "",
        shift: "",
      };
    },

    getRailList(cityName = "") {
      this.config.loading = true;
      cityName ? (this.config.page = 1) : "";
      // getUser是封装好的接口，在api里面的data.js中
      getRailData({
        page: this.config.page,
        cityName,
        // es6解构赋值 data代表res中的data
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.list.map((item) => {
          // item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.data.count;
        this.config.loading = false;
      });
    },
    editData(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = { ...row };
    },
    delData(row) {
      console.log("执行力");
      this.$confirm("此操作将删除该行数据,是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        console.log(id, "xxxxxxxxxxx");
        delRailData({
          id,
        }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getRailList();
        });
      });
    },
  },
  created() {
    this.getRailList();
  },
};
</script>

<style lang='less' scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form {
    margin-top: 21px;
  }
}
</style>