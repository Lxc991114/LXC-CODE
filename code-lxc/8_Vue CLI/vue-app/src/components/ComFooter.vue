<template>
  <!-- 直接将背景颜色写在这里，就不需要用js代码操纵样式 -->
  <footer :style="{backgroundColor: curMenu.bgColor}">
    <!-- 因为需要点击链接跳转页面，又需要点击链接的时候告知header当前是什么页面
    避免点击事件与链接自身跳转冲突，因此在链接外使用其他标签绑定点击后的相应操作
    -->
    <div v-for="menu of menuList" :key="menu.path" @click="changeMenu(menu)">
      <router-link :to="menu.path">{{menu.name}}</router-link>
    </div>
  </footer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["curMenu"])
  },
  data() {
    return {
      menuList: [
        { path: "/", name: "剧集", bgColor: " #ff0055 " },
        { path: "/music", name: "音乐", bgColor: " #fffb00 " },
        { path: "/book", name: "书籍", bgColor: " #1af307 " }
      ]
    };
  },
  methods: {
    ...mapMutations(["changeMenu"])
  }
};
</script>

<style lang="scss" scoped>
footer {
  height: 1rem;
  line-height: 1rem;
  background-color: #ff0055;
  position: fixed;
  bottom: -0.02rem; /* footer总能看到1px的距离 */
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>