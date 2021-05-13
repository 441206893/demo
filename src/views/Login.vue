<template>
  <div class="login-box">
    <div class="login-content">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
          >
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册" name="zhuce">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
          >
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import jwt from "jwt-decode";
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      activeName: "login",
      ruleForm: {
        //表单数据
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    ...mapActions("loginModule", ["setUserActions"]),
    handleClick(tab) {
      console.log(tab.name);
      this.activeName = tab.name;
      //清空表单数据
      this.ruleForm = {
        username: "",
        password: "",
      };
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //判断--点击登录 还是注册------------------
          if (this.activeName == "login") {
            console.log("点击了登录", this.ruleForm);
            this.setUserActions({
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            });
            ///----- 直接网络请求登录-------
            // this.$api
            //   .getLogin({
            //     username: this.ruleForm.username,
            //     password: this.ruleForm.password,
            //   })
            //   .then((res) => {
            //     console.log(res);
            //     if (res.status===200) {
            //       console.log(jwt(res.data));
            //       let temp = {
            //         username: jwt(res.data).username,
            //         isLogin: Boolean(jwt(res.data).username),
            //         token: res.data,
            //       };
            //       //存储vuex
            //       this.setUser(temp);
            //       //本地存储----
            //       localStorage.setItem("web-ego", JSON.stringify(temp));
            //       //跳转页面
            //       this.$router.push("/");
            //     } else {
            //       this.$message.error("错了哦，账号或者密码有误");
            //     }
            //   });
          } else {
            console.log("点击了注册", this.ruleForm);
            this.$api
              .register({
                username: this.ruleForm.username,
                password: this.ruleForm.password,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  this.$message({
                    message: "恭喜你，注册成功，可以点击登录了",
                    type: "success",
                  });
                } else {
                  this.$message.error('错了哦，这是一条错误消息');
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang='less'>
.login-box {
  background: #999;
  height: 100%;
  overflow: hidden;
  .login-content {
    width: 400px;
    height: 200px;
    margin: 200px auto;
  }
}
</style>