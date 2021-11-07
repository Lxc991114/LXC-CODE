<template>
  <div>
    <h1>课程详情页面接收参数</h1>
    <h2>课程号：{{$route.params.id}}</h2>
    <h2>课程时间：{{time}}</h2>
  </div>
</template>

<script>
export default {
    data(){
        return{
         time:this.$route.params.time
        }
    }
};
</script>

<style lang="scss" scoped>
</style>