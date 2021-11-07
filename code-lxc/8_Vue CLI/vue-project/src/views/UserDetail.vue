<template>
  <div>
    <h1>用户详情页面接收参数</h1>
    <h2>用户名：{{name}}</h2>
    <h2>用户年龄：{{$route.query.age}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$route.query.name
    };
  }
};
</script>

<style lang="scss" scoped>
</style>