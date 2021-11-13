const blogModel = require('../models/blogModel')
module.exports = {
    post: async (ctx) => {
        //1.接数据
        let blog = ctx.request.body;
        //2.验证(省略)
        //3.从session中获取用户编号直接作为属性放进表单提交的对象中
        blog.user_id = ctx.session.userId//blog.user_id此处属性user_id与数据库中一致
        if (blog.user_id) {
            //4.存入数据库
            let res = await blogModel.saveBlog(blog);
            if (res.affectedRows > 0) {
                ctx.redirect('/')
            } else {
                await ctx.render('error', {
                    message: '发表文章失败'
                })
            }
        } else {
            await ctx.render('error', {
                message: '请先登录'
            })
        }
    },
    //进发表文章页面的时候先把文章分类查出来
    toPost: async (ctx) => {
        let categories = await blogModel.getBlogCategories();
        /* 也用到了header页面，需要让右上角变成欢迎xxx，所以要将username传过去 */
        let username = ctx.session.username;
        await ctx.render("post-blog", {
            categories,
            username
        });
    },
    detail: async (ctx) => {
        // 1. 接数据
        let blogId = ctx.params.blogId;
        // 2. 查文章
        let res = await blogModel.getBlogById(blogId)
        // 3.查文章评论
        let comments = await blogModel.getCommentsByBlogId(blogId)
        let username = ctx.session.username;
        if (res.length > 0) {
            await ctx.render('blog-detail', {
                blog: res[0],
                comments,
                username
            });
        }
    },

    postComment: async (ctx) => {
        //koa-bodyparser中间件是用来接收post请求的参数的中间件，因此axios发送的post请求的参数也如此接
        let comment = ctx.request.body;  //{ content: '', blog_id:9 }//结果来的属性和数据库中属性一致，可以直接往数据库里存
        let userId = ctx.session.userId;
        if (userId) {
            comment.user_id = userId;//如果登录了就将用户id存到评论信息的对象中，好直接放入数据库
            let res = await blogModel.saveComment(comment);
            if (res.affectedRows > 0) {
                /* 这处和下面不可以用ctx.render()，因为是异步的，页面根本没跳转，只是服务器响应给客户端的简单信息，在浏览器的response中 */
                ctx.body = 'success';
            } else {
                ctx.body = 'fail'
            }
        } else {
            ctx.body = '未登录'
        }

    }
}