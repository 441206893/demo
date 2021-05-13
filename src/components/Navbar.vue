<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#38f"
    router
    :collapse="isShow"
  >
    <el-menu-item>
      <span slot="title">易购后台管理系统</span>
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">{{ $t("home.product") }}</span>
    </el-menu-item>
    <el-menu-item index="/params">
      <i class="el-icon-document"></i>
      <span slot="title">{{ $t("home.params") }}</span>
    </el-menu-item>
    <el-menu-item index="/advert">
      <i class="el-icon-setting"></i>
      <span slot="title">{{ $t("home.ad") }}</span>
    </el-menu-item>
    <el-menu-item index="/center">
      <i class="el-icon-s-custom"></i>
      <span slot="title">{{ $t("home.center") }}</span>
    </el-menu-item>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["isShow"],
  methods: {
    //this.$router.path
  },
};
</script>

<style scoped lang='less'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.is-active {
  background: #1f2d3d !important;
}
</style>