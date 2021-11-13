# ctx.render('渲染的页面')和ctx.redirect('路径')

# 登录后不退出浏览器则一直显示欢迎xxx，退出后显示登录|注册
index.ejs文件中:
在登录的控制器文件中：将用户名存进session，通过render函数传参数传到index.ejs文件中
if(username){
    欢迎
}else{
    <li><a href="/user/login">登录</a></li> |
    <li><a href="/user/regist">注册</a></li>
}
如果从登录页面进入——————会正常在右侧显示
如果从地址栏输入主页地址进入——————会报错(username is not defined，而不是undefined)
因此此处应该判断if(locals.username)————判断locals下有没有username，而不是直接判断是否有username，避免not defined错误
但是这样的逻辑还不对，从登录页面进入主页右侧会显示欢迎xxx
从地址栏输入地址进入后(未退出浏览器)，右侧显示登录|注册
但是正常来说只要登录了，不退出浏览器，不手动清除，都该显示欢迎xxx
在加载主页时取出session并传给index.ejs文件————存完session可在任意地方取出来
router.get('/', async (ctx) => {
    let uname = ctx.session.username;
    await ctx.render('index', {
        username: uname
    })
})————————————————————不退出浏览器时，直接进入地址也可以看到欢迎xxx
上面也不需要用render函数了，应该用redirect函数跳转路由
跳转到‘/’路由时，会执行查看是否有username的操作，且路由也会变成主页的路由

# 
index控制器文件中：
index: async (ctx) => {
        //1.查询文章
        let blogs = await blogModel.getBlogs()
        //2.查询分类
        let categories = await blogModel.getBlogCategories();
        let uname = ctx.session.username;
        await ctx.render("index", {
          username: uname,
          blogs,
          categories
        });
    }
blogs控制器文件中：
 listBlogsByCate: async (ctx)=>{
        //1.接数据
        let cateId = ctx.params.cateId
        //2.查数据库
        let blogs = await blogModel.getBlogsByCateId(cateId)
        let uname = ctx.session.username;
        await ctx.render('index',{————————往首页跳转这三个参数一个也不能少，但是只要blogs，而没有其他两个参数
            username:uname,————————从session中获取
            blogs,——————————刚才查询出来的文章
            categories——————————如何获取？————————如果再查一遍放在这有点麻烦
        })
    }
}
两处代码有大量雷同，个别位置有区别渲染主页的参数要是更改，都需要更改：变化的位置不要写死，通过参数传过来
getBlogs()、getBlogCategories()方法也没什么区别，可以合并成一个
listBlogsByCate方法也可以不写，还是进到跟路由中去处理该操作

# 
（1）<li><a href="/<%=category.cate_id%>"><%=category.cate_name%></a></li>
接收信息：let cateId = ctx.params.cateId;
/* router.get('/:cateId', welcome.index)————————如果命名方式，不传参则匹配不到路由，会出错*/
（2）<li><a href="/?cateId=<%=category.cate_id%>"><%=category.cate_name%></a></li>
接收信息：let cateId = ctx.query.cateId;
/* router.get('/', welcome.index)————————不会出错*/

# <option value="真正要提交的东西">给用户看的内容</option>
例如：<option value="<%=category.id%>"><%=category.cate_name%></option>

# 表单提交的时候都需要刷新一下，提交评论后页面刷新，如果网速慢，用户体验很不好
<div id="input-content" style="display:none">
    <form action="/blog/postCommment" method="post">
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
        <button id="btn-post">评论</button>
    </form>
</div>
解决方案：
页面不动，利用ajax异步的操作，页面不会刷新，将信息发送到后端，然后在评论处动态的再生成记录
vue就全是异步的

# 登录过的可以评论，没登录的不能评论
前端验证不安全，可以在浏览器操作它的js，所以安全验证应该在服务器端，前端也需要验证，为了更好的用户体验，也能减少对服务器的访问压力
后端验证更安全,在前端和后端皆对是否登录做了验证

# 下次记得将评论表的时间设置成CURRENT_TIMESTAMP！！！！！
这次没设置，以至于新写评论的时候最新的评论不光在上面而且带时间，但是刷新之后新写的评论的时间没存进数据库，再加载出来的时候也不显示时间了