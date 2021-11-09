const Koa = require('koa')//Koa是一个类
const app = new Koa()

app.use( async ( ctx ) => {//异步的函数
  ctx.body = '试一下koa'//ctx.body的内容会打印在浏览器中
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')