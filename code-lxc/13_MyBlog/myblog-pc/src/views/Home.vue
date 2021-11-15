<template>
  <div class="content">
    <div class="blog-list">
      <div class="blog-box" v-for="blog in blogs" :key="blog.blog_id">
        <h2 class="blog-title">
          <router-link :to="{ path: '/blog/detail/' + blog.blog_id }">{{blog.title}}</router-link>
        </h2>
        <div class="blog-content">{{blog.content}}</div>
        <div class="other-info">
          <span class="post-time">{{blog.post_Time}}</span>
          <span class="read-count">&nbsp;&nbsp;{{blog.read_count}}阅读量</span>
          <span class="username">&nbsp;&nbsp;{{blog.username}}</span>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="btns">
        <button id="btn-post" @click="postBlog">发表文章</button>
      </div>
      <div class="blog-cates">
        <h2>文章分类</h2>
        <ul class="category-list">
          <li v-for="category in categories" :key="category.cateId">
            <router-link to="">{{category.cateName}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogs: [],
      categories: []
    };
  },
  created() {
    this.getBlogsAndCategory();
  },
  methods: {
    getBlogsAndCategory() {
      this.$http
        .request({
          url: "http://localhost:3000/blog/getBlogsAndCategories",
        })
        .then(res => {
          let { state, blogs, categories } = res.data;
          if (state === "success") {
            this.blogs = blogs;
            this.categories = categories;
          }
        });
    },
    postBlog() {
      this.$router.push("/blog/post");
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  text-align: left;
  margin-top: 20px;
}
.blog-list {
  flex: 1;
  margin-right: 20px;

  .blog-box {
    margin-top: 20px;
    padding: 20px;
    height: 220px;
    background: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:first-child {
      margin-top: 0;
    }
  }
}

.sidebar {
  width: 220px;
}
</style>
