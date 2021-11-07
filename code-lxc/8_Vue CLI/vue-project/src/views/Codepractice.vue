<template>
  <div>
    <h1>这是代码练习</h1>
    <router-link to="/fe">去前端练习页面</router-link>||
    <router-link to="/rd">去后端练习页面</router-link>
    <!-- 将跳转的页面的内容显示在此处 -->
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>