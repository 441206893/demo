/**
 * 请求的地址路径 相对路径
 */
const base={
    baseUrl:'/api',
    login:'/api/login',//登录接口
    register:'/api/register',//注册接口
    tokenList:"/api/tokenList",//校验token是否过期--个人信息
    productList:'/api/projectList',//商品列表界面
    searchUrl:'/api/search',//搜索查询
    selectItemCategory:"/api/backend/itemCategory/selectItemCategoryByParentId",//类目
    insertProduct:"/api/backend/item/insertTbItem",//添加商品
    deleteItemById:"/api/backend/item/deleteItemById",//删除商品  id
    updateTbItem:"/api/backend/item/updateTbItem",//修改商品 
    batchDelete:"/api/batchDelete",//批量删除  idArr
    selectItemParamAll:"/api/backend/itemParam/selectItemParamAll",//规格参数获取 page
    insertItemParam:"/api/backend/itemParam/insertItemParam",//商品类目选择添加
    updateCategory:"/api/update/category",//修改分类规格--------------
    paramsDelete:"/api/params/delete",//规格参数 删除 id 
    getCategoryParams:"/api/category/data",//获取类目参数结构 cid 
    getAdvertList:"/api/content/selectContentCategoryByParentId",// 内容分类管理 导航 id
    insertContentCategory:"/api/content/insertContentCategory",//添加子导航 pid name
    deleteContentCategoryById:"/api/content/deleteContentCategoryById",//删除 pid
    updateContentCategory:"/api/content/updateContentCategory",//修改接口   pid name
    insertTbContent:"/api/content/insertTbContent",//广告内容添加 pid image url name
    selectTbContentAllByCategoryId:"/api/content/selectTbContentAllByCategoryId",//获取广告列表 pid
    deleteContentByIds:"/api/content/deleteContentByIds",//删除 id
}

export default base