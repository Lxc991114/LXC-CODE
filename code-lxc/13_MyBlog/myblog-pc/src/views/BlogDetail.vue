<template>
  <div class="content">
    <div class="blog-info">
      <h1 class="blog-title">{{blog.title}}</h1>
      <div class="other-info">
        <span class="post-time">{{blog.post_time}}</span>
        <span class="read-count">&nbsp;&nbsp;{{blog.read_count}}阅读量</span>
      </div>
      <div class="blog-content">{{blog.content}}</div>
    </div>

    <div class="comment-info">
      <div class="comment-title">
        评论
        <button id="btn-post-comment" @click="postComment" v-html="btnName"></button>
      </div>
      <div class="input-content" v-show="isShow">
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
        <button id="btn-post">评论</button>
      </div>
      <div class="comment-list" v-for="comment in comments" :key="comment.comm_id">
        <div class="comment-box">
          <span>评论内容：</span>
          <div class="comment-content">{{comment.content}}</div>
          <div class="other-info">
            <span class="create-time">&nbsp;&nbsp;{{comment.create_time}}</span>
            <span class="comment-author">{{comment.username}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blog: {},
      comments: [],
      isShow: false,
      btnName: "发布评论"
    };
  },
  created() {
    this.getBlogAndCommentsById();
  },
  methods: {
    getBlogAndCommentsById() {
      let blogId = this.$route.params.blogId;
      this.$http
        .request({
          url: "http://localhost:3000/blog/getBlogAndCommentsById",
          params: {
            blogId
          }
        })
        .then(res => {
          let { blog, comments } = res.data;
          this.blog = blog;
          this.comments = comments;
        });
    },
    postComment() {
      this.isShow = !this.isShow;
      if(this.isShow == true){
        this.btnName = '关闭评论'
      }else{
        this.btnName = '发布评论'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: block;
  text-align: left;
}
.blog-info {
  background-color: aqua;
}
.blog-info .other-info {
  height: 40px;
}
.comment-title {
  background-color: bisque;
}
.comment-info {
  margin-top: 20px;
}

#btn-post-comment {
  float: right;
}

.input-content {
  position: relative;
}

.input-content textarea {
  width: 100%;
}

#btn-post {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.comment-box {
  margin-top: 10px;
  background: #ccc;

  .other-info {
    height: 40px;
  }

  .other-info span {
    float: right;
  }
}
</style>