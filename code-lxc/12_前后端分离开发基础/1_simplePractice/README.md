# 创建简单版项目
1.前端：创建test-fe文件夹，npm init -y初始化一个包，简单配置html文件，右键用live server启动
2.后端：使用koa-generator脚手架创建test-rd文件夹,npm install安装依赖的包，简单配置；npm start启动
3.使用axios发送请求
4.解决ajax跨域：
在后端的app.js文件中使用：
// 处理跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  // next继续执行下一个中间件————————如果没有，则被第一个中间件捕获后就不会继续执行下面的中间件
  await next()
})
