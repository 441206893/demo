<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import './assets/iconfont/iconfont.css'
export default {
  name: 'app',
}
</script>
<style>
@import './assets/less/reset.less';
html,body{
  height: 100%;
}
#app{
  height: 100%;
}

</style>
