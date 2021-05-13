import api from '../../api';
import jwt from 'jwt-decode';
import router from '../../router';
import element from 'element-ui';
export default {
    //命名空间
    namespaced: true,
    //数据仓库
    state: {
        user: { //用户信息
            username: '',
            isLogined: false,
            token: ''
        }
    },
    mutations: {
        setUser(state, value) {
            state.user = value;
        }
    },
    actions: { //异步登录请求--- 
        setUserActions({ commit }, value) {
            api.getLogin(value)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        console.log(jwt(res.data));
                        let temp = {
                            username: jwt(res.data).username,
                            isLogin: Boolean(jwt(res.data).username),
                            token: res.data,
                        };
                        //存储vuex
                       commit('setUser',temp)
                        //本地存储----
                        localStorage.setItem("web-ego", JSON.stringify(temp));
                        //跳转页面
                        router.push("/");
                    } else {
                        // console.log(element);
                        element.Message.error("错了哦，账号或者密码有误");
                    }
                });
        }
    }
}