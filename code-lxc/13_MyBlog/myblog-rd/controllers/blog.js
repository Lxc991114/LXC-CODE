const blogModel = require('../models/blogModel')

module.exports = {
    getBlogsAndCategories: async (ctx) => {
        //1.连接数据库查询所有文章
        let blogs = await blogModel.getBlogs();
        //2.连接数据库获取分类
        let categories = await blogModel.getCategories();
        ctx.body = {
            state: 'success',
            blogs,
            categories
        }
    },
    getBlogAndCommentsById: async (ctx) => {
        //1.获取get方法传过来的id
        let blogId = ctx.query.blogId;
        //2.查询数据库
        let blog = await blogModel.getBlogById(blogId)
        let comments = await blogModel.getCommentsByBlogId(blogId)
        ctx.body = {
            blog: blog[0],
            comments
        }

    },
    getCatories: async (ctx) => {
        //1.获取分类信息
        let categories = await blogModel.getCategories();
        ctx.body = {
            state: 'success',
            categories
        }

    },
    postBlog: async (ctx) => {
        //1.获取数据
        let blog = ctx.request.body;
        //2.存数据
        let res = await blogModel.saveBlog(blog)
        if (res.affectedRows > 0) {
            ctx.body = {
                state: 'success'
            }
        } else {
            ctx.body = {
                state: 'fail'
            }
        }

    }
}