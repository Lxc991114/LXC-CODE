<template>
  <!-- footer页面使用了vuex中的方法改变了其中的属性值，header处也跟着改变，因为是vuex公共状态 -->
  <header :style="{backgroundColor: curMenu.bgColor}">
    <span>《 首页</span>
    {{curMenu.name}}
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["curMenu"])
  }
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background-color: #0059ff;
  font-weight: bold;
  span {
    position: absolute;
    left: 0;
  }
}
</style>