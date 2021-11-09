const Koa = require("koa");
const logger = require("./5_exports自定义日志中间件");

const app = new Koa();

/* 1.基本的引入方法 */
// 1.app.use( logger ); 
// 2. app.use(logger())

/* 2.(1) */
//app.use(logger)
/* 2.（2） */
app.use(async (ctx)=>{
    ctx.body = await logger(ctx)
})

app.listen(3000);
console.log("[demo] start-quick is starting at port 3000");



