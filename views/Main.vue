<template>
  <div>
    <el-container style="height: 100%">
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <my-tags></my-tags>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../src/components/CommonAside.vue";
import CommonHeader from "../src/components/CommonHeader.vue";
import MyTags from "../src/components/CommTage.vue";
export default {
  name: "MyMain",
  components: {
    CommonAside,
    CommonHeader,
    MyTags,
  },
};
</script>

<style lang='less' scoped>
.el-header {
  background-color: rgba(0, 0, 0, 0.7);
}
.el-main {
  padding-top: 0;
  background-color: rgb(15, 55, 95);
}
</style>