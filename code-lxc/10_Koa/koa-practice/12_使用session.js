const Koa = require("koa");
const Router = require("@koa/router");
var bodyParser = require("koa-bodyparser");
const views = require("koa-views");
const path = require("path");
const session = require('koa-session');
const app = new Koa();
// 配置bodyParser，用来接收post提交的数据
app.use(bodyParser());
// 配置路由
const router = new Router();
// 加载模板引擎
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);
// 配置session安全密钥
app.keys = ['123454679@#$%^&'];
// 加载session中间件
app.use(session(app));
/* ————————————————————————————————————————————————————————————————————————————— */

router.get('/login', async (ctx) => {
    await ctx.render('6_login');
});

router.post('/doLogin', async (ctx) => {
    let user = ctx.request.body; //{username: xx, password:1234}
    if(user.username == 'lisi' && user.password == '123456'){
        // 将用户名信息作为一个属性存入session，存成功后任意页面可拿到
        ctx.session.username = user.username;
        await ctx.render('7_welcome', {
            username: user.username
        });
    }else{
        ctx.body = '用户名或密码不正确!';
    }
});

router.get('/userList', async (ctx) => {
    let uname = ctx.session.username;
    await ctx.render('8_user-information', {
        aa: uname
    });
});


app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
