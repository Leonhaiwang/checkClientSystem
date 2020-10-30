<template
  ><div class="wrap">
    <div class="inner">
      <div class="imglogo">
        <img src="../assets/logo.jpg" width="100%" height="100%" alt="" />
      </div>
      <div class="input">
        <el-form ref="form" :rules="loginFormRules" :model="LoginForm">
          <el-form-item>
            <el-input v-model="LoginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="LoginForm.password"></el-input>
          </el-form-item>

          <el-form-item size="large">
            <div class="button">
              <el-button type="primary" @click="submitForm">登录</el-button>
              <el-button @click="resetForm">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      LoginForm: {
        username: "admin",
        password: "",
      },
      loginFormRules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (
            this.LoginForm.password !== "kfzxrjb666" ||
            this.LoginForm.username !== "admin"
          ) {
            this.$message.error("用户名或密码输入错误");
          } else {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            localStorage.setItem("token", "admin");
            this.$router.push("/home");
          }
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
<style scoped>
.button {
  text-align: center;
}
.el-form {
  margin: 0 20px;
}
.imglogo {
  overflow: hidden;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  top: -75px;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0 0 10px #aaa;
}
.input {
  margin-top: 90px;
}
.wrap {
  height: 100%;
  background-color: #2b4b6b;
}
.inner {
  width: 450px;
  height: 300px;
  position: absolute;
  border-radius: 3px;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
</style>
