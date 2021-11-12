const Router = require('@koa/router');
const router = new Router();
const user = require('../controllers/user')

/* 注册 */
router.get('/regist', async (ctx) => {
    await ctx.render('1_regist')
});

router.post('/regist', user.regist);

/* 登录 */

router.get('/login', async (ctx) => {
    await ctx.render('3_login')
})

router.post('/login', user.login)

/* 用户列表 */
router.get('/userlist', user.userlist)


module.exports = router;