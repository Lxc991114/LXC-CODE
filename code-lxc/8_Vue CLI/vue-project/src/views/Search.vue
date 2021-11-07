<template>
  <div>
    <h1>编程式导航测试页面</h1>
    <button @click="back">后退一步</button>
    <button @click="go">后退三步</button>
    <button @click="push">去主页</button>
    <button @click="replace">去主页</button>
    <button @click="pushObj">去用户详情页</button>
    <button @click="replaceObj">去内容详情页</button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    },
    go() {
      this.$router.go(-3);
    },
    push() {
      this.$router.push("/");
    },
    replace() {
      this.$router.replace("/");
    },
    pushObj() {
      this.$router.push({
        path: "/userDetail",
        query: {
          name: "lxc",
          age: 22
        }
      });
    },
    replaceObj() {
      this.$router.replace({
        name: "ContentDetail",
        params: {
          price: 44,
          address: '齐齐哈尔'
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>