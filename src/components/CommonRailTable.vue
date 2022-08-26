<template>
  <div class="Common-table">
    <el-table :data="tableData" height="500px" stripe>
      <!-- 表头,其数据从父组件传来 -->
      <el-table-colum
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 110"
      >
        <!-- 在列内插入数据 -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-colum>
      <!-- 在列内插入两个按钮 -->
      <el-table-colum label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-colum>
    </el-table>

    <!-- 页码 -->
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
  name: "MyRailTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  //   事件方法，通过emit将要编辑的行数据传回给父组件
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