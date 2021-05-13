//创建express框架
const express=require('express')
//创建服务
const app=express()
//post请求
app.use(express.urlencoded({ extended: true }))
 // for parsing application/x-www-form-urlencoded
 //配置资源共享
const cors=require('cors')
app.use(cors())

//静态文件托管 ----  访问：http:localhost:3000/图片.jpg
app.use(express.static('upload'))

//引入路由
const router=require('./router')
//使用路由
app.use('/api',router)

//监听
app.listen(5000,()=>{
    console.log('运行在5000端口上');
})