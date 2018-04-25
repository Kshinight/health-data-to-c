<template>
  <div class="header">
    <div class="myqs">
    <router-link  to="/">上传今日数据</router-link>
    </div>
    <div class="myqs">
    <router-link  to="/data">我的以往数据</router-link>
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
    width: 100%;
    height: 6rem;
    line-height: 6rem;
    background-color:#409EFF;}
  .header  a {
    color: #fff;
    text-decoration: none;}
  .myqs{
    width:calc(50% - 2px);
    font-size:2rem;
    float:left;
    border-left:1px solid white;
    border-right:1px solid white;
    text-align:center;
  }
</style>
