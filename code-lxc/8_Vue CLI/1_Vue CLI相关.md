# vue-project为基础练习项目

# 使用Vue CLI创建项目
1.基于node(下载node后可使用npm等命令)
2.在任意文件夹下安装————只可全局安装，安装在哪个文件夹下均可，查看版本号
3.创建项目
（1）命令行创建：vue create 项目名
（2）图形化创建：vue ui
4.运行项目：npm run serve

# vue相关的插件
vetur：着色
VueHelper：会进行一些语法提示
Vue 2 Snippets：Vue 2版本的代码补全
Vue VSCode Snippets:使用一些快捷键可快速生成vue模板，使用vbase可快速生成常用的vue模板，其他快捷键看插件的介绍


# 项目文件目录
1.接管维护一个项目的时候首先看README.md文件
2.node_modules：各种依赖各种包，共同做项目提交代码的时候不提交，执行npm install就可以把别人用的包都安装好(安装该项目的所有依赖)，就会在自己电脑出现该文件夹
3.public文件夹：项目中用到的一些东西可能和webpack冲突，该文件夹下的东西会在打包的过程中原封不动的放在打包后的dist文件夹下面，不会经过webpack的操作，一般不会去做该文件夹下的内容
注：webpack所有配置都写在webpack…的文件里，文件隐藏了，如果想更改一些配置，就需要输命令，让文件显示出来再配置，但一旦显示出来就没法自己更新了，以后所有东西都需要手动配置
webpack会把es6的语法通过babel转换成es5的语法，因此脚手架中可以使用import、export，因为有些es6的语法浏览器中不支持，必须转化成es5的写法才能运行
4.src文件夹:开发所需的文件结构
（1）assets文件夹：放静态资源————css、js、imgs文件夹等
（2）components文件夹：所有页面需要公共用到的组件
（3）router文件夹：配置路由————可实现单页面应用
index.js文件相当于路由表，项目中所要用到的所有页面都需要在这里面配置
（4）store文件夹：配置vuex(状态管理器)
（5）views文件夹：放置所有vue页面,每个页面都是一个组件，如果在vue页面中再引入组件，就是父组件引用子组件的问题了，每个.vue文件的首字母都需要大写
<style lang="scss" scoped>
在页面下方写css样式，可将其设置成scss
scoped是绑定的意思，意为整个页面都与该样式绑定，也只会在该文件里应用，打包时不会和其他文件错乱
</style>
（6）App.vue：所有views文件夹下的页面都是写在App.vue里面的，实现单页面应用，所有其他页面都是App.vue的组件
（7）main.js：主入口文件，声明vue实例，所有的页面都相当于它的组件，需要全局使用的css、js等文件都应该引入main.js
5.browerslistrc：配置编译的时候兼容的浏览器的版本
6.eslintrc：规范
7.gitignore：
/dist是用来上线的，开发的时候也用不到
8.babel.config：es6转变为es5
9.package-lock：别人打开你项目时需要下载依赖，这里将包的版本锁定，以便下载同版本的包
10.package.json：
dependencies：上线后依然需要依赖的包————一般在最后加 --save
devDependencies：开发时需要依赖的包
11.运行npm run build后会多一个dist文件，要上线的时候把dist文件上线，达到的效果就和在本地运行的一样，dist是压缩后上线要用的东西，开发的时候用不到，不用提交代码给别人看，别人需要的时候自己运行命令也能看到

### Vue CLI具体使用

# 🍎(1)# <router-view/>：想让内容显示在哪里，就在哪里写，与slot标签类似
该标签也可以加样式，例如：
header、footer固定定位后释放空间，因此让页面使用上下外边距将header和footer的高度让出来即可
<router-view class="main" />
.main {
  margin: 高度 0;
}



# 🍎(2)vue-router

# <router-link to="完整路由">代码练习</router-link>——————本质就是a标签
标签在哪，说明跳转到相关页面时，vue页面内部对应的东西就放在哪，类似于slot标签

# 每一个页面都相当于组件，因此其中的data应该与组件中写法一致

# 配置路由的两种方式：
配置路由的对象中的name属性一般与引入的页面同名，name中的内容相当于给该组件起的名字
另一种给组件起名字的方法是在vue文件的内部 
export default {
        name：'该页面的名字————组件名'
}
起name是为了防止使用vue工具时组件显示是匿名组件，从而不易观察现象
路径一般都是小写，name属性值一般与vue文件名一致，且首字母大写
（1）
import Lxcmainpage from '../views/Lxcmainpage.vue'
const routes = [
  {
    path: '/',
    name: 'Lxcmainpage',
    component: Lxcmainpage
  },
]
（2）
const routes = [
  {
    path: '/other',
    name: 'Lxcotherpage',
    component: () => import('../views/Lxcotherpage.vue')
  }
]

