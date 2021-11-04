# DOM
DOM:文档对象模型，将html中的结构和css中的样式都看作对象，用js语言去操纵的过程就是DOM编程

# API
应用程序接口，可以简单理解为一些方法和函数

# 元素(element):
就是标签的另一种叫法，在DOM中多称为获取元素

# 变量的建议性命名方式(除驼峰命名)：匈牙利类型标记法
如：aLi(li的数组)、oBtn(按钮对象)

# DOM查找：
到HTML结构中直接找到该元素

# DOM遍历：
把整个HTML代码当成树状的结构，给定一个元素，通过它再去找其他的元素

# window.onload =
 function(){
    //其中代码在页面加载完毕后再回来执行
}

# XML和HTML
XML：不是用来展示数据的，主要是用来前后端传数据的格式
HTML：数据的展示

# XML DOM 和 HTML DOM
后者是前者的子集，前者的语法可以操纵后者，但是后者自己的语法简化了前者中的语法

# 节点(node)
HTML有12种节点，常用的就几种

# offsetWidth和offsetHeight
odiv1.style.width————只能看到内联样式，想看内部或者外部的就需要用到offsetWidth和offsetHeight这两个属性
(1)是只读的,不能赋值
(2)包含：border + padding + content
(3)还有clientWidth、scrollWidth等问题
(4)offsetLeft、offsetTop相对于最近的已定位的父元素，除了offsetWidth和offsetHeight，带offset的几乎都是
(5)样式不加在内联时想要获取宽和高等也有语法：
a.标准浏览器：getComputedStyle(oDiv1, null).width————第一个参数是获取哪个
b.ie8之前的浏览器： oDiv1.currentStyle.width 

# Attribute属性和property属性(内存属性)
对于自定义的属性:
如果在HTML结构中(标签中)使用了自定义属性，不允许使用对象点属性的方法来访问，应该用getAttribute()和setAttribute()来访问

# 自定义属性————在HTML中临时存储一些数据，用的时候再将值取出来

# DOM事件：任何操作都是基于事件的
（1）事件源：触发事件的源头
（2）事件处理函数：绑定的函数就是时间按处理函数
（3）事件：事件处理函数的形参event(可传可不传)就是事件

# DOM事件常用属性(形参为event时)
a.event.clientX是离浏览器最左边的值，event.clientY是离浏览器最上面的值
b.event.keyCode可以拿到按的键盘的独有的码
c.event.target获取事件源————标准浏览器
d.window.event.srcElement获取事件源————IE

# DOM事件常用方法(形参为event时)
1.阻止默认行为：
a.event.preventDefault()：标准浏览器中使用的阻止默认行为的方法
b.window.event.returnValue = false：ie浏览器中阻止默认行为的属性，只有这么访问才好使，因为ie浏览器不认识event这个形参
2.组织事件传播(冒泡)：
a.event.stopPropagation():
b.window.event.cancelBubble = true

# 事件冒泡
# 事件委托
解决后生成的事件绑定的问题、解决过多事件需要绑定的问题的最优解
5-1（3）中有其他解决方法
# 事件绑定
（1）解决事件多次绑定后面代码覆盖前面代码的问题
标准浏览器可使用：addEventListener()——————（1）事件监听
ie浏览器中可使用：attachEvent()——————（2）事件捕捉
（2）取消事件绑定
a.对普通事件绑定的取消
将事件绑定设为null
如：oBtn2.onclick = null;
b.对事件监听绑定的取消
removeEventListener()

