const router = require('koa-router')()
const blog = require('../controllers/blog')
const { verify } = require('../auth')

router.get('/getBlogsAndCategories', blog.getBlogsAndCategories)
router.get('/getBlogAndCommentsById', blog.getBlogAndCommentsById)
router.get('/getCatories', blog.getCatories)
/* 在进入发表文章的控制器之前就对是否登录进行判断 */
router.post('/postBlog',verify, blog.postBlog)

module.exports = router
