<template>
  <div class="qs-list">
    <div class="fill-container">
      <div class="content-item1">
        <div id="myweightChart"></div>
      </div>
      <div class="content-item1">
        <div id="mywaterChart"></div>
      </div>
        <li>查看以往数据填写信息</li>
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
        wsortwValue:[],
        wasortwValue:[],
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
          title: { text: '七日体重变化(kg)',
          textstyle:{
            fontFamily:'Microsoft YaHei'
          }},
          tooltip: {},
          xAxis: {
            nameTextStyle:{
              fontFamily:'Microsoft YaHei'
            },
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            nameTextStyle:{
              fontFamily:'Microsoft YaHei'
            },
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
            this.wsortwValue = JSON.parse(response.data.weightvalue);
            this.wValue.sort(function (x, y) {
              if (x < y) {
                return -1;
              }
              if (x > y) {
                return 1;
              }
              return 0;
            });
            myweightChart.setOption({
              series: [{
                data: this.wsortwValue,
                type: 'line'
              }],
              yAxis:{
//                min:this.wValue[0]-5,
//                max:this.wValue[-1]+5
              }
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
    margin: 0 10% 10% 10%;
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
  .content-item1 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: .5rem;
    margin-bottom: 2rem;
    border: .2rem solid #aaa;}
  .content-item1 p {
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
    height: 23rem
  }
  #mywaterChart{
    width: 100%;
    height: 23rem
  }
</style>
