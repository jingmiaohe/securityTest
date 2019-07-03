<template>
  <div style="height:100%;">
    <system-title :showMessage="true" :showClose="true"></system-title>
    <div class="dataPage">
      <el-row :gutter="20" style="height:100%;">
        <el-col :span="16"  style="height:100%;">
          <el-row :gutter="20" style="height:30%;padding-bottom:20px;">
            <el-col :span="12" style="height:100%;">
              <div class="userInfo">
                <!---->
                <el-row>
                  <el-col :span="8" style="height:100%;overflow: hidden;padding:20px;">
                    <img v-if="userSex === '女'" src="@/assets/images/userAvatarWomen.jpg" alt="头像">
                    <img v-else src="@/assets/images/userAvatar.png" alt="头像">
                  </el-col>
                  <el-col :span="16" style="height:100%;overflow: hidden">
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
            </el-col>
            <el-col :span="12" style="height:100%;">
              <div class="chartPie">
                <span>安全等级</span>
                <pie
                  :scoreLevel="studentData?studentData['scoreLevel']:'0'"
                  :awareness="studentData?studentData['awareness']:0"
                  :knowledge="studentData?studentData['knowledge']:0"
                  :skill="studentData?studentData['skill']:0"></pie>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="height:40%;padding-bottom:20px;">
            <el-col :span="8" style="height:100%;">
              <div class="test" @click="goNotice">
                <img src="@/assets/images/test.png" alt="">
              </div>
            </el-col>
            <el-col :span="8" style="height:100%;">
              <div class="test" @click="goPractice">
                <img src="@/assets/images/exercise.png" alt="">
                <div>
                  <!--<span>1206</span>&nbsp;/-->
                  <!--<span>3000</span>题-->
                </div>
              </div>
            </el-col>
            <el-col :span="8" style="height:100%;">
              <div class="test" @click="goWrongPage">
                <img src="@/assets/images/wrong.png" alt="">
                <div>
                  <!--<span>1206</span>&nbsp;/-->
                  <!--<span>3000</span>题-->
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row style="height:30%;">
            <div class="statistics">
              <div>测试数据</div>
              <ul class="clearfix">
                <li>
                  <div>
                    <span>{{studentData?studentData['todayAnswerNumber']:'--'}}</span>道
                    <span>今日答题</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{studentData?studentData['totalAnswerNumber']:'--'}}</span>道
                    <span>累计答题</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{studentData?studentData['correctRate']:'--'}}</span>%
                    <span>正确率</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{studentData?studentData['averageUserTime']:'--'}}</span>min
                    <span>平均用时</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>{{studentData?studentData['bestScore']:'--'}}</span>分
                    <span>历史最好成绩</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-row>
        </el-col>
        <el-col :span="8"  style="height:100%;" class="rightSide">
          <el-row style="height:50%; padding-bottom: 20px;">
            <div class="group">
              <div class="title">
                <span>成长趋势</span>
                <p style="float:right;margin-right:10px;">
                  <span :class="isMonth?'active':''" @click="goChooseMonthData">月</span>
                  <span :class="isMonth?'':'active'" @click="goChooseDayData">日</span>
                </p>
              </div>
              <div>
                <double-line :lineDataStr = "lineDataStr" :isMonth="isMonth"></double-line>
              </div>
            </div>
          </el-row>
          <el-row style="height:50%;">
            <div class="rank">
              <div class="title">排行榜</div>
              <div>
                <ul class="clearfix">
                  <li style="width:16%;">排名</li>
                  <li style="width:22%;">姓名</li>
                  <li style="width:28%;">班级</li>
                  <li style="width:18%;">正确率</li>
                  <li style="width:16%;">趋势</li>
                </ul>
                <div>
                  <ul  class="clearfix" v-if="rankData.length === 0 || rankData[0]['name'] === null">
                    <li class="noRankData" style="width:100%;">暂无考试排行数据</li>
                  </ul>
                  <ul v-else class="clearfix" v-for="item in rankData">
                    <li style="width:16%;">
                      <img class="rankImg" v-if="item.rank === 1" src="@/assets/images/no1.png" alt="">
                      <img class="rankImg" v-if="item.rank === 2" src="@/assets/images/no2.png" alt="">
                      <img class="rankImg" v-if="item.rank === 3" src="@/assets/images/no3.png" alt="">
                      <span v-if="item.rank !== 1 && item.rank !== 2 && item.rank !== 3">{{item.rank}}</span>
                    </li>
                    <li style="width:22%;">{{item.name}}</li>
                    <li style="width:28%;">{{item.grade}}</li>
                    <li style="width:18%;">{{item.accuracy}}</li>
                    <li style="width:16%;">
                      <img class="trendImg" v-if="item.trend === 1" src="@/assets/images/red.png" alt="">
                      <img class="trendImg" v-if="item.trend === 0" src="@/assets/images/gray.png" alt="">
                      <span v-if="item.trend === 2">--</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import systemTitle from '@/components/title'
  import { mapState } from 'vuex'
  import { DaySeries,MonthSeries, rank } from '@/api/data'
  import pie  from './pie'
  import doubleLine  from './line'
  export default {
    name: 'overview',
    data () {
      return {
        rankData: [],
        lineDataStr: '',
        isMonth: true
      }
    },
    computed: mapState({
      userName: state => state.student.name,
      userSex: state => state.student.sex,
      userGrade: state => state.student.grade,
      studentNumber: state => state.student.studentNumber,
      userSchool: state => state.student.school,
      studentData: state => state.student.studentData
    }),
    components: {
      pie, doubleLine, systemTitle
    },
    methods: {
      goNotice(){
        this.$router.push({path: '/notice'})
      },
      goPractice() {
        this.$router.push({'name': 'test', params:{code: 'exercise'}})
      },
      goWrongPage() {
        this.$router.push({name: 'wrongPage', params: {code: 'all'}})
      },
      goChooseMonthData() {
        this.isMonth = true;
        MonthSeries().then(res => {
          this.lineDataStr = JSON.stringify(res.data);
        })
      },
      goChooseDayData() {
        this.isMonth = false;
        DaySeries().then(res => {
          this.lineDataStr = JSON.stringify(res.data);
        })
      }
    },
    created() {
      rank().then(res => {
        this.rankData = res.data.rankData;
      })
      MonthSeries().then(res => {
        this.lineDataStr = JSON.stringify(res.data);
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "~@/assets/styles/variable.less";
  .dataPage {
    height: calc(~"100% - 60px");
    padding:30px;
    background-color:@bgBlue;
    .userInfo , .chartPie, .test, .statistics{
      /*height:200px;*/
      height:100%;
      background-color: #fff;
      .rad;
      img{
        width: 100%;
        height: 100%
      }
    }
    .test{
      height:224px;
    }
    .userInfo{
      .el-row{
        height:100%;
        padding:20px 30px;
      }
      ul{
        padding-left:20px;
        margin-top:16px;
      li{
        font-size: 14px;
        line-height:24px;
        white-space:nowrap;
        &:first-child{
          border-bottom: 1px solid red;
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
    .chartPie{
      position:relative;
      span{
        position:absolute;
        top: 10px;
        left: 20px;
      }
    }
    .test{
      position:relative;
      transition: all 0.4s;
      height:100%;
      &:hover{
        transform: scale(1.05);
      }
      &>div{
        position:absolute;
        right:10px;
        bottom:10px;
        color:#fff;
        &>span:first-child{
          font-weight: bold;
          font-size:20px;
        }
      }
    }
    .statistics{
      &>div{
        height:38px;
        line-height:38px;
        padding-left:20px;
        border-bottom:1px solid #ddd;
      }
      ul{
        height:calc(~"100% - 38px");
        white-space: nowrap;
        li{
          display:inline-block;
          width:20%;
          height:100%;
          float:left;
          position:relative;
          &>div{
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            text-align: center;
            &>span{
            &:first-child{
              font-size:42px;
            }
              &:last-child{
                display:block;
                width: 84px;
                padding:2px 5px;
                border:1px solid #ddd;
                border-radius:10px;
                font-size:12px;
                text-align: center;
              }
          }
          }
        }
      }
    }
    .rank, .group{
      height: 100%;
      background-color: #fff;
      .rad;
      .title{
        text-align: center;
        border-bottom: 1px solid #ddd;
        height:36px;
        line-height:36px;
        p{
          span{
            cursor:pointer;
            color:@bgBlue;
            &.active{
              color:black;
            }
          }
        }
      }
    }
    .group{
      &>div:last-child{
        height: calc(~"100% - 36px");
      }
    }
    .rightSide{
      height: 664px;
      .el-row {
        height: calc(~"50% - 10px");
      }
      .rank{
        .title{
          font-size: 14px;
        }
        &>div:nth-child(2){
          margin:0 20px;
          height: calc(~"100% - 36px");
          text-align: center;
          &>ul{
            font-size: 13px;
            li{
              height:32px;
              line-height:32px;
            }
          }
          &>div{
            border:1px solid #ddd;
            font-size:12px;
            line-height: 23px;
            border-radius: 5px;
            height: calc(~"100% - 52px");
            box-sizing:border-box;
            &>ul{
              height:10%;
              line-height: 100%;
              &>li{
                height:100%;
                display:flex;
                align-items:center;/*垂直居中*/
                justify-content: center;/*水平居中*/
              }
            }
          }
          li{
            float:left;
            width: 20%;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        img{
          vertical-align: middle;
          &.rankImg{
            width:20px;
            height:20px;
          }
          &.trendImg{
            width:10px;
            height:15px;
          }
        }
      }
    }
  }
</style>
