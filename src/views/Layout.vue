<template>
  <div class="layout">
    <div class="layout-left">
      <Navbar :isShow="isShow"></Navbar>
    </div>
    <div class="layout-content" :class="isShow ? 'layout-content2' : ''">
      <div class="header">
        <span class="header-icon" @click="changeMenu">
          <i
            :class="isShow ? 'icon-right-indent' : 'icon-left-indent'"
            class="iconfont"
          ></i>
        </span>
        <div class="header-right">
          <div class="user">
            <el-dropdown trigger="click" @command='changeLang'>
              <span class="el-dropdown-link">
                选择语言<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="user">hello {{ user.username }}</div>
          <div @click="exdit" class="user">
            <i class="iconfont icon-tuichu"></i>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Layout",
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState("loginModule", ["user"]),
  },
  components: {
    Navbar,
  },
  methods: {
    //切换语言----
    changeLang(val) {
      this.$i18n.locale = val;
    },
    ...mapMutations("loginModule", ["setUser"]),
    changeMenu() {
      this.isShow = !this.isShow;
    },
    //退出登录-----
    exdit() {
      //1.跳转登录界面  2.清空本地存储数据  3.vuex数据清空
      localStorage.removeItem("web-ego");
      this.setUser({
        username: "",
        isLogined: false,
        token: "",
      });
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped lang='less'>
.layout {
  height: 100%;
  .layout-left {
    // width: 200px;
    float: left;
    background: #304156;
    height: 100%;
    // margin-right: 10px;
    .el-menu {
      border-right: 0;
    }
  }
  .layout-content {
    margin-left: 200px;
    .header {
      height: 56px;
      line-height: 56px;
      padding-left: 10px;
      background: #1e78bf;
      color: #fff;
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;
      .header-icon .iconfont {
        font-size: 26px;
      }
      .header-right {
        float: right;
        padding-right: 20px;
        color: #fff;
        .user {
          padding-right: 10px;
          float: left;
          color: #fff;
          .el-dropdown{
            color: #fff;
            margin-right: 10px;
          }
          .icon-tuichu {
            font-size: 22px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .layout-content2 {
    margin-left: 64px;
  }
}
</style>
