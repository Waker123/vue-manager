<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(item, index) in tags"
      :key="item.name"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "MyTage",
  data() {
    return {};
  },
  computed: {
    ...mapState("tab", { tags: "tabsList" }),
  },
  methods: {
    ...mapMutations("tab", { close: "closeTag" }),
    changeMenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
    handleClose(item, index) {
      const length = this.tags.length - 1;
      this.close(item.name);
      //   如果点击的tag于当前所在的路由一致，那么就关闭不了
      if (item.name !== this.$route.name) {
        return;
      }
      //   如果点击的是最右侧的tag,向左跳转一个
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        //如果点击的是中间的，向右跳转一次(这里删除一项后index已经减一了，不需要再加一)
        this.$router.push.tags[index].name;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>