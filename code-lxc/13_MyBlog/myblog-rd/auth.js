var jwt = require('jsonwebtoken');

let secretOrPrivateKey = '$qwer5432poi8764#098s'

module.exports = {
    verify: async (ctx,next) => {
        try {
            //1.获取token
            let token = ctx.header.authorization
            //2.验证token
            jwt.verify(token, secretOrPrivateKey)
            //3.验证通过后进行下一步操作
            await next(); //这块必须加await！！！！
        } catch (err) {
            console.log(err);
            //ctx.status = 401——————后端最好返回给前端401状态码，但是此处返回之后就会报错，就不会提示未登录请登录并且跳转到登录页面
            ctx.body = {
                state:'未登录'
            }
        }
    }
}