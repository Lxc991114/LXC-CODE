const router = require('koa-router')()

router.get('/list', async (ctx, next) => {
  let arr = [
    'hello',
    'world'
  ]
  ctx.body= arr;
})
module.exports = router
