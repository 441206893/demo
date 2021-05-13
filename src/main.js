import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import './router/guard.js';
import api from './api/index.js';
// import i18n from './plugins/vuei18n.js';
import i18n from './lang/index';

Vue.prototype.$api=api
Vue.config.productionTip = false

//获取本地存储数据 token 
let token=localStorage.getItem('web-ego');
if(token){//有数据--登录过
  let obj=JSON.parse(token);
  //把存储的数据 保存到vuex数据里面--登录模块
  store.commit('loginModule/setUser',obj)
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
