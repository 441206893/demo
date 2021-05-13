/**
 * 网络请求的方法
 */
import {
  get,
  post
} from '../plugins/request.js';
import config from './config'
const api = {
  /**
   * 登录请求  参数：username, password
   */
  getLogin(params) {
    return post(config.baseUrl + config.login, params)
  },
  /**
   * 注册请求   参数：username  password
   */
  register(params) {
    return post(config.baseUrl + config.register, params)
  },
  /**
   * token过期时间检测--个人信息
   */
  tokenList() {
    return post(config.baseUrl + config.tokenList)
  },
  /**
   * 商品列表接口  参数：页码 page
   */
  productList(params) {
    return get(config.baseUrl + config.productList, params)
  },
  /**
   * 查询接口 参数：search
   */
  searchUrl(params) {
    return get(config.baseUrl + config.searchUrl, params)
  },
  /**
   * 类目选择 参数：id  
   */
  selectItemCategory(params) {
    return get(config.baseUrl + config.selectItemCategory, params)
  },
  /**
   * 添加商品 
   * title cid  category sellPoint price num desc paramsInfo image
   */
  insertProduct(params) {
    return get(config.baseUrl + config.insertProduct, params)
  },
  /**
   * 删除商品 id
   */
  deleteItemById(params) {
    return get(config.baseUrl + config.deleteItemById, params)
  },
  /**
   * 修改商品信息 id 
   * title cid  category sellPoint price num desc paramsInfo image
   */
  updateTbItem(params) {
    return get(config.baseUrl + config.updateTbItem, params)
  },
  /**
   * 批量删除 idArr
   */
  batchDelete(params) {
    return get(config.baseUrl + config.batchDelete, params)
  },
  /**
   * 规格参数列表  page
   */
  selectItemParamAll(params) {
    return get(config.baseUrl + config.selectItemParamAll, params)
  },
  /**
   * 商品类目增加itemCatId类目cid  content表单信息-字符串 specsName 类目名称
   */
  insertItemParam(params) {
    return get(config.baseUrl + config.insertItemParam, params)
  },
  /**
   * 修改规格参数   id itemCatId类目cid  content表单信息-字符串 specsName 类目名称
   */
   updateCategory(params){
    return get(config.baseUrl + config.updateCategory, params)
   },
   /**
    * 删除规格参数 id
    */
    paramsDelete(params){
      return get(config.baseUrl + config.paramsDelete, params)
    },
    /**
     * 商品添加的时候获取类目的规格参数 cid
     */
     getCategoryParams(params){
      return get(config.baseUrl + config.getCategoryParams, params)
     },
     /**
      * 广告分类列表获取---id
      */
      getAdvertList(params){
        return get(config.baseUrl + config.getAdvertList, params)
      },
      /**
       * 增加子广告 pid name
       */
       insertContentCategory(params){
        return get(config.baseUrl + config.insertContentCategory, params)
       },
       /**
        * 删除广告  pid
        */
        deleteContentCategoryById(params){
          return get(config.baseUrl + config.deleteContentCategoryById, params)
        },
        /**
         * 修改广告名称  pid name 
         */
         updateContentCategory(params){
          return get(config.baseUrl + config.updateContentCategory, params)
         },
         /** 
          * 获取广告信息   pid
          */
          selectTbContentAllByCategoryId(params){
            return get(config.baseUrl + config.selectTbContentAllByCategoryId, params)
          },
          /**
           * 新增广告内容---
           */
           insertTbContent(params){
            return get(config.baseUrl + config.insertTbContent, params)
           }



}

export default api