<template>
  <div class="qs-list">
    <div class="fill-container">
      <div class="fill" v-if="!isError">
        <router-link to="/" tag="span" class="back">&lt; 返回</router-link>
        <br>
        <h2>{{qsItem.title}}</h2>
        <!--问卷内容渲染-->
        <div class="content">
          <div class="content-item" v-for="item in qsItem.question_list">
            <p class="qs-title">
              {{item.id}}&nbsp;{{item.label}}&nbsp;{{getMsg(item)}}
            </p>
            <br>
            <!--数据渲染-->
            <div v-if="item.type === 'textarea'" class="question-content-wrap">
              <el-row>
                <el-col >
                  <el-input
                    v-model="requiredItem[item.id]"
                    :autosize="{ minRows: 1, maxRows: 4}"
                    class="question-input"
                    :type="item.type"
                    placeholder="请输入内容">
                  </el-input>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type === 'radio'" class="question-content-wrap">
              <el-row>
                <el-col>
                  <el-radio-group v-model="requiredItem[item.id]">
                    <div class="radiolist">
                    <el-radio v-for="qradio in item.options"
                              :label="qradio.value"
                              class="question-radio">
                              {{qradio.label}}
                    </el-radio>
                    </div>
                  </el-radio-group>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type === 'checkbox'" class="question-content-wrap">
              <el-checkbox-group v-model="requiredItem[item.id]">
                <div class="checkboxlist">
                  <el-checkbox v-for="qradio in item.options"
                             :label="qradio.value"
                             class="question-checkbox">
                             {{qradio.label}}

                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </div>

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
      <!--提交-->
      <footer>
        <el-row>
          <el-button type="primary" class="submit" @click="submit">提交</el-button>
        </el-row>
      </footer>
    </div>
    <div class="error" v-if="isError">
      404 Not Found
    </div>
  </div>
</template>
<style>
  .fill-container {
    margin: 0 10% 10% 10%;
    padding: 10%;
    color: #666;
    background-color: #fff;
    border-radius: .4rem;
    box-shadow: 0 0 1rem #aaa;}
  h2 {
    margin: 3rem 0;
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
  .content-item{
    padding: 5% 7%;}
  .content-item:hover {
     background-color:#E9F0F7;
   }
  .checkboxlist{
    width:5rem;
  }
  .radiolist{
    width:5rem;
  }
  .el-radio+.el-radio{
    margin-left:0;
    margin-top:1rem;
  }
  .el-checkbox+.el-checkbox{
    margin-left:0;
    margin-top:1rem;
  }
  footer{
    height: 6rem;
    margin-top: 3rem;
    text-align: center;
    line-height: 6rem;
  }
  .submit{
    width: 10rem;
    height: 3rem;
    padding-top: .3rem;
    padding-bottom: .3rem;
    line-height: 100%;
    color: #fff;
    border: .1rem solid #409EFF;
    border-radius: .2rem;
    cursor: pointer;}
  .submit:hover {
     box-shadow: 0 0 5px #409EFF;
   }


</style>
<script>
  export default {
    name: 'QSfill',
    data() {
      return {
        qsItem : [],
        Qslist : [],
        isError : false,
        info:"",
        dialogVisible : false,
        requiredItem : [],
        final:{},
        submitok: true,
      }
    },
    created:function() {
      this.getData();
    },
    methods: {
      getData(){
        this.$http({
          url: 'http://localhost:8080/static/questionValue.json',
          method: 'get',
        })
          .then( (response) => {
            this.Qslist = response.data.rule;
            this.fetchData();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      fetchData() {
        let i = this.$route.params.num;
        if(this.Qslist.length != 0){
        this.qsItem = this.Qslist[i-1]
          this.getRequiredItem()
        }
        else{
          this.isError = true;
        }
      },
      getMsg(item) {
        let msg = ''
        if (item.type === 'radio') {
          msg = '(单选题)'
        } else if (item.type === 'checkbox') {
          msg = '(多选题)'
        } else {
          msg = '(文本题)'
        }
        return  `${msg} `
      },
      getRequiredItem() {
        this.qsItem.question_list.forEach( item => {
              if (item.type === 'checkbox') {
                this.requiredItem[item.id] = [];
              }
              else{
                this.requiredItem[item.id] = "";
              }
        } )
      },
      addQuestionItem(){
        //加入问卷时间戳
        var questionContent = new Object();
        var questionDate = new Date();
        questionContent.date=questionDate.getFullYear()+"-"+(questionDate.getMonth()+1)+'-'+questionDate.getDate()
        //加入问卷号
          questionContent.r_id=parseInt(this.qsItem.id)
        this.requiredItem[0]=questionContent
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getfinal(){
          this.final.data = [];
        for(let i = 1;i<this.requiredItem.length;i++){
          this.final.data[i-1]={q_id:i,value:this.requiredItem[i]}
        }
        this.final.date = this.requiredItem[0].date;
        this.final.r_id = this.requiredItem[0].r_id;
        this.final.u_id = Math.floor(Math.random()*5+1)
        this.final.data=JSON.stringify(this.final.data)
      },
     post(data1){
        console.log("post")
       var params = new URLSearchParams()
       params.append('date', data1.date)
       params.append('r_id', data1.r_id)
       params.append('u_id', data1.u_id)
       params.append('data', data1.data)
       this.$http({
         url: 'http://homja.top/Questionnaire/index.php/api/my/answer',
         method: 'post',
         data:params
       })
      .then( (response) => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  },
      submit(){
        this.addQuestionItem()
        this.getfinal();
        this.submitok = this.validate()
        if (this.submitok) {
          this.dialogVisible = true
          this.info = '提交成功！'
//          this.post(this.final)
        setTimeout(() => {
          this.dialogVisible = false
        }, 1500)
        setTimeout(() => {
          this.$router.push({path: '/'})
        }, 2000)
      }
      else{
          this.dialogVisible = true
          this.info = '提交失败！ 存在必填项未填！'
        }
      },
//      验证代码在思考中
      validate() {
        for (let i in this.requiredItem) {
          if (this.requiredItem[i].length === 0)
            return false
        }
        return true
      }
  },

  }


</script>
