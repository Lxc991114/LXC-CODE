/* 1.基本的导出方法 */
/* 1.
module.exports = (ctx) => {
    console.log(ctx.method, ctx.header.host + ctx.url);
} */
/* 2.
module.exports = function(){
    return (ctx)=>{
        console.log(ctx.method, ctx.header.host + ctx.url);
    }
} */

/* 2.将日志内容写进txt文件中 */
let fs = require('fs')
 /*module.exports = (ctx) => {
    let str = ctx.method + '' + ctx.header.host + ctx.url + '\n';
    fs.appendFile('6-(1)file.txt', str, 'utf-8', function () {
        //里面不写内容也不能删掉该函数，不然会报错
        //TypeError [ERR_INVALID_CALLBACK]: Callback must be a function. Received 'utf-8'            
        //保证写完了再读
        fs.readFile('6-(1)file.txt', 'utf-8', function (err,data) {
            //想把日志打印到浏览器
            //（1）ctx.body=data;————网页中不成功,但是在这段代码后面加一句console.log(data)可在控制台中打印出信息;
            //说明还没查到data就又将其赋值给ctx.body了
            //因此应该将此段代码都放在Promise中            
        })
    })
}*/
 module.exports = (ctx) => {
     /* （2） */
     return new Promise(function(resolve,reject){
        let str = ctx.method + '' + ctx.header.host + ctx.url + '\n';
        fs.appendFile('6-(1)file.txt', str, 'utf-8', function () {
            fs.readFile('6-(1)file.txt', 'utf-8', function (err,data) {
                if(err) reject(err);
                resolve(data)
            });
        });
    });
};