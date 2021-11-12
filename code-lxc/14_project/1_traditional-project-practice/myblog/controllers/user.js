const userModel = require('../models/userModel')

module.exports = {
    regist: async (ctx) => {
        let user = ctx.request.body;
        if (user.username == ' ') {
            await ctx.render('2_error', {
                message: '请输入用户名'
            })
            return;
        }
        let res = await userModel.getByName(user.username);
        if (res.length > 0) {
            await ctx.render('2_error', {
                message: '用户名已存在'
            })
        } else {
            let res = await userModel.saveUser(user);
            if (res.affectedRows > 0) {
                await ctx.render('4_index')
            } else {
                await ctx.render('2_error', {
                    message: '注册失败'
                })
            }
        }
    },
    login: async (ctx) => {
        let user = ctx.request.body;
        if (user.username == '') {
            await ctx.render('2_error', {
                message: '输入用户名'
            })
        }
        let res = await userModel.getByNameAndPass(user.username, user.pass);
        if (res.length > 0) {
            await ctx.render('4_index')
        } else {
            await ctx.render('2_error', {
                message: '用户名或密码不正确'
            })
        }
    },
    userlist: async (ctx) => {
        let res = await userModel.getUsers();
        await ctx.render('5_userlist', {
            users: res
        })
    }
}