const blogModel = require('../models/blogModel')

module.exports = {
  index: async (ctx) => {
    //1-1.接收分类信息
    let cateId = ctx.query.cateId;
    //1-2 判断是否点击了分类
    let blogs = [];
    if (cateId) {//如果点击了分类，就筛选
      //let blogs = await blogModel.getBlogs(cateId);
      //如果这么写相当于块级作用域，在外面访问不到，所以将变量在外面声明
      blogs = await blogModel.getBlogs(cateId);
    } else {//否则就不筛选
      blogs = await blogModel.getBlogs();
    }
    // 3. 查询文章分类信息
    let categories = await blogModel.getBlogCategories();
    let uname = ctx.session.username;
    await ctx.render("index", {
      username: uname,
      blogs,
      categories,
    });
  },
}