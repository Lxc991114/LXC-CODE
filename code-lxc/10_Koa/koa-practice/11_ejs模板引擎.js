const Koa = require("koa");
const Router = require("@koa/router");
var bodyParser = require("koa-bodyparser");
const views = require("koa-views");
const path = require("path");
const session = require('koa-session');

const app = new Koa();
app.use(bodyParser());
const router = new Router();

// 加载模板引擎
app.use(
   views(path.join(__dirname, "./views"), {//当前项目在电脑上的绝对路径和项目下模板引擎的路径进行拼接
    extension: "ejs",//找所有扩展名为ejs的文件
  })
);

// 配置session安全密钥
app.keys = ['123454679@#$%^&'];
// 加载session中间件
app.use(session(app));

router.get("/", async (ctx) => {//render函数去加载文件是异步的，需要加async、await
  await ctx.render("4_index.ejs",//此处可以省略ejs，因为默认找ejs文件//ctx.render()是ejs里面加载文件的方法
  { //加载该ejs文件时给它传参数
    title: "ejs",
    message: "hello world",
    blogs: [
      {
        title: "aaaaa",
        createTime: "2021-02-01",
      },
      {
        title: "bbbb",
        createTime: "2021-02-02",
      },
    ]
  });
});

router.get('/todo', async (ctx) => {
    await ctx.render('5_todo.html', {//也可以加载其他文件
        message: 'todo...'//与ejs文件的表现形式不同
    });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
