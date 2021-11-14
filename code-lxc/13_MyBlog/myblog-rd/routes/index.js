const router = require('koa-router')()
const users = require('./users')
const blogs = require('./blogs')


router.use('/user',users.routes(), users.allowedMethods())
router.use('/blog',blogs.routes(), blogs.allowedMethods())

module.exports = router
