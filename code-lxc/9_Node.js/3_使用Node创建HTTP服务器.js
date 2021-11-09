/* 只是证明node有自带服务器(处理客户端请求)的能力，开发时不需要自己写该底层代码 */
var http = require("http");//加载http模块
http.createServer//创建服务器
(function (req, res) {//接受请求(req)，返回结果(res),
    res.writeHead(200, { "Content-Type": "text/html" });
    //启动js文件后可执行在浏览器中
    res.write("<h1>Node.js</h1>");
    res.end("<p>Hello World</p>");//响应结束，如果不写end，浏览器就会一直转圈

    // text/xml：
    // res.end("<users> <user>lisi</user> </users>");

    // application/json：将js对象作为一种数据传输格式
    //res.end(`"{"username":"lisi", "age":23}"`);

  })
  .listen(3000);
console.log("HTTP server is listening at port 3000.");
