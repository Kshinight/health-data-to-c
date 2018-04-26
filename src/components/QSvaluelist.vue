<template>
  <div class="qs-list">
    <div class="fill-container">
      <div class="content-item">
        <div id="myweightChart"></div>
      </div>
      <div class="content-item">
        <div id="mywaterChart"></div>
      </div>
        <li>希望查看哪个问卷的以往数据填写信息</li>
        <template v-for="item in Questionlist">
          <el-row>
             <el-button type="success" class="questionlistbutton" @click="$router.push({name: 'QSdata', params: {num: item.num}})">{{item.desc}}</el-button>
          </el-row>
        </template>

    </div>
  </div>
</template>




<script>
  export default {
    name: 'QSvaluelist',
    data() {
      return {
        isError: false,
        Questionlist:[],
        waValue:[],
        wValue:[],
      }
    },
    methods: {
      getData(){
        this.$http({
          url: 'http://localhost:8080/static/questionValue.json',
          method: 'get',
        })
          .then( (response) => {
            this.Questionlist = response.data.rule;
            this.wValue = JSON.parse(response.data.weightvalue);
            this.waValue = JSON.parse(response.data.watervalue);


          })
          .catch(function (error) {
            console.log(error);
          });
      },
      drawweightLine(){
        // 基于准备好的dom，初始化echarts实例
        let myweightChart = this.$echarts.init(document.getElementById('myweightChart'))
        // 绘制图表
        myweightChart.setOption({
          title: { text: '七日体重变化(kg)' },
          tooltip: {},
          xAxis: {

            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            min:40,
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line'
          }]
        });
        //获取数据
        this.$http({
          url: 'http://localhost:8080/static/questionValue.json',
          method: 'get',
        })
          .then( (response) => {
            this.wValue = JSON.parse(response.data.weightvalue);
            myweightChart.setOption({
              series: [{
                data: this.wValue,
                type: 'line'
              }],
            });

          })

      },
      drawwaterLine(){
        // 基于准备好的dom，初始化echarts实例
        let mywaterChart = this.$echarts.init(document.getElementById('mywaterChart'))
        // 绘制图表
        mywaterChart.setOption({
          title: { text: '七日饮水量变化(l)' },
          tooltip: {},
          xAxis: {

            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            min:2,
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line'
          }]
        })
        //获取数据
        this.$http({
          url: 'http://localhost:8080/static/questionValue.json',
          method: 'get',
        })
          .then( (response) => {
            this.waValue = JSON.parse(response.data.watervalue);
            mywaterChart.setOption({
              series: [{
                data: this.waValue,
                type: 'line'
              }],
            });

          })

      }
    },
    beforeMount() {
      this.getData()
    },
    mounted() {
      this.drawweightLine();
      this.drawwaterLine();


    },
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
  .el-button--success{
    background-color: #14A99F;
    border-color:#14A99F;
  }
  .content-item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: .2rem solid #aaa;}
  .content-item p {
    margin-bottom: 1rem;
  }
  .item-left {
    width: 35rem;}
  .option {
    margin-left: 3rem;
  }
  .item-right {
    width: 35rem;}
  .progress-bar {
    display: inline-block;
    width: 25rem;
    height: 1rem;
    margin-bottom: 1.5rem;
    border: 2px solid #aaa;
    cursor: pointer;
  }
  #myweightChart{
    width: 100%;
    height: 20rem
  }
  #mywaterChart{
    width: 100%;
    height: 20rem
  }
</style>
