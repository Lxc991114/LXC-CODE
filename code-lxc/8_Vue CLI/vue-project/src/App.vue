<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">代码练习</router-link>|
      <router-link to="/other">其他练习</router-link>|
      <router-link :to="{ path:'/userDetail',query:{name:'lisi',age:12,}}">用户详情</router-link>|
      <router-link :to="{ name:'ContentDetail',params:{price:14,address:'哈尔滨'} }">内容详情</router-link>|
      <router-link to="/classDetail/12/20020104">课程详情</router-link>|
      <router-link to="/active">活动页面</router-link>|
      <router-link to="/overtime">打折页面</router-link>|
      <router-link to="/end">结束页面</router-link>|
      <router-link to="/search">编程式导航页面</router-link>|
      <router-link to="/usevuex">使用vuex</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
