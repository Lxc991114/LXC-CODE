const Router = require('@koa/router');
const router = new Router();
const mysql = require("mysql");
// 配置数据库连接池
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "myblog",
});

function query(sql, params) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) reject(err); // 拿不到连接
      connection.query(sql, params, function (error, results) {
        connection.release();
        if (error) reject(error);//查询中有错
        resolve(results)
      });
    });
  });
}

/* ——————————————————————————————————————该版本index.js文件：所有控制器、数据库文件都在该路由文件中，过于臃肿—————————————————————————————————————————————— */
/* 首页 */
router.get('/',async(ctx)=>{
    await ctx.render('4_index')
})

/* 注册 */
router.get('/regist', async (ctx) => {
  await ctx.render('1_regist')
});

router.post('/regist', async (ctx) => {
  //（1）获取表单的数据
  let user = ctx.request.body;
  //（2）判断传输的数据是否合理(此处简单判断)  
  if (user.username == ' ') {
    await ctx.render('2_error', {
      message: '请输入用户名'
    })
    return;//return则表示，不再往下运行
  }
  //（3）连接数据库
  //（3-1）查询数据库中是否有重名
  let res = await query('select * from t_user where username =?', [user.username]);
  if (res.length > 0) {
    await ctx.render('2_error', {
      message: '用户名已存在'
    })
  } else {
    //（3-2）将用户插入用户表中
    let res = await query('insert into t_user set ?', user)//此处是mysql模块允许这种方式将表单获取的内容直接插入数据库，不是数据库标准的语句，前提是表单中的属性和表中字段完全一致
    //（4）响应给用户结果
    if (res.affectedRows > 0) {
      ctx.body = '注册成功'
    } else {
      await ctx.render('2_error', {
        message: '注册失败'
      })
    }
  }
});

/* 登录 */

router.get('/login', async (ctx) => {
  await ctx.render('3_login')
})

router.post('/login', async (ctx) => {
  //（1）获取表单的数据
  let user = ctx.request.body;
  //（2）判断传输的数据是否合理(此处简单判断)  
  if (user.username == '' ) {
    await ctx.render('2_error',{
      message:'输入用户名'
    })
  }
  //（3）连接数据库
  let res = await query('select * from t_user where username = ? and pass= ?',[user.username,user.pass])
  //（3-1）查询数据库中是否有此用户
  //（4）响应给用户结果
  if(res.length>0){
    await ctx.render('4_index')
  }else{
    await ctx.render('2_error',{
      message:'用户名或密码不正确'
    })
  }



})

/* 用户列表 */
router.get('/userlist', async (ctx) => {
  let res = await query('select * from t_user')
  await ctx.render('5_userlist',{
    users:res
  })
})



module.exports = router;