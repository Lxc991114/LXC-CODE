const Koa = require('koa')
const app = new Koa()

/* 异步方法可以实现2s后在浏览器中显示出hhhh */
function getData() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
     resolve('hhhh');//成功可
    }, 2000)
  })
}

app.use(async (ctx) => {
  ctx.body = await getData()//等待getData()返回之后再赋值
})
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')