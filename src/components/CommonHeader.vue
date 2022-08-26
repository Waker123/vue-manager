<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-s-grid" size="mini" @click="handleMenu">
      </el-button>
      <el-breadcrumb separator="/" class="Breadcrumb">
        <el-breadcrumb-item
          :to="{ path: item.path }"
          v-for="item in tags"
          :key="item.path"
          >{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      userImg: require("../assets/image/xiaoren.jpg"),
    };
  },
  methods: {
    ...mapMutations("tab", { collapseMenu: "collapseMenu" }),

    handleMenu() {
      // this.$store.commit("collapseMenu");
      this.collapseMenu();
    },

    logOut() {
      //点击退出
      this.$store.commit("user/clearToken");
      this.$store.commit("tab/clearMenu");
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    ...mapState("tab", { tags: "tabsList" }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  .l-content {
    display: flex;
    margin: 10px 0;
    h3 {
      line-height: 40px;
      margin-left: 5px;
    }
    .Breadcrumb {
      line-height: 40px;
      margin-left: 10px;
    }
  }
  .r-content {
    display: flex;
    align-items: center;
    margin-right: 20px;
    span img {
      width: 40px;
      border-radius: 50%;
    }
  }
}
</style>