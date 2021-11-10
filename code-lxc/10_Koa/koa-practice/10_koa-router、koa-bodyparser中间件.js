const Koa = require('koa')
const Router = require('@koa/router');
var bodyParser = require('koa-bodyparser');
const app = new Koa()

app.use(bodyParser());

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = 'index...'
});

/* 如何接收参数 */

/* 一.获取get请求的参数———————使用koa提供的原生的接收参数的方法 */

/* 1.地址栏中使用？+键值对传参 */
//http://localhost:3000/todo1?name=lisi&age=23
//（1）ctx.querystring：不建议使用
router.get('/todo1', (ctx) => {
     console.log(ctx.querystring);  // "name=lisi&age=23"
});
//（2）ctx.query
router.get('/todo2', (ctx) => {
  console.log(ctx.query); // { name: 'lisi', age: '23' }
});
/* 2.地址栏中直接传参：ctx.params */
//http://localhost:3000/todo3/lisi/age
router.get('/todo3/:name/:age', (ctx) => {
  // /todo3/lisi/23
  let user = ctx.params; //{ name: 'lisi', age: '23' }
  console.log(`name: ${user.name}, age: ${user.age}`);
});

/* 二.获取post请求的参数———————使用koa并没提供原生的接收参数的方法，node自带的方法很麻烦：使用第三方插件——————koa-bodyparser */

/* 3.获取表单传参参数：ctx.request.body */
let html = `
    <h1>koa2 request post demo</h1>
    <form method="POST" action="/regist">
      <p>userName</p>
      <input name="userName" /><br/>
      <p>nickName</p>
      <input name="nickName" /><br/>
      <p>email</p>
      <input name="email" /><br/>
      <button type="submit">submit</button>
    </form>
  `;
//action="/regist——————下面该表单的路径，二者必须一致

//显示表单：页面在服务器端，需要发送请求将表单显示在浏览器中
router.get('/regist',  (ctx) => {
    ctx.body = html;
});
//提交表单数据用post方法
router.post('/regist',  (ctx) => {
    //使用koa-bodyparser中间件接收表单数据
    let user = ctx.request.body; //{ userName: '2323', nickName: '23232', email: '2323' }
    console.log(`name: ${user.userName}, nickName: ${user.nickName}`);

});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);