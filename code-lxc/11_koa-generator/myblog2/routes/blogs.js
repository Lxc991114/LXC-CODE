const router = require('koa-router')()
const blog = require('../controllers/blog')

//进发表文章页面的时候先把文章分类查出来，所以此处不能是简单的跳转
router.get('/post',blog.toPost)

router.post('/doPost',blog.post)

router.get('/detail/:blogId',blog.detail)

router.post('/postComment', blog.postComment);


module.exports = router
