const blogModel = require('../models/blogModel')
module.exports = {
    bloglist: async (ctx) => {
        let res = await blogModel.getBlogs();
        /* 将时间转换成中国熟悉的时间样式 */
        let newBlogs = res.map(function (blog) {
            let postTime = blog.post_time;
            let postTimeStr = postTime.getFullYear() + '-' + (postTime.getMonth() + 1) + '-' + postTime.getDate()
            blog.post_time = postTimeStr;
            return blog;
        });

        await ctx.render("6_bloglist", {
            blogs: newBlogs,
        });
    }
}