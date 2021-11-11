## 传统项目搭建
MVC开发模式：
（1）Model：模型(数据模型)————跟数据有关的内容
【该项目中把对数据库的操作称为数据模型，models文件夹只操作数据库相关】
（2）View：视图————前端页面
（3）Controller：控制器————流程控制代码

## 一定要模块化开发思想，别把东西乱起八糟写在一起

# （一）创建myblog项目目录，并进行初始化项目
1.初始化包：npm init -y
2.安装Koa框架：npm i koa
3.创建项目启动文件app.js：引入Koa框架相关配置
只做项目启动一瞬间的东西，例如引用了什么包，或者做了什么初始化的操作
不需要在每一个文件中都引入Koa的内容，只需引入相应文件需要的内容即可
【中间件的使用都去npm.js官网】
# （二）对项目进行架构：模块化思想
新建文件夹：
（一）
1.routes：路由文件夹 ——> index.js:路由主文件
2.安装koa-router中间件并配置
（1）index.js:——————————【后续还会拆解】
1> 引入koa-router中间件:
2> 并将其实例对象导出:modules.exports = router
（2）app.js
1> 引入其实例对象，const router = require('./routes/index.js')//index.js可省略
2> 将koa-router有关app的配置放入app.js中——————最好将路由的配置放在最下面
（我无语了这次将koa-bodyparser的配置放在路由配置下面了，然后进入路由去拿表单返回的数据一直拿不到🤯）
app
  .use(router.routes())
  .use(router.allowedMethods());
（二）
1.controllers：控制器文件夹(🍎一般一个控制器对应数据库中的一张表)
将控制器文件导出，在用到该控制器文件的路由文件中导入
2.views：视图文件夹
2-1.安装koa-views中间件
2-2.安装ejs模板引擎(依赖于koa-views中间件)
2-3.koa-views中间件、ejs模板引擎应配置在app.js中
3.models：数据库文件夹
（三）
1.public：静态资源文件夹
2.创建子文件夹：stylesheets、images、javascripts
2.安装koa-static中间件
3.koa-static中间件应配置在app.js中

# 片段代码的处理
将共有的部分的body内的内容(不是整个html结构)存到nav.ejs中
在别的ejs文件中引入的时候，将其当作变量引入: <%- include('nav') %>
