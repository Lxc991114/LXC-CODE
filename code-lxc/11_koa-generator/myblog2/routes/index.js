const router = require('koa-router')()
const users = require('./users')
const blogs = require('./blogs')
const welcome = require('../controllers/index')

router.get('/', welcome.index)

router.use('/user', users.routes(), users.allowedMethods())
router.use('/blog', blogs.routes(), blogs.allowedMethods())


module.exports = router
