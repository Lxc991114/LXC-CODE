# Babel
一个广泛使用的转码器，ES6刚出的时候很多浏览器不支持，Babel可以将ES6代码转为ES5代码，从而在现有环境执行
# Babel步骤
1.安装node.js
2.打开终端
（1）window=>开始-运行-输入cmd
（2）输入node -v检查是否安装成功
（3）安装完node，node会自动给安装npm，用npm -v检查是否安装成功
npm：包管理器，可以帮忙下载项目中依赖的内容
cnpm：淘宝镜像的包管理器
如果是下载的旧版npm:
(1)window系统下可使用： npm install npm -g 更新
(2)使用淘宝镜像命令：npm install -g cnpm --registry = https://registry.npm.taobao.org 
a. windows需要点击右键选择粘贴
b. mac需要在最前面加sudo，只要有-g就加sdo
# 创建babel文件
1.在ES6的文件夹中新建一个文件夹（不可以直接使用demo）并且在终端中打开
（1）npm init -y:生成package.json(项目配置文件)
（2）安装babel
a.windows下：npm install -g babel-cli
b.mac下：sudo npm install -g babel-cli
g是全局globe的缩写，mac用户输入完空格后会让输入开机密码
（3）安装转换语法插件
npm install --save-dev babel-preset-es2015 babel-cli
假设test文件中写的ES6中代码，想生成一个test1里是js的代码，则需要在终端中执行：
babel test.js -o test1.js————即可完成新文件的生成
要想让test1文件自动跟着test文件更改，则需要在终端中执行：
babel test.js -o test1.js -w————即可完成自动修改
（4）在上一项的文件夹中新建一个.babelrc文件————presets、plugins
{
  "presets": ["es2015"],
  "plugins": []
}

# export、import————依赖于node
console.log();只有浏览器解析html文件时才可以在控制台打印出来，因此想要看js文件中的打印效果，如果需要看import.js中的打印效果，可在控制台输入“babel-node import.js,即可在终端中看到打印效果