# 配置子路由：
在路由下面使用children数组，在其对象内部配置路由，子路由只需要配置自己的那部分，不需要再把父路由再写在前面
const routes = [
  {
    path: '/',
    name: 'Codepractice',
    component: Codepractice,
    children:[
      {
        path: 'fe',
        name: 'Fe',
        component: () => import('../views/Fe.vue')
      },
      {
        path: 'rd',
        name: 'Rd',
        component: () => import('../views/Rd.vue')
      }
    ]
  },
]

# 路由跨页面传参和接参数
1.地址栏【能】看到参数，刷新页面时参数【不会】丢失

（1）<router-link :to="{ path:'/user',query:{ 属性：值 } }">接收参数的页面</router-link>
传：path + query
取：
a.在js中：this.$route.query.属性
b.在html结构中：<标签> {{ $route.query.属性 }}</标签>

（2）<router-link to="/detail/10086/21800">课程详情页面</router-link>
传：路由/params
使用时需提前在路由文件中配置好形参
{
    path: '/detail/:id/:price',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
}
取：
a.在js中：this.$route.params.属性
b.在html结构中：<标签> {{ $route.params.属性 }}</标签>


1.地址栏【不能】看到参数，刷新页面时参数【会】丢失
（2）<router-link :to="{ name:'路由表中的路由的name',params:{ 属性：值 } }">接收参数的页面</router-link>
传：name + params
取：
a.在js中：this.$route.params.属性
b.在html结构中：<标签> {{ $route.params.属性 }}</标签>

# 路由的模式
（1）history：域名后面跟“/”，内核是依赖html5，浏览记录会被浏览器记录，如果浏览器版本比较老，不一定好使
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
（2）hash(哈希)：域名后面跟“/#/”，什么浏览器都支持
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

# 配置404页面:所有路由配置的最后面
{
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue')
}

# 页面重定向（访问A页面，但是自动定向到B页面）
1.重定向到不需要带参数的页面
（1）使用redirect重定向
{
    path: '/active',
    name: 'Active',
    redirect: '/',
    component: () => import('../views/Active.vue')
}
2.重定向到需要带参数的页面
（1）方法1：使用redirect重定向
弊端在于如果用户从地址栏输入地址进去，突然改变了地址，用户可能不知道发生了什么
{
    path: '/overtime/:id/:time',——————————————此处也要和重定向页面有一样的参数
    name: 'OverTime',
    redirect: '/classDetail/:id/:time',————————重定向的哪个页面
    component: () => import('../views/OverTime.vue')
},
（2）方法2：使用alias属性给重定向目标页面起别名
用不用的这个路由作为重定向页面的别名别名
目标页面：
{
    path: '/userDetail',
    name: 'UserDetail',
    alias:'/end',
    component: () => import('../views/UserDetail.vue')
},
舍弃页面：
{
    path: '/end',
    name: 'End',
    redirect: '/classDetail/:id/:time',
    component: () => import('../views/End.vue')
},

# 编程式导航：用js代码操纵进入哪个页面
除了使用<router-link to="完整路由"></router-link>标签外
还可以使用router的实例方法，通过编写代码来导航
1.退回上一步
this.$router.back()

2.进或退几步(正进后退)
this.$router.go(-2)

3.去到某个页面:this.$router.push、this.$router.replace,二者用法一致
（1）去到不需要传参数的页面：
this.$router.push('目标页面路由')
this.$router.replace('目标页面路由')
（2）去到需要传参数的页面：与目标页面的传参方式一致
1> this.$router.push():跳转到指定url路径，并想history栈中添加一个记录，点击后退会返回到上一个页面
this.$router.push({
  path:'目标页面路由',
  query:{
     键:值
  }
});
this.$router.push({
  name:'目标页面name',
  params:{
     键:值
  }
});
this.$router.push('目标页面路由/:参数1...');
2> this.$router.replace:跳转到指定url路径，发生了替换但是history栈中不会有记录，点击返回会跳转到上上个页面
this.$router.replace({
  path:'目标页面路由',
  query:{
     键:值
  }
});
this.$router.replace({
  name:'目标页面name',
  params:{
     键:值
  }
});
this.$router.replace('目标页面路由/:参数1...');

# 导航守卫：再进入页面中进行的操作
（1）在路由中配置
{
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
    beforeEnter: (to, from, next) => {
      相关判断和操作
      next();
    }
    beforeLeave：(to, from, next) => {
      相关判断和操作
      next();
    }
}
（2）在页面中配置
export default {
  beforeRouteEnter(to, from, next) {
    相关判断和操作
    next();
  },
  beforeRouteLeave(to, from, next) {
    相关判断和操作
    next();
  },
};

