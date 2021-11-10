/*
// 我的需求：
// 1. http://localhost || http://localhost/index 加载index.html
// 2. http://localhost/todo 加载todo.html
// 3. http://localhost/xxx 加载404.html
// 那么我们的路由可以设定为：
// 1. "/"
// 2. "/index"
// 3. "/todo"
// 4. "/xxx"
*/
/**
 * 渲染(加载)指定的html文件
 */
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

function render(path){
    return new Promise(function(reslove, reject){
        fs.readFile(path, 'utf-8', function(err, data){
            if(err) reject(err);
            reslove(data);
        });
    });
}

app.use(async ( ctx ) => {
  let url = ctx.url
  if(url === '/' || url === '/index'){
    ctx.body = await render('views/1_index.vue');//不可加载vue文件，所以不显示
  }else if(url === '/todo'){
    ctx.body = await render('views/2_todo.html');
  }else{ //404
    ctx.body = await render('views/3_404.html');
  }
})


app.listen(3000)