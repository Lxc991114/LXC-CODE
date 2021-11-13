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
    }
}