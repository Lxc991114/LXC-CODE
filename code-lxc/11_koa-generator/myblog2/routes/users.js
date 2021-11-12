const router = require('koa-router')()
const user = require('../controllers/user')

router.get('/regist', async (ctx) => {
    await ctx.render('regist')
})
router.get('/login', async (ctx) => {
    await ctx.render('login')
})


router.post('/regist',user.regist)
router.post('/login',user.login)

module.exports = router
