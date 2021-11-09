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