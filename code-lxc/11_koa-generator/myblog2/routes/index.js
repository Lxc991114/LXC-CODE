const router = require('koa-router')()
const users = require('./users')
const blogs = require('./blogs')
const welcome = require('../controllers/index')

/* router.get('/:cateId', welcome.index)————————如果不传参则匹配不到路由，会出错*/
router.get('/', welcome.index)

router.use('/user', users.routes(), users.allowedMethods())
router.use('/blog', blogs.routes(), blogs.allowedMethods())


module.exports = router
