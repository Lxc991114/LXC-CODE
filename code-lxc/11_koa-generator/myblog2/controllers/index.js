const blogModel = require('../models/blogModel')

module.exports = {
    index: async (ctx) => {
        //1.查询文章
        let blogs = await blogModel.getBlogs()        
        let uname = ctx.session.username;
        await ctx.render("index", {
          username: uname,
          blogs
        });
    }
}