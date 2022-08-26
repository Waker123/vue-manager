<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        auto-complete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from "mockjs"; //用mock来模拟token
import { getMenu } from "../../api/data";

export default {
  name: "MyLogin",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于三位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then((res) => {
        if (res.data.code === 20000) {
          console.log(res);
          this.$store.commit("tab/clearMenu");
          this.$store.commit("tab/setMenu", res.data.data.menu);
          this.$store.commit("user/setToken", res.data.data.token);
          this.$store.commit("tab/addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
      // const token = Mock.Random.guid();
      // this.$store.commit("user/setToken", token);
      // this.$router.push((name = "home"));
    },
  },
};
</script>

<style lang='less' scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 20px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 0px auto 40px auto;
  color: #505458;
  text-align: center;
}
.login_submit {
  margin: 10px auto 0px 10px;
}
</style>