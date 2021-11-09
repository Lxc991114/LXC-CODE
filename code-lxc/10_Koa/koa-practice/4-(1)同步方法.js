const Koa = require('koa')
const app = new Koa()

/* 同步方法无法实现2s后在浏览器中显示出hhhh */
function getData() {
  setTimeout(function () {
    console.log('hhhh');//可打印在控制台中
  }, 2000)
}

app.use((ctx)=>{
  ctx.body = getData()//因为一调用getData()，就会直接将该函数赋值给ctx.body，因为还没将定时器内内容返回就已经输出了
})
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')