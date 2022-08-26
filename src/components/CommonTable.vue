<template>
  <div class="Common-table">
    <!-- data属性用于接收数据 label是显示的标题-->
    <!-- 
      当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。
     -->
    <el-table :data="tableData" height="500px" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 使用作用域插槽，这里用scope对象来通过子组件传递数据到父组件 -->
        <!-- 这里的 slot-scope="scope" 是elementui中固定的 -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <!-- 使用scope数据传递到父组件 -->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 这里的total也是从外部传入 -->
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "MyTable",
  data() {
    return {};
  },
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang='less' scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>