const Koa = require("koa");
const mysql = require("mysql");
const Router = require("@koa/router");
const views = require("koa-views");
const path = require("path");
const app = new Koa();

// 配置路由
const router = new Router();

// 加载模板引擎
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);

/* 此处使用数据库连接池，避免数据库反复的开开关关 */
var pool = mysql.createPool({
  connectionLimit: 10,//放十个连接，每次用完连接都放回池子中，每建立一个连接就new一个对象，对资源有消耗，估算访问量和性能后再设置连接数
  host: "localhost",
  user: "root",
  password: "",
  database: "myblog",
});
/* 最好将数据库的操作封装一个方法，便于复用，并且要将异步的操作放置在return new Promise中，避免数据还没返回，就先执行数据库关闭的操作了 */
function query(sql, params) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function(err, connection) {
        if (err) reject(err); // 拿不到连接
        connection.query(sql, params , function (error, results) {
          connection.release();
          if (error) reject(error);//查询中有错
          resolve(results)
        });
      });
  });
}

router.get("/userlist", async (ctx) => {
    let username = 'lisi',
        pass = '123456';
  /* 数据库查询语句：select * from t_user where username='lisi' and pass='123456（必须是单引号）' */
  //如果传变量，就用此种形式传(用拼接字符串或者模板字符串的方法拼接过多变量时很乱)
  let results = await query("select * from t_user where username=? and pass=?", [username, pass]);
  await ctx.render("9_user-list", {
    users: results,
  });
});

router.get("/bloglist", async (ctx) => {
  let results = await query("select * from t_blog");//params没传就是undefined，就不会进行什么操作
  await ctx.render("10_blog-list", {
    blogs: results,
  });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
