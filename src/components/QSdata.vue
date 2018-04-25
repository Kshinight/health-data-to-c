<template>
  <div>
    <div class="fill-container">
      <div class="fill" v-if="!isError">
        <router-link to="/" tag="span" class="back">&lt; 返回</router-link>
        <h2>以往数据分析</h2>
        <!--问卷内容渲染-->
        <div class="content"></div>
      </div>

      <!--提交-->
    </div>
    <div class="error" v-if="isError">
      404 Not Found
    </div>
  </div>
</template>

<style>
  .fill-container {
    margin: 10%;
    padding: 10%;
    color: #666;
    background-color: #fff;
    border-radius: .4rem;
    box-shadow: 0 0 1rem #aaa;}
  h2 {
    margin-bottom: 3rem;
    text-align: center;
    font-size: 2rem;
    color: #555;
  }
  .back {
    font-size: 1.6rem;
    cursor: pointer;}
  .back:hover {
    color: #409EFF;
  }
  .content {
    padding: 5%;
    border-top: .2rem solid #ccc;
    border-bottom: .2rem solid #ccc;
  }
  footer{
    height: 6rem;
    margin-top: 3rem;
    text-align: center;
    line-height: 6rem;
  }


</style>

<script>
  import echarts from "echarts"
  export default {
    name: 'QSdata',
    data() {
      return {
        isError:false,
      }
    },
    methods: {
//      getData(){
//        this.$http({
//          url: 'http://localhost:8080/static/questionaire.json',
//          method: 'get',
//        })
//          .then( (response) => {
//            this.Qslist = response.data.data;
//            this.fetchData();
//          })
//          .catch(function (error) {
//            console.log(error);
//          });
//      }
    }
  }


</script>
