<template>
  <div class="manage">
    <!-- Dialog 弹出一个对话框，适合需要定制性更大的场景。 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <!-- 往form里面的props传数据 -->
      <my-from
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </my-from>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <my-from
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </my-from>
    </div>
    <my-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></my-table>
  </div>
</template>

<script>
import MyFrom from "../../src/components/CommonForm.vue";
import MyTable from "../../src/components/CommonTable.vue";
import { getUser } from "../../api/data";

export default {
  name: "MyUser",
  data() {
    return {
      operateType: "add",
      isShow: false,
      // 通过props传入form的formLabel
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      // 通过props传入form中的form
      // 用来接收输入的数据，可以拿来传入给服务器修改后台数据
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
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
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  components: { MyFrom, MyTable },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
        });
      } else {
        // add
        this.$http.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
          this.getList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operaType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      // getUser是封装好的接口，在api里面的data.js中
      getUser({
        page: this.config.page,
        name,
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
    // row代表当前行的数据
    // row是子组件table传过来的数据
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = { ...row };
    },
    delUser(row) {
      this.$confirm("此操作将删除该组件,是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang ='less' scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form {
    margin-top: 21px;
  }
}
</style>