const userModel = require('../models/userModel')


module.exports = {
    regist: async (ctx) => {
        //1.接收数据
        let user = ctx.request.body;
        //2.验证
        if (user.username == ' ') {
            await ctx.render('error', {
                message: '请输入用户名'
            })
            return;
        }
        //3.验证用户名是否存在
        let res = await userModel.getByName(user.username);
        if (res.length > 0) {
            await ctx.render("error", {
                message: "该用户已存在!",
            });
        } else {
            // 4. 将用户信息存入数据库
            let res = await userModel.saveUser(user);
            // 5. 响应给用户不同的结果
            if (res.affectedRows > 0) {
                // render是渲染和加载的意思，在这里并没有真正的发生【跳转】
                // redirect重定向，是真正意义的跳转
                await ctx.redirect('/user/login');
            } else {
                await ctx.render("error", {
                    message: "注册失败!",
                });
            }
        }


    },
    login: async (ctx) => {
        //1.接数据
        let user = ctx.request.body
        //2.验证(省)
        //3.查数据
        let res = await userModel.getByNameAndPass(user.username,user.pass)
        //4.根据查询结果响应页面
        if(res.length>0){
            ctx.session.username = user.username;
            /* 此处将用户id也存进session，便于后续存文章时不通过用户将用户的id存进用户文章的表中
               如果不进行此操作，由于getBlogs()方法中where条件的限制，新写入的文章没有用户id，从而不会显示在文章列表中
            */
            ctx.session.userId = res[0].user_id;
            ctx.redirect('/')
        }else{
            await ctx.render('error',{
                message:'用户名或密码不正确'
            })

        }

    }
}