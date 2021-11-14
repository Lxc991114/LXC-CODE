<template>
  <div class="home">主页</div>
</template>

<script>
export default {
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.$http
        .request({
          method: "post",
          url: "http://localhost:3000/user/checkLogin",
          headers: {
            Authorization: localStorage.getItem("mytoken")
          }
        })
        .then(res => {
          let { state } = res.data;
          if (state === "fail") {
            /* 此处没必要的逻辑是：
            拿回来的值是success的话，跳转首页，因为这本来就是首页
            如果有上段代码的逻辑，会报这样的错误：
            NavigationDuplicated: Avoided redundant navigation to current location: "/".
            */
            this.$router.push("/login");
          }
        });
    }
  }
};
</script>
