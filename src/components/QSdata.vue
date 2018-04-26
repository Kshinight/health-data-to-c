<template>
  <div>
    <div class="fill-container">
      <div class="fill" v-if="!isError">
        <router-link to="/" tag="span" class="back">&lt; 返回</router-link>
        <h2>{{qstime}}&nbsp;填写内容</h2>
        <!--问卷内容渲染-->
        <div class="content">
          <div class="content-item" v-for="item in qsItem.questionList">
            <p class="qs-title">
              {{item.num}}&nbsp;{{item.label}}&nbsp;{{getMsg(item)}}
            </p>
            <br>
            <!--数据渲染-->
            <div v-if="item.type === 'textarea'" class="question-content-wrap">
              <el-row>
                <el-col >
                  <el-input
                    v-model="asvaluelist[item.num]"
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
                  <el-radio-group v-model="asvaluelist[item.num]">
                    <div class="radiolist">
                      <el-radio v-for="qradio in item.options"
                                :label="qradio.value"
                                class="question-radio"
                                disabled>
                        {{qradio.label}}
                      </el-radio>
                    </div>
                  </el-radio-group>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.type === 'checkbox'" class="question-content-wrap">
              <el-checkbox-group v-model="asvaluelist[item.num]">
                <div class="checkboxlist">
                  <el-checkbox v-for="qradio in item.options"
                               :label="qradio.value"
                               class="question-checkbox"
                               disabled>
                    {{qradio.label}}

                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
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
    name: 'QSdata',
    data() {
      return {
        isError:false,
        Aslist:[],
        qsItem : [],
        Qslist : [],
        isError : false,
        requiredItem : [],
        qstime:"",
        asvaluelist:[]
      }
    },
    methods: {

      getData(){
        this.$http({
          url: 'http://localhost:8080/static/questionValue.json',
          method: 'get',
        })
          .then( (response) => {
            this.Aslist = response.data.value;
            this.Qslist = response.data.rule;
            console.log(this.Aslist.qsValue.qsItemvalue)
            this.getValue();
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

        }
        else{
          this.isError = true;
        }
      },
      getValue(){
        this.qstime = this.Aslist.qsValue.time;
        this.asvaluelist = this.Aslist.qsValue.qsItemvalue;
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
    },
    beforeMount() {
      this.getData();
    }
  }


</script>

