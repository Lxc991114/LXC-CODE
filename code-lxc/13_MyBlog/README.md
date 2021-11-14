# 前后端分离的开发模式（所有安装的东西都可以去npm.js官网搜索）
## 一.使用前后端脚手架
1.前端：Vue CLI(vue官网)——————此次使用vue2
（1）全局安装vue
（2）vue create 项目名
2.后端：koa-generator(npm.js官网)——————此次使用koa2
（1）全局安装koa2
（2）koa2 项目名
（3）npm install安装依赖
## 二.对前后端项目进行配置
1.前端：
（1）安装vue-axios，在main.js中配置（npm.js和axios官网都看看）
2.后端：
（1）.gitignore(vue cli项目中自带，后端可配置一个)
（2）app.js中：
不再需要ejs，可将其相关配置删掉；
不再需要views文件夹，删掉其相关配置；
删除app.js中关于user.js的相关路由配置，app.js中只引入index.js，将user.js以及blog.js作为index.js的子路由，并在index.js中配置：
const router = require('koa-router')()
const user = require('./users')
const blog = require('./blogs')
router.use('/user', user.routes(), user.allowedMethods())
router.use('/blog', blog.routes(), blog.allowedMethods())
<!-- 上面这两行可在app.js的配置中找到，但是记得要将app.use改成router.use -->
（3）创建controllers文件夹以及models文件夹
安装koa框架中mysql中间件
引入之前写好的db.js关于数据库的文件或者再配置一遍
（4）安装koa-cors中间件并配置：选择npm.js官网中的@koa/cors中间件
【cors：跨域资源共享，解决ajax同源策略】————————忘了的话看阮一峰的博客👀

## 鉴权问题（token：使用jsonwebtoken中间件）
（ 1）前后端分离模式不能用session
传统的开发项目中，使用session，可在浏览器的cookie中放入一个session的id，每次请求带着session的id去服务器端，服务器端接收请求看是否有session的id来判断是否登录，但前后端分离的项目中，服务器端的session没办法在前端的项目中的cookie中扔进一个session的id
就像登陆之后在8080端口的浏览器的cookie中扔了一个session的id，但是请求的时候，没办法从8080端口号带到3000端口号，不同的域名不会带过去
（2）使用token(令牌)做前后端分离模式的鉴权
实现原理：在服务器端，使用jsonwebtoken中间件，会生成一段唯一的码，将码传给客户端，客户端的每一次请求允许自己去配置是否带着这个码，带过去的token必须是有效且没过期的
（3）token的使用
1>在需要使用token的页面将其配置引入
2>一旦登录成功，直接去生成一个token的：jwt.sign()
jwt.sign(payload, secretOrPrivateKey, [options, callback])
payload：是个对象，往token里面存的东西
secretOrPrivateKey：密钥，越长越复杂越好
options：是个对象，支持传很多参数，常用的有expiresIn，比如设置token的有效时间，如{ expiresIn:2 }
3>将token作为参数传给前端：最好用ctx.body = {state:'success',token},而不是ctx.body = token，前端判断的时候判断的是state
4>传给前端后，在前端代码中将token存在local storage(缓存)中：localStorage.setItem('token的名'，后端传过来的token)
5>最好哪个页面需要验证是否有token，就在哪个页面声明一个验证token的方法，并且在created()声明周期内调用 
将token取出来：localStorage.getItem('token的名')
【token不是每次发送请求的时候自动带着，需要的时候要手动带着】
在axios请求中除了method以及url外，还需要带上
headers：{
    'Authorization':localStorage.getItem('token的名')
}
此时在后端通过ctx.header.authorization获得客户端传过来的token并进行验证：
jwt.verify(传过来的token，生成token时的密钥)
为了知道验证是否成功，外面可以套着try、catch
try{
    获得headers中传过来的token的操作
    jwt.verify(传过来的token，生成token时的密钥)————————其实就是根据两个值解密的过程
    ctx.body = {
        state:'success'
    }
}catch(err){
    //鉴权失败也不建议简单的返回一个fail,可以设置状态码401告知前端鉴权失败
    ctx.status = 401
    ctx.body = {
        state:'fail'
    }
}
前端接收到token验证的信息后，最好再进行判断：
let {state}=res.data
if(state==='fail'){
    this.$router.push('/login')
}

## 前后端
前端res.data获得的是后端ctx.body的值
后端最好不要把ctx.body直接赋一个值，如success传给前端，而是以对象的形式反馈给前端
ctx.body = {
    state:'success'
    其他需要传的参数
}

## 什么时候使用get请求，什么时候使用post请求
GET方法可以携带交互需要的所有数据，因此会看到搜索百度或谷歌的时候，点击搜索形成的URL包含了你刚才的搜索关键字，没有安全需求的请求把信息放URL里没关系，但是访问银行网站的时候，不希望把账户、密码这些放在URL里被人拦截，所以HTTP设计了POST请求，他可以把请求信息放在HTTP请求里，这样就不能简单的从URL里找到账户、密码了。 