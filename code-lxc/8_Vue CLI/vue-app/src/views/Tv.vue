<template>
  <div>
    <ul>
      <li
        class="tv-item"
        v-for="tv in tvList"
        :key="tv.id"
        @click="getDetail(tv.id)"
      >
        <!-- 处理图片的宽高有些麻烦，因此将图片外面套个元素 -->
        <div class="img-box">
        <!-- 图片也有跨域问题，需要使用'https://images.weserv.nl/?url='  -->
          <img
            :src="'https://images.weserv.nl/?url=' + tv.cover.url"
            alt=""
          >
        </div>
        <div class="content">
          <h3>{{tv.title}}</h3>
          <p>{{tv.info}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  //也可以在此处给组件命名：name: "Tv",
  data() {
    return {
      tvList: [],
      start: 0,
      isFinish: true,
    };
  },
  /* 因为调用getData方法为了拿到data中的tvList中的内容，因此使用created()、beforeMount()、mounted()均可 */
  created() {
    this.getData();
  },
  /* 首次渲染完才需要懒加载，因此在此处调用懒加载方法 */
  mounted() {
    this.lazyLoad();
  },
  methods: {
    /* 获取数据 */
    getData() {
      /* 🍎等上次请求结束后才可继续拿请求：防止第一次请求的样式还没拿到，又开始发送新的请求 */
      if (this.isFinish) {
        //进入请求时将其改成false
        this.isFinish = false;
        this.axios
          .get(
          /* 请求有跨域问题，需要使用JsonBird中的https://bird.ioliu.cn/v2?url= */
          /* 将将要访问的地址中的&callback=jsonp1、&loc_id=108288&_=1636353972634去掉 */
          /* 如果地址后面传了&start=0&count=18，则表示从第0个开始取，取18个，常用来做分页 */
            "https://bird.ioliu.cn/v2?url=https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items",
            /* 将地址中的&start=0&count=18去掉的话，可以在此处传参数 */
            {
              params: {
                start: this.start,//vue实例中的start
                count: 10,
              },
            }
          )
          .then((res) => {
            /* 🍎如果使用方法1，滑动到页面底部，数组就被请求来的新数组替换，页面始终还在底部，就会一直调用getData()，因此不可行 */
            // 方法1：this.tvList = res.data.subject_collection_items;
            /* 所以不应该使数组进行替换，而是使其进行拼接，所以可以用方法2，3解决此问题 */
            //方法2：
            // this.tvList = this.tvList.concat(res.data.subject_collection_items);
            //方法3：
            this.tvList = [
              ...this.tvList,
              ...res.data.subject_collection_items,
            ];
            //拿到请求时将其改回true
            this.isFinish = true;
          });
      }
    },
    /* 处理懒加载：滚动条刷到底，数据再增多 */
    lazyLoad() {
      // 页面的高度：
      let htmlDom = document.documentElement;//获取html根元素所对应的dom，html的高度一定是整个页面的高度
      let fullH = 0;//如果在此处直接获取html根元素的高度，可能有些内容没渲染出来，因此在后面随着滚动随着获取其高度
      // 设备的高度
      let deviceH = htmlDom.clientHeight;
      console.log(deviceH);
      // 滚动出去的距离
      let scrollT = 0;//如果在此处直接获取滚动条的高度，可能有些内容没渲染出来，因此在后面随着滚动随着获取其高度
      window.onscroll = () => {
        fullH = htmlDom.offsetHeight;
        scrollT = htmlDom.scrollTop;
        // 滚动到底部
        if (fullH == deviceH + scrollT) {/* 如果此种方式不可以，可以留出误差的范围：if (fullH -10 < deviceH + scrollT) */
          //🍎总共就显示50条
          if (this.start < 40) {
            // 请求下一页数据
            this.start += 10;//this指向vue实例
            this.getData();
          }
        }
      };
    },
    // 跳转电视剧详情页
    getDetail(id) {
      this.$router.push("/tvDetail/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tv-item {
  display: flex;
  padding: 0.2rem 0;
  border-bottom: 1px dashed #ccc;
  .img-box {
    flex: 3;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    flex: 5;
    padding: 0.8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-weight: bold;
    }
  }
}
</style>