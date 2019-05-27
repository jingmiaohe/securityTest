<template>
  <div class="wrongPage">
    <system-title :showMenu="true" :showClose="true"></system-title>
    <div class="wrongPagePane">
      <div class="wrongPagePaneTitle">
        <img src="@/assets/images/wrongPageTitle.jpg" alt="">
      </div>
      <div class="wrongPagePaneContent">
        <div>
          <div class="questionType">
            <img src="@/assets/images/wrongPageLeftTag.png" alt="">
            <span>{{questionTypeDesc}}</span>
            <!--文字判断 图片判断 文字选择 图片选择 视频分析-->
          </div>
          <div class="questionCurNum">
            <img src="@/assets/images/wrongPageRightTag.png" alt="">
            <span>第{{activeNum+1}}题</span>
            <!--文字判断 图片判断 文字选择 图片选择 视频分析-->
          </div>
          <div class="shadow">
          </div>
          <transition name="el-fade-in">
            <img v-show="showYes" src="@/assets/images/yes.jpg" alt="" style="width: 100px;">
          </transition>
          <transition name="el-fade-in">
            <img v-show="showNo" src="@/assets/images/no.jpg" alt="" style="width: 100px;">
          </transition>
          <div class="ques-box">
            <question-comp
              v-for="(item, index) in allQuestions"
              :key="index"
              v-if="activeNum === index"
              @resetCurAnswer="resetCurAnswer"
              @resetQuestionTypeDesc="resetQuestionTypeDesc"
              @resetQuestionWeighting="resetQuestionWeighting"
              :number = "activeNum"
              :question = "item"
            ></question-comp>
          </div>
          <transition>
            <p class="answerKey" v-show="showAnswerKey">
              {{answerKey?answerKey:' '}}
            </p>
          </transition>
          <ul class="testFoot clearfix">
            <li  v-show="activeNum > 0">
              <button class="pre" @click="getPreQuestion">上一题</button>
            </li>
            <li  v-show="activeNum >= 0" >
              <button class="center" @click="getAnswerKey">答案解析</button>
            </li>
            <li  v-show="activeNum >= 0" >
              <button class="center" @click="confirmAns">确定</button>
            </li>
            <li  v-show="activeNum < allNum-1">
              <button class="next" @click="getNextQuestion">下一题</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import systemTitle from '@/components/title'
  import questionComp from '@/components/questionComp'
  import { getWrongQus, delWrongQue } from '@/api/test'
    function checkAns(ansStr, arrStr) {
      var str1 = ansStr.split(',').sort().join(',');
      var str2 = arrStr.split(',').sort().join(',');
      return str1 === str2;
    }
  export default {
    name: 'wrongPage',
    data () {
      return {
        type: this.$route.params.code, // 'all'曾经所有错题  'once'本次考试错题
        curAnswer: '',
        questionWeighting: '',
        questionTypeDesc: '',
        activeNum: -1,
        allNum: 0,
        allQuestions: [],
        showAnswerKey: false, // 是否显示答案解析
        showYes: false,
        showNo: false
      }
    },
    computed: {
      answerKey(val, oldVal) {
        if (this.allQuestions.length > 0) {
          return this.allQuestions[this.activeNum]['analysis']
        } else {
          return '';
        }
      }
    },
    methods: {
      resetCurAnswer(ans) {
        this.curAnswer = ans;
        this.showYes = false;
        this.showNo = false;
      },
      resetQuestionWeighting(weight) {
        this.questionWeighting = weight;
      },
      resetQuestionTypeDesc(desc) {
        this.questionTypeDesc = desc;
      },
      getPreQuestion() {
        if (this.activeNum !== 0) {
          this.activeNum -= 1;
        }
        this.showAnswerKey = false;
        this.showYes = false;
        this.showNo = false;
      },
      getAnswerKey() {
        this.showAnswerKey = !this.showAnswerKey;
      },
      confirmAns() {
        var tempRightAns = this.allQuestions[this.activeNum]['answer'];
        while(tempRightAns.indexOf("，") !== -1){  //寻找每一个英文逗号，并替换
          tempRightAns = tempRightAns.replace("，",",");
        }
        if (checkAns(tempRightAns, this.curAnswer)) {
          this.showYes = true;
          delWrongQue(this.allQuestions[this.activeNum]['id']).then(res => {
            this.$message({
              message: '回答正确，已从错题库移除',
              type: 'success'
            })
          });
        } else {
          this.showNo = true;
          this.showAnswerKey = true;
        }
      },
      getNextQuestion() {
        if (this.activeNum !== this.allNum -1) {
          this.activeNum += 1;
        }
        this.showAnswerKey = false;
        this.showYes = false;
        this.showNo = false;
      }
    },
    components: {
      systemTitle, questionComp
    },
    mounted() {
      // 获取错题信息
      let that = this;
      var code = this.$route.params.code;
      if (code && code !== 'all') {
        that.allQuestions = JSON.parse(code);
        that.activeNum = 0;
        this.allNum = that.allQuestions.length;
      } else {
        getWrongQus().then((res) => {
          if(res.data.length === 0) {
            this.$message({
              message: '您已无错题记录，请重新开始测试',
              type: 'warning'
            });
            this.$router.push('/data');
          } else {
            that.allQuestions = res.data;
            that.activeNum = 0;
            that.allNum = res.data.length;
          }

        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "~@/assets/styles/variable.less";
  .wrongPage{
    height:100%;
    background-image: url('../../assets/images/noticeBg.png');
    background-size:100% 100%;
    .wrongPagePane{
      height: calc(~"100% - 60px");
    }
    .ques-box{
      height: calc(~"100% - 150px");
      position: relative;
    }
    .wrongPagePaneTitle{
      text-align: center;
      padding-top: 30px;
      img{
        width: 120px;
      }
    }
    .wrongPagePaneContent{
      height: calc(~"100% - 80px");
      padding: 30px 60px;
      &>div{
        height:100%;
        width:100%;
        position:relative;
        &>div.shadow{
          height:100%;
          width:100%;
          border-radius: 20px;
          background-color: #66b1ff;
          opacity: 0.4;
          position:absolute;
          top:0;
          left:0;
          z-index:1;
        }
        img{
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%, -50%);
          z-index: 99;
        }
        &>div.questionCurNum{
          left: 230px;
          width:180px;
          height:36px;
        }
        &>div.questionType{
          left: 30px;
          width:180px;
          height:36px;
        }
        &>div.questionCurNum,&>div.questionType{
          position: absolute;
          top: -18px;
          z-index:2;
          img{
            width:180px;
            height:36px;
          }
          span{
            position:absolute;
            display: inline-block;
            text-align: center;
            width:100%;
            top: 6px;
            left:50%;
            transform:translate(-50%, 0);
            color:#fff;
            z-index:100;
          }
        }
    }
      .answerKey{
        position: absolute;
        width: 100%;
        left:0;
        bottom: 90px;
        z-index:4;
        text-align: center;
      }
      .testFoot{
        height:60px;
        padding: 0 80px 60px 80px;
        position: absolute;
        width: 100%;
        left:0;
        bottom: 0;
        z-index:3;
        text-align: center;
        li{
          display: inline-block;
          width:24%;
          button{
            width:100px;
            height:30px;
            color:#fff;
            .rad7;
            background-color:@cardTitleBgColor;
            font-size: 16px;
            &:hover{
              opacity:0.8;
            }
          }
        }
      }
    }
  }
</style>
