const router = require('koa-router')()
const user = require('../controllers/user')


router.post('/login',user.goToLogin)


module.exports = router
