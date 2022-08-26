<template>
  <el-card class="box-card" shadow="hover" :body-style="{ margin: '20px' }">
    <slot name="excelHeadText"></slot>
    <slot name="excelButton"></slot>
  </el-card>
</template>

<script>
export default {
  name: "MyExcel",
};
</script>

<style lang='less' scoped>
.box-card {
  width: 200px;
  height: 150px;
}
</style>