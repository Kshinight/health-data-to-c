<template>
  <div class="header">
    <div class="myqsleft">
    <router-link  to="/" >上传今日数据</router-link>
    </div>
    <div class="myqsright">
    <router-link  to="/data" class="right">我的以往数据</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QSheader'
  }
</script>

<style  scoped>
  .header {
    width: 80%;
    margin:0 10%;
    height: 4rem;
    line-height: 4rem;
    background-color:#409EFF;}
  .header  a {
    color: #fff;
    text-decoration: none;}
  .myqsleft{
    width:calc(50% - 2px);
    font-size:2rem;
    float:left;
    text-align:center;
    border-right:1px solid white;
  }

  .myqsright{
    width:calc(50% - 2px);
    font-size:2rem;
    float:left;
    text-align:center;
    border-left:1px solid white;
  }
</style>
