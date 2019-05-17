<template>
  <div class="score">
    <system-title :showMenu="true" :showClose="true"></system-title>
    <el-row class="scoreInfo">
      <el-col :span="6">&nbsp;</el-col>
      <el-col class="scoreTime" :span="3">
        <div>
          <span>{{useTime}}</span>
          <span>测试用时</span>
        </div>
      </el-col>
      <el-col :span="6" class="scoreProgress">
        <el-progress type="circle" :percentage="Number(score)" :width="160" color="#ea5514" status="text">{{score}}</el-progress>
        <span :class="scoreClass"></span>
      </el-col>
      <el-col class="scoreAccuracy" :span="3">
        <div>
          <span>{{correctRate}}</span>
          <span>正确率</span>
        </div>
      </el-col>
      <el-col :span="6">&nbsp;</el-col>
    </el-row>
    <div class="middleSide clearfix">
      <div class="leftSideInfo">
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
      </div>
      <div class="whiteLine"></div>
      <div class="levelPie">
        <pie
          :scoreLevel="evaluation"
          :awareness="(awareness * 100)"
          :knowledge="(knowledge * 100)"
          :skill="(skill * 100)"></pie>
      </div>
    </div>
    <div class="testFoot">
      <el-row>
        <el-col :span="12">
          <button class="saveShare" @click="saveShare">保存分享</button>
        </el-col>
        <el-col :span="12">
          <button class="showWrong" @click="showWrong">查看错题</button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import systemTitle from '@/components/title'
  import html2canvas from 'html2canvas';
  import pie  from '../data/pie'
  import { mapState } from 'vuex'
  export default {
    name: 'score',
    data () {
      return {
        score : '',
        correctRate: '',
        useTime: 0,
        skill: 0.01,
        knowledge: 0.01,
        awareness: 0.01,
        evaluation: 'D',
        curWrongQuestions: ''
      }
    },
    methods: {
      saveShare() {
        console.log('保存分享');
        html2canvas(document.body).then(function(canvas) {
          console.log(canvas);
          //获取年月日作为文件名
          var timers=new Date();
          var fullYear=timers.getFullYear();
          var month=timers.getMonth()+1;
          var date=timers.getDate();
          var randoms=Math.random()+'';
          //年月日加上随机数
          var numberFileName=fullYear+''+month+date+randoms.slice(3,10);
          var imgData=canvas.toDataURL();
          //保存图片
          var saveFile = function(data, filename){
            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = data;
            save_link.download = filename;

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
          };
          //最终文件名+文件格式
          var filename = numberFileName + '.png';
          saveFile(imgData,filename);
        });
      },
      showWrong() {
        this.$router.push({name: 'wrongPage', params: {code: this.curWrongQuestions}})
      }
    },
    computed: {...mapState({
      userName: state => state.student.name,
      userSex: state => state.student.sex,
      userGrade: state => state.student.grade,
      studentNumber: state => state.student.studentNumber,
      userSchool: state => state.student.school
    }),
    scoreClass() {
      var cal = '';
      if (this.score >= 90) {
        cal = 'scoreAA'
      } else if (this.score < 90 && this.score >= 80) {
        cal = 'scoreA'
      } else if (this.score < 80 && this.score >= 70) {
        cal = 'scoreB'
      } else if (this.score < 70 && this.score >= 60) {
        cal = 'scoreC'
      } else {
        cal = 'scoreD'
      }
      return cal
    }
    },
    components: {
      systemTitle, pie
    },
    created(){
      var testScore = this.$route.params.testScore;
      var testScoreObj = testScore ? JSON.parse(this.$route.params.testScore):null;
      this.curWrongQuestions = JSON.stringify(testScoreObj.wrongQuestions);
      this.score = testScoreObj ? testScoreObj['score']: 0;
      this.correctRate = testScoreObj ? testScoreObj['correctRate']: '--';
      this.useTime = testScoreObj ? (testScoreObj['useTime']/60).toFixed(1): '--';
      this.skill = testScoreObj ? testScoreObj['skill']: 0;
      this.knowledge = testScoreObj ? testScoreObj['knowledge']: 0;
      this.awareness = testScoreObj ? testScoreObj['awareness']: 0;
      this.evaluation = testScoreObj ? testScoreObj['evaluation']: '--';
    }
  }
</script>
<style scoped lang="less">
  @import "~@/assets/styles/variable.less";
  .score{
    height:100%;
    background-image: url('../../assets/images/noticeBg.png');
    background-size:100% 100%;
    text-align: center;
    position: relative;
    .systemTitle {
      text-align: left;
    }
  }
  .scoreInfo{
    margin-top: 30px;
    .scoreProgress{
      text-align: center;
      position:relative;
      &>span{
        display: inline-block;
        width:300px;
        height: 24px;
        background-image: url('../../assets/images/WechatIMG8.png');
        background-size:100%;
        position: absolute;
        bottom: -30px;
        left:50%;
        transform: translate(-50%, 0);
        &.scoreAA{
          background-position: 0 0;
        }
        &.scoreA{
          background-position: 0 -28px;
        }
        &.scoreB{
          background-position: 0 -54px;
        }
        &.scoreC{
          background-position: 0 -80px;
        }
        &.scoreD{
          background-position: 0 -106px;
        }
      }
    }
    .scoreAccuracy,.scoreTime{
      position:relative;
      height:160px;
      &>div{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        &>span{
          &:first-child{
            font-size:42px;
            color:@noticePaneColor;
          }
          &:last-child{
            display:block;
            padding:2px 5px;
            border:1px solid #000;
            border-radius:10px;
            font-size:12px;
            text-align: center;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .middleSide{
    margin-top: 100px;
    padding: 10px;
    height: 200px;
    width:760px;
    display:inline-block;
    opacity: 0.7;
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: @cardTitleBgColor;
    &>div{
      float:left;
    }
    .leftSideInfo{
      width:calc(~"50% - 2px");
      .userInfo{
        margin-top: 20px;
        padding: 0 30px;
        text-align: left;
        .el-row{
          height:100%;
          img{
            width:100px;
            height:100px;
          }
        }
        ul{
          /*padding-left:20px;*/
          /*margin-top:16px;*/
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
    }
    .whiteLine{
      height:100%;
      width: 2px;
      background-color: #fff;
      opacity: 0.7;
    }
    .levelPie{
      width:50%;
    }
  }
  .testFoot{
    width: 100%;
    text-align: center;
    position:absolute;
    bottom: 0;
    left: 0;
    height: 120px;
    button{
      width:100px;
      height:30px;
      color:#fff;
      .rad7;
      background-color:@cardTitleBgColor;
      font-size: 16px;
      &.saveShare{background: linear-gradient(#2d79b4, #3e82de);}
      &.showWrong{background: linear-gradient(#f7ab00, #f08200);}
    }
  }
</style>