# （3）vuex：
公共状态管理，把可能和其他组件通信的内容都放在公共管理器中，其中的方法和变量所有页面都可以使用解决只能父子组件间通信的问题
export default new Vuex.Store({
  // 相当于 data
  state: {
  
  },
  // 相当于 computed
  getters: {
   
  },
  // 相当于methods,用来处理同步方法
  mutations: {
    // 当方法需要传参数的时候第一个参数因为对应的事 state，所以必须写 state 占个位置，不然的话，会把实际传的参数识别成 state，导致参数不能正确的传过来
   
  },
  // 处理异步的方法
  actions: {
    //这里只能使用异步的方法，如果方法内使用了同步的操作，需要将同步部分的方法写在mutations中
    //然后在异步的方法中使用this.commit('同步方法中的方法名')
  } 
  //公共状态东西特别多的时候，可以将大的store分成几个模块(模块化)
  modules: {
  }
})

# 如何引用vuex中的变量和方法(同步异步方法的获取方式一致)
1.取参数：
a.在js中：this.$store.state.属性————————————————页面一加载的时候可以拿到，后续如果state中有更改则拿不到更改后的值
b.在html结构中：<标签> {{ $store.state.属性 }}</标签>——————————————————这种拿法始终可以拿到最新的值
c.在export default对象上面使用🍎import { mapState  } from "vuex";🍎————将其映射到该文件中
在将对象中的某个属性映射出来...mapState(['需要映射出来的属性'])————写在与data同级的computed对象中
然后可以直接在html结构处用{{映射过来的属性名}}

2.取方法：
（1）不需要传参
a.在js中：用组件自己的方法包裹着this.$store.commit('vuex中的方法名')
b.在html结构中：<标签> {{ $store.commit('方法名') }}</标签>
c.在export default对象上面使用🍎import { mapState，mapMutations  } from "vuex";🍎————将其映射到该文件中
在将对象中的某个属性映射出来...mapMutations(['需要映射出来的同步方法'])————写在与data同级的methods对象中
在将对象中的某个属性映射出来...mapActions(['需要映射出来的异步方法'])————写在与data同级的methods对象中

然后可以直接在html结构处用{{映射出的方法}}


（2）需要传参
vuex文件中：
  mutations: {
    // 当方法需要传参数的时候第一个参数因为对应的是 state，所以必须写state占个位置，不然的话，会把实际传的参数识别成state，导致参数不能正确的传过来
    addNum(state, num) {————num为形参
      state.count += num;//如果将state作为参数传过来，就不需要this了
    },
  },
页面html结构：
    <button v-on:click="addNum1(5)">+5</button>
页面js结构：
  methods: {
     addNum1(num) {
       this.$store.commit("addNum", num);————num为实参
     },
  },

# 如何在vuex中使用异步方法(actions)
vuex:
  mutations: {
    reduce(state) {
      state.count--;
    }
  },
  actions: {
    reduceFun() {
      setTimeout(() => {
        this.commit('reduce');
      }, 1000);
    }
  },
组件中获取异步方法的方式与同步一致

# 如何在vuex中使用计算属性(getters)————与计算属性computed使用方法一致
  getters: {
    result(state) {
      return state.count * state.num;
  }
组件中取getters：
在export default对象上面使用🍎import { mapState，mapMutations，mapGetter  } from "vuex";🍎————将其映射到该文件中
在将对象中的某个属性映射出来...mapMutations(['需要映射出来的计算属性'])————写在与data同级的computed对象中
在将对象中的某个属性映射出来...mapActions(['需要映射出来的计算属性'])————写在与data同级的computed对象中

# 如何在vuex中使用modules

const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态

# 组件引用
import ComHeader from '../src/components/ComHeader'
import ComFooter from '@/components/ComFooter'——————@则表示src文件夹
写完组件中内容，将组件引用至需要使用组件的页面，注册后再调用

template标签内部的div在header和footer中可以直接写<header></header><footer></footer>

<router-link to="/">内容</router-link>不写路径时，只写<router-link>剧集</router-link>时，内容不会显示在浏览器中

# vue中也用来发送ajax请求的有一个vue-axios
去axios官网找到它，在项目中安装并根据官网指示配置
Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js中
发送get请求最方便的方法：
this.axios.get(api).then((response) => {
  console.log(response.data)
})

# 处理跨域问题的远程服务器代理：JsonBird
解决完跨域的问题，图片依旧跨域，可使用专门处理图片跨域的前缀：'https://images.weserv.nl/?url=' + 图片的地址

# 使用其他人写好的组件记得安装配置后再使用

# 使用element ui(组件库)
使用前需要先安装：npm i element-ui -S
使用：使用引入的方法Element，在main.js文件中配置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);