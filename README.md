## 项目介绍
  1. 项目分类
        前端界面（用户看到的界面 ）
        后台管理界面 （ 商家看到的界面 ）

## 项目搭建

  1. 安装项目---模块
        vue create ego
        vue add element 
        cnpm i axios --save 
        解析token字段
        cnpm i jwt-decode --save


  2. 项目整理
      1. 删除 helloworld.vue
      2. 项目初始化--创建基本组件
      3. 公共的样式处理 

  3. 导航组件
      1. 创建导航组件 --公共组件 Navbar.vue
      2. 引入layout组件 使用
      3. 导航组件布局--点击实现切换路由界面 

  4. 登录界面
      1. 路由守卫
      2. 登录界面布局

## 搭建后台服务器
  1. 安装的模块
      cnpm i express --save 
      cnpm i mysql --save 
      
      后台token配置
      cnpm i  jsonwebtoken --save 

## 登录界面
  1. 网络请求 --用之前封装的网络请求的request.js 
  2. 跨域 --- proxy 反向代理（vue.config.js）
  3. 封装js 公共请求地址 （方便修改维护）
  
### 前后端交互
  1. 获取登录信息 token字段
  2. 安装jwt-decode 解析token字段  
  3. 存储登录信息 存储vuex 
  4. token字段--路由守卫获取token 
  5. 本地存储token 用户信息
   
## 商品管理
  1. 获取首页数据 el-table 
  2. 分页功能（公共的组件）
  3. 搜索功能 （el-input）获取输入的内容
   
### 商品添加
  1. 点击按钮--弹框显示 以及添加的信息--
  2. 弹框内嵌弹框 
  3. 弹框内容是表单数据
  4. 弹框-类目选择--tree组件（懒加载）
     1. 懒加载获取类目数据
     2. 点击继续获取动态数据
      </代码>
          loadNode(node, resolve) {
            if (node.level === 0) {
              this.$api.selectItemCategory().then((res) => {
                console.log(res);
                return resolve(res.result);
              });
            }
            if (node.level >= 1) {
                console.log(node);
              this.$api.selectItemCategory({
                  id:node.data.cid
              }).then((res) => {
                console.log(res);
              if(res.status===200){
                    return resolve(res.result);
              }else{
                  return resolve([]); 
              }
              });
            }
      </代码>
  5. 
### wangeditor编译器
  1. 安装编译器 
     1. cnpm i wangeditor --save
  2. 创建一个div容器（编译器）
  3. 导入wangeditor富文本编译器
     1. import E from 'wangeditor'
     2. 声明周期函数 mounted创建 wangeditor实例
        1. data(){ return {editor:''}}
        2.  this.editor = new E(this.$refs.wangEditor);
        3.  this.editor.create();
     3. 获取wangeditor输入的数据--传递给父组件
         this.editor.config.onchange = val=> {
            this.$emit('getWangeditor',val)
          };
  4. 父组件绑定事件--接受传递的数据 
  

### 国际化 （中英文切换）
  1. vuei18n 
     1. 官网：https://kazupon.github.io/vue-i18n/zh/
     2. 安装vuei18n 
        1. npm install vue-i18n
        2. 引入插件 （模块）
            import Vue from 'vue'
            import VueI18n from 'vue-i18n'

            Vue.use(VueI18n)
        3. 准备语言
            // 准备翻译的语言环境信息
              const messages = {
                en: {
                  message: {
                    hello: 'hello world'
                  }
                },
                ja: {
                  message: {
                    hello: 'こんにちは、世界'
                  }
                }
              }

              // 通过选项创建 VueI18n 实例
              const i18n = new VueI18n({
                locale: 'ja', // 设置地区
                messages, // 设置地区信息
              })
        4. 导出模块  注入vue实例
        5. <p>{{ $t("message.hello") }}</p>


  2. element-ui 国际化  
     1. import Element from 'element-ui'
     2. import enLocale from 'element-ui/lib/locale/lang/en'
        import zhLocale from 'element-ui/lib/locale/lang/zh-CN'  

      Element.i18n((key, value) => i18n.t(key, value))

### PDF打印
  1. 安装vue-pdf
     1. npm install --save vue-pdf
  2. pdf当成组件使用
     1. import pdf from 'vue-pdf'
     2. export default {
          components: {
            pdf
          }
        }
     3. <pdf> </pdf>
  3.  <pdf src="./static/relativity.pdf"></pdf>
  4.  属性：
      1.  <pdf :src='src' :page='显示第几页' />
      2.  打印 print()