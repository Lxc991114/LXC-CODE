var fs = require("fs");//加载File System模块
/* 1.异步方式：大多数还是使用异步方法操作文件 */
/* fs.readFile("4-(1)file.txt", "utf-8", function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
console.log("end.");
*/


/* 2.同步方式 */
 var res = fs.readFileSync("4-(1)file.txt", "utf-8");
 console.log(res);