import Vue from 'vue';
import Element from 'element-ui';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhlang from './zh.js';
import enlang from './en.js';
Vue.use(VueI18n)
// 准备翻译的语言环境信息
const messages = {
    en: {
        ...enlang,
        ...enLocale ,//element 
        //其他页面--- 
    },
    zh: {
        ...zhlang,
        ...zhLocale
    }
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})

Element.i18n((key, value) => i18n.t(key, value))

export default i18n