<template>
  <div>
    <h1>内容详情页面接收参数</h1>
    <h2>这是它的价格:{{price}}</h2>
    <h2>这是它的地址:{{this.$route.params.address}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: this.$route.params.price
    };
  }
};
</script>

<style lang="scss" scoped>
</style>