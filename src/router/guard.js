import router from './index';
import store from '../store';
//全局导航守卫中检查元字段
router.beforeEach((to, from, next) => {
    //1.检测是否需要登录认证  2.是否登录--检测是否已经登录
    if (to.meta.isLogin) {
      //假设不存在token  有没有：登录过 存储token数据
      const token=store.state.loginModule.user.token
      if(token){
        next()
      }else{//跳转登录
          next({
            path:'/login'
          })
      }
  
    } else {
      next()
    }
  })
