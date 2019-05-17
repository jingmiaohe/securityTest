<template>
  <div class="test">
    <!--测试-->
    <div class="leftSide">
      <div class="leftSideTitle">
      <system-title :showMenu="true" :showClose="true"></system-title>
      <div class="curNum">
        <div>当前题目：{{activeNum+1}}/{{type === 'test'? 18 : exerciseAllNum}}</div>
      </div>
      <div class="questionType">
        <img src="@/assets/images/questionType.png" alt="">
        <span>{{questionTypeDesc}}</span>
        <!--文字判断 图片判断 文字选择 图片选择 视频分析-->
      </div>
        <question-comp
          v-for="(item, index) in allQuestions"
          :key="index"
          v-if="activeNum === index"
          @resetCurAnswer="resetCurAnswer"
          @resetQuestionTypeDesc="resetQuestionTypeDesc"
          @resetQuestionWeighting="resetQuestionWeighting"
          :number = "activeNum"
          :oldAns = "oldAns"
          :question = "item"
        ></question-comp>
      <div class="testFoot clearfix">
          <button class="pre" v-if="activeNum !== 0" @click="getPreQuestion">上一题</button>
        <button class="center"  v-if="type==='exercise'" @click="confirm">确定</button>
          <button class="next" v-if="activeNum !== 17" @click="getNextQuestion">下一题</button>
        </div>
      </div>
    </div>
    <!--按钮-->
    <div class="rightSide">
      <div class="rightSideTitle">
        <div v-if="type === 'test'">
          倒计时:
          <span>{{timerContent}}</span>
        </div>
      </div>
      <div class="userInfo">
        <!---->
        <el-row :gutter="20">
          <el-col :span="8">
            <img src="@/assets/images/userAvatar.png" alt="头像">
          </el-col>
          <el-col :span="16">
            <ul>
              <li>{{userName}}</li>
              <li><label>性&nbsp;&nbsp;别：</label><span>{{userSex}}</span></li>
              <li><label>班&nbsp;&nbsp;级：</label><span>{{userGrade}}</span></li>
              <li><label>学&nbsp;&nbsp;号：</label><span>{{studentNumber}}</span></li>
              <li><label>学&nbsp;&nbsp;校：</label><span>{{userSchool}}</span></li>
            </ul>
          </el-col>
        </el-row>
        <!---->
      </div>
      <div class="cardTitle">答题卡</div>
      <ul class="cardList clearfix" v-if="type === 'test'">
        <li :class="(item.answers === ''?'noAnswer':'answered')+(index === activeNum ? ' active': '')"
            v-for="(item, index) in questionCardList"
        @click="chooseQuestionList(index, item.answers)">{{item.num}}</li>
      </ul>
      <ul class="cardList clearfix" v-if="type === 'exercise'">
        <li :class="item.isRight!== ''?item.isRight?'answerdRight':'answerdWrong':'noAnswer'+(index === activeNum ? ' active': '')"
            v-for="(item, index) in questionCardList"
            @click="chooseQuestionList(index, item.answers)">{{item.num}}</li>
      </ul>
      <div class="answerKeys" v-if="type === 'exercise'">
        <span @click="isShowAnswerKey">答案解析</span>
        <div v-show="showAnswerKey">
          <p><b>正确答案：</b><b>{{allQuestions[activeNum]?allQuestions[activeNum]['answer']:'--'}}</b></p>
          <p>{{allQuestions[activeNum]?allQuestions[activeNum]['analysis']:'--'}}</p>
        </div>
      </div>
      <div class="commit">
        <submit-btn text="加入错题" v-if="type === 'exercise'" type="orange" @click="addWrong"></submit-btn>
        <submit-btn text="提 交" type="yellow" v-if="type === 'test'" @click="goSubmit"></submit-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import systemTitle from '@/components/title'
  import submitBtn from '@/components/submitBtn'
  import questionComp from '@/components/questionComp'
  import { exam, endExam, exercise, addWrongQue} from '@/api/test'
  export default {
    name: 'test',
    data () {
      return {
        type: this.$route.params.code, // 'exercise' 'test'
        exerciseAllNum: 3000,
        questionType: '',
        questionTypeDesc: '',
        questionWeighting: '', // 分值
        isSingleSelect: true,  // 是不是单选
        allQuestions: [],
        activeNum: -1,
        curAnswer: '',
        questionCardList: [],
        examId: '', // 考试id
        timer: null, // 倒计时
        timerContent: '', // 倒计时文字选项
        showAnswerKey: false, // 是否显示答案解析
        oldAns: '' //放置旧答案
      }
    },
    methods: {
      goSubmit() {
        endExam(this.examId, this.questionCardList).then(res => {
          this.$router.push({
            name: 'score',
            params: {
              testScore: JSON.stringify(res.data)
            }
          })
        })
      },
      getPreQuestion() {
        if (this.type === 'exercise' && this.curAnswer) {
          this.confirm();
        }
        this.activeNum -= 1;
        this.showAnswerKey = false;
      },
      getNextQuestion() {
        if (this.type === 'exercise' && this.curAnswer) {
          this.confirm();
        }
        this.activeNum += 1;
        this.showAnswerKey = false;
      },
      // 单机答题卡
      chooseQuestionList(index, old) {
        this.activeNum = index;
        console.log(old)
        this.oldAns = old;
      },
      isShowAnswerKey() {
        this.showAnswerKey = !this.showAnswerKey;
      },
      addWrong() {
        addWrongQue(this.allQuestions[this.activeNum]['id'])
      },
      confirm() {
        // 验证答案
        var that = this;
        var ind = that.questionCardList.findIndex(function(item) {
          return item.num === that.activeNum + 1
        })
        var tempObj = Object.assign({},that.questionCardList[ind]);
        var bool = that.curAnswer === that.allQuestions[ind]['answer'];
        tempObj['isRight'] = bool;
        that.$set(that.questionCardList, ind, tempObj);
        if(!bool) {
          addWrongQue(this.allQuestions[ind]['id'])
        }

      },
      // 开始倒计时
      startTimer(maxTime) {
        var that = this;
        that.timer = setInterval(function() {
          if (maxTime && maxTime > 0) {
            var minutes = Math.floor(maxTime/60);
            var seconds = Math.floor(maxTime%60);
          } else {
            clearInterval(that.timer);
            that.timer = null;
            that.goSubmit();
          }
          that.timerContent = (minutes<10?'0'+minutes:minutes) + ':' + (seconds<10?'0'+seconds:seconds);
          --maxTime;
        }, 1000)


      },
      resetCurAnswer(ans) {
        var that = this;
        this.curAnswer = ans;
        var ind = that.questionCardList.findIndex(function(item) {
          return item.num === that.activeNum + 1
        })
        var tempObj = Object.assign({},that.questionCardList[ind]);
        tempObj['answers'] = that.curAnswer;
        that.$set(that.questionCardList, ind, tempObj)
      },
      resetQuestionWeighting(weight) {
        this.questionWeighting = weight;
      },
      resetQuestionTypeDesc(desc) {
        this.questionTypeDesc = desc;
      }
    },
    computed: {
      ...mapState({
        userName: state => state.student.name,
        userSex: state => state.student.sex,
        userGrade: state => state.student.grade,
        studentNumber: state => state.student.studentNumber,
        userSchool: state => state.student.school
        })
    },
    components: {
      systemTitle, submitBtn, questionComp
    },
    watch: {
      activeNum(val, oldVal) {
        var oldAns = this.questionCardList[val]['answers'];
        this.curAnswer = oldAns;
        this.oldAns = oldAns;
      }
    },
    created() {
      var num = 1;
      var that = this;
      that.timer ? clearInterval(that.timer):null;
      that.timer = null;
      if(that.type === 'test') {
        exam().then((res) => {
          that.examId = res.data.examId;
          that.allQuestions = res.data.questions;
          var len = this.allQuestions.length;
          for(num; num <= len; num++) {
            that.questionCardList.push({num: num, id:that.allQuestions[num-1].id, answers: ''})
          }
          that.activeNum = 0;
          //正式开始测试 并开始计时,参数秒
          this.startTimer(1800);
        })
      } else if (that.type === 'exercise') {
        exercise().then((res) => {
          that.allQuestions = res.data;
          var len = this.allQuestions.length;
          for(num; num <= len; num++) {
            that.questionCardList.push({num: num, id:that.allQuestions[num-1].id, answers: '', isRight: ''})
          }
          that.activeNum = 0;
        })
      }

    }
  }
