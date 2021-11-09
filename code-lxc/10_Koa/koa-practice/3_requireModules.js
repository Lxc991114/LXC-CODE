/* Koa原理：导入文件 */
const MyKoa = require('./2_exportsModules');
const app = new MyKoa();

/* 多次调用同一个函数 */
app.use((myCtx) => {
    myCtx.body = '<h1> hello mykoa hehe </h1>'
});

app.use((myCtx) => {
    myCtx.body = '<h1> hello mykoa haha </h1>'
});


app.listen(5000);


function getData(){
    return new Promise()
}