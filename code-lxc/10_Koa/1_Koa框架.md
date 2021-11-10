Node.js较有名的框架：

# express框架————可去github上了解一下
出现的比较早有些落后，国外使用较多
集成很多包，但是过于臃肿

# egg框架————可去github上了解一下

# Koa框架————较为轻量级，express衍生品
## 1.Koa支持es6的语法，express现在也支持了(支持的不太好)
## 2.Koa只包含核心的一些功能，有需要的话自己安装第三方包
## 3.koa的使用：https://chenshenhai.com/koa2-note/note/start/quick
在想要生成koa框架的文件夹中进行如下操作
和vue cli创建项目会创建出一个文件夹不同
（1）初始化package.json
npm init
（2）安装koa2 
npm install koa
## 4.ctx：上下文，相当于req和res
(1)app.use( async ( ctx ) => {
  ctx.body = '试一下koa'
})
(2)
request.aa
response.bb
相当于
ctx.aa
ctx.bb
例如：ctx.request.url的简写就是ctx.url
## 5. 2_exportsModules和3_requireModules文件
演示Koa原理和引入中间件的概念————文件中的middleware = [];该例子中就相当于一个中间件，联系起来了两个文件

## 只要是从A没办法直接到达B，在中间起到辅助功能的东西就叫做中间件：A——>中间件——>B
实现某一功能时引入的各种第三方包，起到了辅助作用，这就是中间件
Koa中引入中间件后都需要use()：
const app = new Koa();
app.use(——————————>use里面这整个函数叫中间件(myCtx) => {
    myCtx.body = '<h1> hello mykoa hehe </h1>'
});

## 代码修改记得重启服务

## 引入中间件
中间件的形式：
(ctx) => {
        console.log(ctx.url);
}

（1）
引入文件：
const logger = require('./eLog')
app.use( logger() )
导出文件：
module.exports = function(){
    return (ctx) => {
        console.log(ctx.url);
    }
}
（2）
引入文件：
const logger = require('./eLog')
app.use( logger )
导出文件：
module.exports = (ctx) => {
        console.log(ctx.url);
}

## 向file.txt写入内容————与fs相关内容去
var fs = require("fs");
let str = ctx.method + '' + ctx.header.host + ctx.url + '\n';
fs.appendFile('4-(1)file.txt', str, 'utf-8')

## 
app.use((ctx) => {
  setTimeout(function () {
    ctx.body = 'hello';
  }, 2000);
  ctx.body = 'world';
});
此段代码只可以打印出world，而不会在2s后打印出hello，参考Koa原理中的res.end("");
ctx又是res和req的封装；结束后，再打印出来的东西就没必要了

## koa-router中间件
（1）工作中：
引入第三方中间件：去npm官网看koa-router
软件的路由(router)、路径(url)
对应着程序界面的每一个地址
路由一般在单页面应用中，路径一般在多页面应用中
多页面应用跳转会刷新
（2）
get方式：主要用来获取数据，但是也可以通过键值对、地址后面输入参数来传参数，但是参数长度有限制，只适合简单的数据传输，并且提交数据不适合传输关键的敏感的信息(比如密码)
post方式：post方式只有在 <form method="POST" action="/regist">才是post提交方式，地址栏里输入地址和点击地址回车都是get方式；post方式提交信息不会显示在地址栏

## koa-bodyparser中间件 
获取post请求的参数，koa并没提供原生的接收参数的方法，node自带的方法很麻烦：使用第三方中间件——————koa-bodyparser

## koa模板使用中间件和ejs模板引擎
模板引擎：为了使用户界面和业务数据(内容)分离而产生，可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的HTML文档
（1）安装koa模板使用中间件koa-views
npm install --save koa-views
（2）安装ejs模板引擎(还有其他模板引擎)————文件后缀名是js
npm install --save ejs
--save就是会将这个包保存到package.json中，如果有一天不小心删除了node_modules文件夹，使用npm i，就会检测package.json中的包，并进行重新安装
但是node的10版本以后安装的包默认就会将包名加进package.json中，不需要再写--save
（3）ejs文件中也是html的结构，但是要在其中写非html、css、js的语法，html就无法解析那些内容了，因此需要更改扩展名

## koa-session中间件
session：会话作用域————打开浏览器开始关闭浏览器结束，只要不关闭浏览器，不手动清除会话里面的东西，就一直有效
request：请求作用域————客户端向服务器发送请求的一瞬间，在request里面可以存东西，服务器端从其中通过ctx.request.属性给它接过来