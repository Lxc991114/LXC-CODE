# Node.js(Node)

## 1.Node.js是一个可以让JavaScript运行在服务器端的平台，将其移到浏览器之外
## 2.与传统平台依靠多线程(会损耗性能)来实现高并发的设计思路，还采用了单线程、异步式I/O、事件驱动性的设计模型，为性能带来巨大提升，减少了多线程程序设计的复杂性，提高了开发效率
## 3.Node.js不是一种独立的语言，不像是PHP、Python、Ruby即是语言也是平台，它是个平台，让JavaScript与其他脚本语言没什么不同,node自带服务器，其他语言还需要单独使用服务器
浏览器——>HTTP服务器——>PHP
浏览器——>Node
## 4.Node.js的JavaScript处理引擎是谷歌v8，执行速度已经接近本身代码的执行速度
## 5.Node.js在使用时，不需要额外搭建HTTP服务器
## 6.Node.js使用的是单线程非阻塞模型，对于所有的I/O都采用异步的请求方式，避免了频繁的上下文切换
## 7.Node.js在执行的过程中会维护一个事件队列，程序在执行时进入事件循环等待下一个事件到来，每个异步式的I/O请求完成后会被推送到事件队列，等待程序进程进行处理
（1）传统方式实现数据库查询：查询之后等到结果后输出，对于高并发的访问，一方面线程长期阻塞等待，另一方面为了应付新请求而不断增加线程，会浪费系统大量资源系统，同时线程的增多也会占用大量CPU时间来处理内存上下文切换
res = db.query("SELECT * from some_table");
res.output();——————————

（2）Node.js：执行时数据库查询时，不会等待结果返回，会继续执行下面的语句，直到进入事件循环，当查询结果返回时，会将事件(回调函数中的内容)发送到事件队列，等线程进入事件循环后，才会调用之前的回调函数，继续执行后面的逻辑，性能上有加大提升
db.query('SELECT * from table1', function(res) {
    res.output();
});

db.query('SELECT * from table2', function(res) {
    res.output();
});

.....其他操作
## 8.CommomJS规范：为了统一JavaScript在浏览器之外的实现
ECMScript规范：统一JavaScript语言标准
## 9.Node.js的安装和配置(不要安装在中文目录下，别改默认项)
安装：(安装后可将安装使用的文件删除)
（1）mac系统：一路下一步；windows系统：需要配置环境变量
（2）node -v查看node的版本号
（3）如果node.js的版本与依赖的包不一致，如果想使用多个版本的node，需要安装nvm这个node版本管理工具，nvm list可以查看node的版本都有哪些，vum use 版本号，即可使用相应版本的node
配置：
右键我的电脑，点击属性——>高级系统设置——>环境变量——>双击选择下方path会看到有node相关内容，如果没有就是没安装好，如果装好了可以在任何一个目录下使用，如果path处没有node相关，可以自己新建node的默认路径一个放在path中
## 10.
Web开发中js文件需要引入到html文件中，运行html文件就能加载js文件，但是在node.js，它不基于浏览器，运行是基于命令行的，运行js文件只需要在命令行输入node 文件名(命令行支持代码补全，输入文件名一部分后按tap键会自动补全文件名，文件名是否有.js后缀不影响)
## 11.Node.js的全局是globel，window下的东西无法使用
## 12.localhost就是127.0.1
## 13.实际工作中用nginx(轻量级的Web服务器)，而不是用node自己(开发效率低，过于底层)：nginx + node
## 14.函数和模块
函数：粒度最小的复用
模块：粒度最大的复用
## 15.exports是node中自带的一个对象，想要导出的内容都放在该对象中
导出：
/* 1.导出方法1:导出的是一个带方法和属性的对象 */
exports.add1 = add;
exports.minus = function (a, b) {
    return a - b;
}
exports.add2 = add(5, 6)
/* 2.导出方法2：导出的就是这个方法 */
/*module.exports = function (a, b) {
    return a + b;
  };
*/

导入：
/* 1. */
let xx = require('模块的路径');——————xx就是exports对象
xx.add(3,2)————调用方法
/* 2. */
let xx = require('模块的路径');——————xx就是单个的方法
14.vue中import、export的模块化用的ES6规范的模块化
node中的module.exports、exports是CommonJS规范的模块化
有空可以再了解一下deno————node的衍生品
## 16.
如果引入的文件是写在node_modules文件夹下的AAA文件夹中的index文件，则可以像使用自带模块一样不需要按目录引入，直接let http = require('AAA')
//不写路径时会先去看是否在node_modules下有该文件夹，没有的话再去系统中找
//不写文件名会自定先找index文件
如果想将默认找index文件变成默认找其他文件：
（1）将其外部的文件夹定义成包(一个包下很多模块)：打开外部文件夹的终端，输入npm init -y（-y是一路yes的意思，不需要自己配置）
（2）在该文件夹下生成package.json文件，此时这个文件就是一个包，package.json中main属性的值就是主入口文件，就会默认找它
## 17.npmjs.com: 官方提供的包各种各样的包
npm init -y：初始化一个包
npm install 包名————安装包————在package.json可见
npm install 包名 --save—————把该包依赖的那些包也显示出来