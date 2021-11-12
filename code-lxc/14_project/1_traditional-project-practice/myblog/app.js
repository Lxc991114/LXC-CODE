const Koa = require('koa')
const app = new Koa()
/* 路由 */
const router = require('./routes')
/* 模板引擎*/
const views = require("koa-views");
const path = require("path");
/* 静态资源 */
const serve = require('koa-static');
/* 表单处理 */
var bodyParser = require('koa-bodyparser');

// 加载模板引擎
app.use(
    views(path.join(__dirname, "./views"), {//当前项目在电脑上的绝对路径和项目下模板引擎的路径进行拼接
     extension: "ejs",//找所有扩展名为ejs的文件
   })
 );

//静态资源配置
app.use(serve(__dirname + '/public'));


//表单处理配置
app.use(bodyParser());

// 路由配置
app
    .use(router.routes())
    .use(router.allowedMethods());
 

app.listen(3000)


