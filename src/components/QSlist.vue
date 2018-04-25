<template>
  <div class="qs-list">
    <div class="fill-container">
    <ul v-if="Questionlist.length == 0 ? false : true">
      <li></li>
      <li>问卷列表</li>
    </ul>
    <template v-for="item in Questionlist">
      <el-row>
        <el-button  class="questionlistbutton" @click="$router.push({name: 'qsFill', params: {num: item.num}})">{{item.desc}}</el-button>
      </el-row>
    </template>
    </div>
  </div>
</template>




<script>
  export default {
    name: 'QSlist',
    data() {
      return {
        isError: false,
        Questionlist:[],
      }
    },
    methods: {
      getData(){
        this.$http({
          url: 'http://localhost:8080/static/questionaire.json',
          method: 'get',
        })
          .then( (response) => {
            this.Questionlist = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    },
    beforeMount() {
      this.getData();
    }
  }
</script>

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
  li{
    list-style-type:none;
  }
  .questionlistbutton{
    margin-top:2.5rem;
    width:100%;
    height:60px;
    font-size:1.5rem;
  }
</style>
