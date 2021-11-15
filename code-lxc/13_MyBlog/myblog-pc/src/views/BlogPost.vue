<template>
  <div class="content">
    <h1>发表文章</h1>
    <br />
    <div class="form">
      <p>
        分类：
        <select v-model="cateId">
          <option v-for="category in cateList" :key="category.cateId"  :value="category.cateId">{{category.cateName}}</option>
        </select>
      </p>
      <p>
        标题：
        <input type="text" v-model="title" />
      </p>
      <p>
        内容：
        <br/>
        <textarea cols="30" rows="10" v-model="content"></textarea>
      </p>
      <p class="btn">
        <button @click="postBlog">发布</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      cateId: 0,
      title: "",
      content: ""
    };
  },
  created() {
    this.getCatories();
  },
  methods: {
    getCatories() {
      this.$http
        .request({
          url: "http://localhost:3000/blog/getCatories"
        })
        .then(res => {
          let { categories } = res.data;
          this.cateList = categories;
        });
    },
    postBlog() {
      this.$http
        .request({
          method: "post",
          url: "http://localhost:3000/blog/postBlog",
          data: {
            cate_id: this.cateId,
            title: this.title,
            content: this.content
          },
          headers: {
            'Authorization': localStorage.getItem("mytoken")
          }
        })
        .then(res => {
          let { state } = res.data;
          if (state === "未登录") {
            alert("请登录");
            this.$router.push("/login");
          } else if (state === "success") {
            this.$router.push("/");
          } else {
            alert("发布失败，请重试");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  text-align: left;
}
.form {
  width: 300px;
  height: 340px;
  background-color: rgb(135, 222, 215);
  border: 1px burlywood solid;
  border-radius: 20px;
  margin: 20px auto;
  position: relative;
  left: -120px;
  textarea {
    margin-left: 45px;
  }
  .btn {
    text-align: center;
  }
}
</style>