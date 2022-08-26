<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <!-- 可以通过这个v-model双向绑定将页面中输入的数据传入form中 -->
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      >
      </el-input>
    </el-form-item>
    <!-- slot用来存放搜索框之类的 -->
    <el-form-item> <slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "MyRailForm",
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },

};
</script>

<style>
</style>