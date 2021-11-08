<template>
  <div
    v-loading.fullscreen="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
  <!-- 安装并配置完element ui后即可直接使用其中组件 -->
  
  <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel
        :interval="4000"
        type="card"
        height="200px"
      >
        <el-carousel-item
          v-for="url in imgList"
          :key="url"
        >
          <img
            :src="'https://images.weserv.nl/?url=' + url"
            alt=""
          >
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 选项卡 -->
    <div class="tab-list">
      <el-tabs
        v-model="activeName"
        :stretch="true"
        @tab-click="changeList"
      ><!--  stretch属性的值决定该标签是否撑开  -->
        <el-tab-pane label="虚构类" name="book_fiction"></el-tab-pane>
        <el-tab-pane label="非虚构类" name="book_nonfiction"></el-tab-pane>
      </el-tabs>
      <ul>
        <li
          class="book-item"
          v-for="book in bookList"
          :key="book.id"
        >
          <div class="img-box">
            <img
              :src="'https://images.weserv.nl/?url=' + book.cover.url"
              alt=""
            >
          </div>
          <div class="content">
            <h3>{{book.title}}</h3>
            <p>{{book.info}}</p>
            <!-- 评分 -->
            <el-rate
              :value="book.rating.value/2"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      imgList: [],
      bookList: [],
      activeName: "book_fiction",//组件自身的使用方法，默认展示虚构类
      loading: false,
    };
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios
        .get(
          "https://bird.ioliu.cn/v2?url=https://m.douban.com/rexxar/api/v2/subject_collection/" +
            this.activeName +
            "/items?start=0&count=8"
        )
        .then((res) => {
          this.bookList = res.data.subject_collection_items;
          this.imgList = this.bookList.map((item) => {//要返回一个新数组，所以需要用带返回值的循环，可以用map
            return item.cover.url;
          });
          this.loading = false ;
        });
    },
    changeList() {/* 点击切换时应该获取书单 */
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-carousel__item {
  img {
    width: 100%;
  }
}
.book-item {
  display: flex;
  .img-box {
    flex: 3;
    img {
      width: 100%;
    }
  }
  .content {
    flex: 5;
  }
}
</style>