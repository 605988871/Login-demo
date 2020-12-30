<template>
  <div style="height: 100vh; width: 100vw; margin: -10px" id="content">
    <el-card shadow="hover" class="center-in-center"
      ><div slot="header" class="clearfix">
        <span style="font-size: 20px">登录</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="registerBtn"
          >注册</el-button
        >
      </div>
      <div class="text item">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model.number="ruleForm.username"
              @keypress.native.enter="submitForm"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              @keypress.native.enter="submitForm"
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <register ref="register"></register>
  </div>
</template>

<script>
import Register from "./register.vue";
import axios from "axios";
import CanvasNest from "canvas-nest.js";

export default {
  components: { Register },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    return {
      ruleForm: {
        pass: "",
        username: "",
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        username: [
          { required: true, validator: validateUsername, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    const config = {
      color: "0,205,205",
      opacity: 0.7,
      zIndex: -2,
      count: 200,
    };
    this.$nextTick(() => {
      const cn = new CanvasNest(document.getElementById("content"), config);
    });
  },
  methods: {
    submitForm() {
      const that = this;
      let obj = {
        username: this.ruleForm.username,
        password: this.ruleForm.pass,
      };
      axios
        .post("/api/login", obj)
        .then((res) => {
          if (res.data.code == 2001) {
            this.$store.commit("setToken", res.data.token); //设置token
          }
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.$message.error("用户密码有误，请检查");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    registerBtn() {
      this.$refs.register.open();
    },
  },
};
</script>

<style lang="less" scoped>
.center-in-center {
  width: 30%;
  position: absolute;
  top: 30%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>