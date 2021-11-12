# npm.js官网搜索koa-generator脚手架
（1）全局安装
（2）创建项目
koa2 项目名
(2-1)安装依赖(项目终端中！！！别犯傻！！！)
npm install
(2-2)启动项目
npm start

# 初始配置
（1）将模板引擎换成我熟悉的ejs
（2）配置子路由文件 

# ctx.render(’渲染的页面)和ctx.redirect('路径')

# 登录后不退出浏览器则一直显示欢迎xxx，退出后显示登录|注册
index.ejs文件中:
在登录的控制器文件中：将用户名存进session，通过render函数传参数传到index.ejs文件中
if(username){
    欢迎
}else{
    <li><a href="/user/login">登录</a></li> |
    <li><a href="/user/regist">注册</a></li>
}
如果从登录页面进入——————会正常在右侧显示
如果从地址栏输入主页地址进入——————会报错(username is not defined，而不是undefined)
因此此处应该判断if(locals.username)————判断locals下有没有username，而不是直接判断是否有username，避免not defined错误
但是这样的逻辑还不对，从登录页面进入主页右侧会显示欢迎xxx
从地址栏输入地址进入后(未退出浏览器)，右侧显示登录|注册
但是正常来说只要登录了，不退出浏览器，不手动清除，都该显示欢迎xxx
在加载主页时取出session并传给index.ejs文件————存完session可在任意地方取出来
router.get('/', async (ctx) => {
    let uname = ctx.session.username;
    await ctx.render('index', {
        username: uname
    })
})————————————————————不退出浏览器时，直接进入地址也可以看到欢迎xxx
上面也不需要用render函数了，应该用redirect函数跳转路由
跳转到‘/’路由时，会执行查看是否有username的操作，且路由也会变成主页的路由
