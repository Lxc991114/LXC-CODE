const Router = require('@koa/router');
const router = new Router();
const blog = require('../controllers/blog')


/* 文章列表 */
router.get('/bloglist', blog.bloglist)


module.exports = router;