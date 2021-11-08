<template>
  <div>
    <!-- 使用vue-aplayer组件：音乐播放器 -->
    
    <!-- 因为使用了组件，如果想绑定事件时优先看文档中的事件，不行再考虑自己的——————很遗憾，我没找到合适的点击事件 -->
    <aplayer :audio="audio" :lrcType="0" />
    <!-- 在vue-aplayer文档中可知lrcType="0"表示禁用歌词 -->
    <ul>
      <li v-for="(item,index) in playList" :key="item.id" @click="getSong(item.id)">
        <span>{{index + 1}}</span>
        <span class="title">{{item.name}}</span>
        <span>{{item.ar[0].name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
/* 只在此页面使用该组件 */
import Vue from "vue";
import APlayer from "@moefe/vue-aplayer";
Vue.use(APlayer, {
  defaultCover: "https://github.com/u3u.png",
  productionTip: true
});

export default {
  created() {
    this.getData();
  },
  data() {
    return {
      audio: {
        /* 使用该组件的时候默认就给了一个audio属性，想要告诉播放器什么信息就在该属性中写 */
        name: "",
        artist: "",
        url: "",
        cover: ""
      },
      playList: []
    };
  },
  methods: {
    getData() {
      this.axios
        /* JsonBird提供的获取网易云音乐歌单的方法，后面传歌单id即可 */
        .get("https://bird.ioliu.cn/netease/playlist?id=6672624203")
        .then(res => {
          this.playList = res.data.playlist.tracks;
          this.getSong(this.playList[0].id); //使得一进页面默认显示的就是第一首歌
        });
    },
    getSong(id) {
      this.axios
        /* JsonBird提供的获取网易云音乐歌单的方法，后面传歌曲id即可 */
        .get("https://bird.ioliu.cn/netease/song?id=" + id)
        .then(res => {
          this.audio = {
            name: res.data.data.name,
            artist: res.data.data.ar[0].name,
            url: res.data.data.mp3.url /* 拿到mp3文件才能正常播放 */,
            cover: res.data.data.al.picUrl
          };
        });
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  span {
    flex: 1;
  }
  .title {
    flex: 2;
  }
}
</style>