</script>
<style scoped lang="less">
  @import "~@/assets/styles/variable.less";
  .test{
    height:100%;
    background-image: url('../../assets/images/noticeBg.png');
    background-size:100% 100%;
    .leftSide{
      float: left;
      width:calc(~"100% - 360px");
      height:100%;
      position: relative;
      .leftSideTitle{
        height:60px;
      }
      .curNum{
        height:45px;
        line-height: 45px;
        width:100%;
        position:relative;
        background-color: #fff;
        opacity: 0.7;
        text-align: right;
        padding-right:20px;
        color: @noticePaneColor;
      }
      .questionType{
        position: absolute;
        left: 30px;
        top: 84px;
        img{
          width:180px;
          height:45px;
        }
        span{
          position:absolute;
          display: inline-block;
          text-align: center;
          width:100%;
          top: 10px;
          left:50%;
          transform:translate(-50%, 0);
          color:#fff;
        }
      }
      .testFoot{
        height:60px;
        padding: 0 80px 80px 80px;
        position: absolute;
        width: 100%;
        left:0;
        bottom: 0;
        text-align: center;
        button{
        width:100px;
        height:30px;
        color:#fff;
        .rad7;
        background-color:@cardTitleBgColor;
        font-size: 16px;
        &.pre{
          float:left;
        }
        &.next{
          float:right;
        }
        &:hover{
          opacity:0.8;
        }
      }
      }
    }
    .rightSide{
      float: right;
      width:360px;
      height:100%;
      background-color: @cardColor;
      box-shadow: -2px 0 5px #a1bcd0;
      position:relative;
      .rightSideTitle{
        height:60px;
        position:relative;
        background: linear-gradient(#9f9f9f, #737373);
        &>div{
          position:absolute;
          top:50%;
          left:50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display:inline-block;
          width:160px;
          height:30px;
          line-height:30px;
          border-radius:10px;
          background-color: @cardTitleBgColor;
          color: #fff;
        }
      }
      .userInfo{
        margin-top: 20px;
        padding: 0 30px;
        .el-row{
          height:100%;
          img{
            width:100px;
            height:100px;
          }
        }
        ul{
          li{
            font-size: 14px;
            line-height:20px;
            white-space:nowrap;
            &:first-child{
              border-bottom: 1px solid black;
              font-size: 16px;
              font-weight:bold;
            }
            &:nth-child(2) {
              margin-top:6px;
            }
            label{
              font-weight: normal;
            }
          }
        }
      }
      .cardTitle{
        margin:20px;
        height:30px;
        line-height:30px;
        text-align: center;
        background-color: @cardTitleBgColor;
        .rad;
        color:#fff;
      }
      .cardList{
        margin: 0 10px 0 20px;
        li{
          cursor: pointer;
          float:left;
          width: 45px;
          height:45px;
          line-height:45px;
          text-align: center;
          margin-right: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          &.answerdRight{
            background-color: @cardListBgColor;
            border:1px solid @noticePaneColor;
          }
          &.answerdWrong{
            background-color: @cardColor;
            border:1px solid red;
            &.active{
              border-width: 2px;
            }
          }

          &.noAnswer{
            background-color: @cardColor;
            border:1px solid @noticePaneColor;
            &.active{
              border-width: 2px;
            }
          }
          &.answered{
            background-color: @cardListBgColor;
            border:1px solid @noticePaneColor;
            &.active{
              border-width: 2px;
            }
          }
          &:hover{
            background-color: @cardListBgColor;
            opacity: 0.8;
          }
        }
      }
      .answerKeys{
        text-align: center;
        margin-top:10px;
        &>span{
          cursor:pointer;
          display: inline-block;
          width: 200px;
          height:30px;
          line-height:30px;
          border-radius:15px;
          color:#fff;
          background-color: @cardTitleBgColor;
        }
        &>div{
          text-align: left;
          margin:10px 30px;
          padding: 10px 10px;
          border: 1px solid #000;
          max-height:200px;
          background-color: #fff;
          border-radius:10px;
          &>p{
            margin-bottom:10px;
          }
        }
      }
      .commit{
        width:100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
</style>
