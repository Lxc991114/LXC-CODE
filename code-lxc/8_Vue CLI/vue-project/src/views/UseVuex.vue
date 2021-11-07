<template>
  <div>
    <h1>Vuex</h1>
    <!-- 取属性 -->
    <p>this.$store.state.count:{{mycount}}</p>
    <p>$store.state.count:{{$store.state.count}}</p>
    <p>mapstate-count:{{count}}</p>
    <p>结果:{{result}}</p>
    <!-- 取方法 -->
    <button @click="add1">加1</button>
    <button @click="add2(5)">加5</button>
    <button @click="add">加1</button>
    <button @click="add5(5)">加5</button>
    <button @click="reduceFn">延迟1s减1</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["result"])
  },
  data() {
    return {
      /* 这种方式只有页面一渲染的时候可以拿到值，但是state中变化时，它不会跟着变化 */
      mycount: this.$store.state.count + 1
    };
  },
  methods: {
    ...mapMutations(["add", "add5"]),
    ...mapActions(["reduceFn"]),
    add1() {
      this.$store.commit("add");
    },
    add2(num) {
      this.$store.commit("add5", num);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>