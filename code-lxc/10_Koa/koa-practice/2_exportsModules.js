const http = require('http');

/* Koa原理：导出文件 */
module.exports = class MyKoa{

    middleware = [];    // 中间件

    constructor(){}

    callback(){

        return (req, res) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            
            for(let i=0; i<this.middleware.length; i++){
                let fn = this.middleware[i]     // => fn
                let obj = {};
                fn(obj);
                res.write(obj.body);
            }

            res.end("");
        };
    }

    use(fn){  
       this.middleware.push(fn)/* 每调用一次就往数组中插入一个函数 */
    }

    listen(port){
        let server = http.createServer(  this.callback()   );
        server.listen(port);
        console.log('MyKoa is starting at port ' + port);
    }
}