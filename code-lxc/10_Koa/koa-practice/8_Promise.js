let fs = require("fs");

/* 解决异步操作还没查询到结果，同步操作就先执行了赋值但是无法赋值成功的问题 */
function getData() {
  return new Promise(function (resolve, reject) {//将异步操作放在return new Promise的function中
    fs.readFile("6-(1)file.txt", "utf-8", function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function test() {//await必须被一个带async的函数包围着
  var data2 = await getData();//getData方法查询到了再赋值
  console.log(data2);
}

test();
