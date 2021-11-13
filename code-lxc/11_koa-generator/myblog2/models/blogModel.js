const db = require('./db')

module.exports = {
    getBlogs(cateId){
        let sql = `
            select blog.blog_id, blog.title, blog.content, blog.post_time, blog.read_count, usr.username, usr.user_id
            from t_blog blog, t_user usr
            where blog.user_id=usr.user_id
        `;
        if(cateId){
            sql += ' and blog.cate_id=' + cateId/* ' and blog.cate_id='——————and前面需要空格因为和sql字符串拼接的时候需要有空格 */
        }
        return db.query(sql);
    },
    getBlogCategories(){
        return db.query('select * from t_category');
    },
    saveBlog(blog){
        return db.query('insert into t_blog set ?',[blog])
    }

}