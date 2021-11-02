# 【弹性盒模型】

##任意容器都可以通过 display:flex 指定为Flex布局，行内元素也可以使用 display:inline-flex 指定为Flex布局,
  对于容器内部的项目来说效果一样，他们的区别在于容器自身是以块元素还是行业元素立命

##默认情况下（方向可改）：
（1）主轴：水平方向向右，flex container（弹性容器）的最左面是主轴的起始点，最右面是终止点
（2）交叉轴（侧轴）：它永远垂直于主轴，默认情况下，flex container（弹性容器）最上面是交叉轴的起始点，最下面是终止点
（3）flex item（弹性项目）：都有自己的main size(占主轴的空间)和cross size(占交叉轴的空间)，这两值不一定等于width和height
                           可以换行时使用换行的属性时，这两值可以等于width和height
                           当不使用换行的属性时，这两值不一定等于width和height：
                           弹性容器宽800px，每个项目的宽为200px，有5个项目，因此每个项目的main size是160px，而它们的宽是设好的200px

## 弹性盒模型————容器的属性(6个)：
       1.flex-direction: 用来设置主轴的方向的属性(4个属性值) 
      （1）row：它是默认值，表示主轴在水平方向，起点为左端 
      （2）row-reverse：表示主轴在水平方向，起点为右端 
      （3）column：表示主轴在垂直方向，起点在上沿 
      （4）column-reverse：表示主轴在垂直方向，起点在下沿 

      2.flex-wrap: 用来将能换行的flex项目换行(3个属性值)
      (如弹性容器宽800px，每个项目的宽为200px，有5个项目，因此每个项目的main size是160px，而它们的宽是设好的200px)
      （1）nowrap：默认值，不换行
      （2）wrap：换行
      （3）wrap-reverse：反方向换行

      3.flex-flow：flex-direction与flex-wrap的复合写法

      4.justify-content: 用来定义主轴上flex项目的对齐方式(6个属性值)
      （1）flex-start：在主轴的起点对齐
      （2）flex-end：在主轴的终点对齐
      （3）center：在主轴的中间对齐 
      （4）space-between: 两端对齐，项目之间的间隔相等
      （5）space-around: 最边上flex项目的靠边侧间隔相等，项目之间的间隔会比两侧间隔大一倍
      （6）space-evenly: 最边上flex项目的靠边侧间隔和每个flex项目的之间间隔都相等（均匀分布）

      5.align-items: 用来定义交叉轴上flex项目的对齐方式(5个属性值)
      （1）flex-start：在交叉轴的起点对齐
      （2）flex-end：在交叉轴的终点对齐 
      （3）center：在交叉轴的中间对齐 
      （4）baseline：以flex项目中第一行文本的下沿（基线）对齐 
      （5）stretch：默认值，拉伸 

      6.align-content: 定义多根主轴在交叉轴方向上的对齐方式,如果出现了多行，可以认为每一行都是一个主轴
      （1）flex-start：在交叉轴的起点对齐
      （2）flex-end：在交叉轴的终点对齐
      （3）center：在交叉轴的中间对齐
      （4）space-between: 两端对齐，项目之间的间隔相等
      （5）space-around: 最边上flex项目的靠边侧间隔相等，项目之间的间隔会比两侧间隔大一倍
      （6）space-evenly: 最边上flex项目的靠边侧间隔和每个flex项目的之间间隔都相等（均匀分布）


## 弹性盒模型————项目的属性(5个)：
      1.flex-grow: 用来定义flex项目的放大的比例，如果有剩余空间的话，值小于1时，剩余空间不会全部分配给这些元素
      例：flex-grow: 1; 占剩余空间的一份
      2.flex-shrink: 用来定义flex项目的缩小的比例，如果空间有负债的话
      3.flex-basis：定义了在分配多余空间之前，项目占据的主轴空间(main size)，浏览器根据这个属性计算主轴是否有多余空间
                     默认值为auto，及项目本身的大小
      可以设成具体像素，则项目占据固定空间如flex-basis：100px，与width类似，如果跟width同时设置，优先级比width高
      4.order：定义项目的排列顺序，数值越小，排列越前，默认为0
      5.flex属性：flex-grow、flex-shrink、flex-basis的简写，默认值是0 1 auto，后两个属性可选，建议优先使用




