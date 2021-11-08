<template>
  <div id="app">
    <ComHeader></ComHeader>
    <!-- header、footer固定定位后释放空间，因此让页面使用上下外边距将header和footer的高度让出来即可 -->
    <router-view class="main" />
    <ComFooter></ComFooter>
  </div>
</template>

<script>
import ComHeader from "./components/ComHeader";
import ComFooter from "@/components/ComFooter";
export default {
  components: {
    ComHeader,
    ComFooter
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  margin: 1rem 0;
}

a {
  font-weight: bold;
  color: #000000;

  &.router-link-exact-active {
    color: #ffffff;
  }
}
</style>
