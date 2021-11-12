const Router = require('@koa/router');
const user = require("./user");
const blog = require("./blog");
const router = new Router();

/* 首页 */
router.get('/', async (ctx) => {
  await ctx.render('4_index')
})


router.use('/user', user.routes(), user.allowedMethods())
router.use('/blog', blog.routes(), blog.allowedMethods())

module.exports = router;