import Vue from 'vue';
import Element from 'element-ui';
import VueI18n from 'vue-i18n';

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
    en: {
        //首页的语言
        home: {
            product: 'Product Adminis',
            params:'Params Adminis',
            center:'User Center',
            ad:"Advert category"
        },
        ...enLocale ,//element 
        //其他页面--- 
        
    },
    zh: {
        //首页中文
        home: {
            product: '商品管理',
            params:'规格参数',
            center:'个人中心',
            ad:'广告分类'
        },
        ...zhLocale
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'en', // 设置地区
    messages, // 设置地区信息
})

Element.i18n((key, value) => i18n.t(key, value))

export default i18n