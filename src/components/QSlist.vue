<template>
  <div class="qs-list">
    <div class="fill-container">
    <ul v-if="Questionlist.length == 0 ? false : true">
      <li></li>
      <li>问卷列表</li>
    </ul>
      <div style="margin:1.5rem 0">
      <el-row>
        <el-col >
          <p style="margin-bottom: 1rem;">今日体重(kg)</p>
          <el-input v-model="weightvalue" placeholder="请输入内容"></el-input>

          <el-button @click="submitweight" >提交</el-button>

        </el-col>
      </el-row>
      </div>
      <div style="margin:1rem 0">
        <el-row>
          <el-col >
            <p style=" margin-bottom: 1rem;">今日饮水量(l)</p>
            <el-input v-model="watervalue" placeholder="请输入内容"></el-input>
            <el-button @click="submitwater" >提交</el-button>
          </el-col>
        </el-row>
      </div>
    <template v-for="item in Questionlist">
      <el-row>
        <el-button  class="questionlistbutton" @click="$router.push({name: 'QSfill', params: {num: item.num}})">{{item.desc}}</el-button>
      </el-row>
    </template>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="300px"
        center
        :before-close="handleClose">
        <span>{{info}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
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
        weightvalue:"",
        watervalue:"",
        dialogVisible:false,
        info:"",
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getData(){
        this.$http({
          url: 'http://localhost:8080/static/questionValue.json',
          method: 'get',
        })
          .then( (response) => {
            this.Questionlist = response.data.rule;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //传递饮水量和体重函数
      submitweight(){
        if (this.weightvalue != "") {
          this.dialogVisible = true
          this.info = '提交体重数据成功！'
          setTimeout(() => {
            this.dialogVisible = false
          }, 1500)
        }
        else{
          this.dialogVisible = true
          this.info = '提交失败！ 数据为空！'
        }
        this.weightvalue = ""
      },
      submitwater(){
        if (this.watervalue != "") {
          this.dialogVisible = true
          this.info = '提交体重数据成功！'
          setTimeout(() => {
            this.dialogVisible = false
          }, 1500)
        }
        else{
          this.dialogVisible = true
          this.info = '提交失败！ 数据为空！'
        }
        this.watervalue = ""
      }

    },
    beforeMount() {
      this.getData();
    }
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
  .el-input{
    width:calc(70% - 50px);
    margin-right: 2rem;
  }
  .questionlistbutton{
    margin-top:2.5rem;
    width:100%;
    height:60px;
    font-size:1.5rem;
  }
</style>
