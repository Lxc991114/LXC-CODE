const userModule = require('../models/userModule')
var jwt = require('jsonwebtoken');

let secretOrPrivateKey = '$qwer5432poi8764#098s'

module.exports = {
    goToLogin: async (ctx) => {
        //1.接数据
        let user = ctx.request.body;
        //2.验证
        //3.查询数据库
        let res = await userModule.getUserByNameAndPass(user.username, user.pass)
        //4.生成token
        let payload = {
            userId: res[0].user_id,
            username: res[0].username
        }
        let token = jwt.sign(payload, secretOrPrivateKey, { expiresIn: 120 })//设置token有效期为2s
        if (res.length > 0) {
            ctx.body = {
                state: 'success',
                //5.将token返回给前端
                token
            }
        } else {
            ctx.body = 'fail'
        }
    },
    checkLogin: async (ctx) => {
        try {
            //1.获取token
            let token = ctx.header.authorization
            //2.验证token
            jwt.verify(token, secretOrPrivateKey)
            ctx.body = {
                state: 'success'
            }
        } catch (err) {
            ctx.status = 401
            ctx.body = {
                state: 'fail'
            }
        }
    }
}