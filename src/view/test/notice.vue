<template>
  <div class="notice">
    <system-title :showClose="true" :showMenu="true"></system-title>
    <div class="noticePane">
      <div class="noticePaneTitle">
        <img src="@/assets/images/noticeTitle.png" alt="">
      </div>
      <div class="noticePaneContent">
        <P>
          <span>试卷名称</span>
          安全素质测评试卷（
          <span>{{userGrade.substring(0,3)}}</span>
          ）
        </P>
        <P>
          <span>试卷总分</span>
          100分
        </P>
        <P>
          <span>测评时长</span>
          30分钟
        </P>
        <div class="desc">
          <p>&nbsp;&nbsp;欢迎你参加本次安全测评，本次安全测评将从安全意识、安全知识、安全技能等三方面综合考评，
            测评结束后将为你生成专属安全报告。</p>
          <p>&nbsp;&nbsp;本次测评包含18道考题，点击确定后开始计时，你可以点通过“上一题”、“下一题”进行题目的切换，
          也可以点击屏幕右侧的答题卡切换到对应的题目。在完成所有题目后，请点击“交卷”按钮完成交卷。</p>
          <p>&nbsp;&nbsp;请你谨慎审题，认真作答。祝你测评愉快！</p>
        </div>
        <submit-btn text="开始测评" type="orange" @click="goTest"></submit-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import systemTitle from '@/components/title'
  import submitBtn from '@/components/submitBtn'
  export default {
    name: 'notice',
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        userGrade: state => state.student.grade
      })
    },
    methods: {
      goTest(){
        this.$router.push({'name': 'test',params:{code: 'test'}})
//        this.$router.push({'path': '/test',params:{code: 'exercise'}})
      }
    },
    components: {
      systemTitle, submitBtn
    }
  }
</script>

<style scoped lang="less">
  @import "~@/assets/styles/variable.less";
  .notice{
    position:relative;
    height:100%;
    background-color: @bgBlue;
    .noticePane{
      position:absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%, -50%);
      .noticePaneTitle{
        margin-bottom:30px;
        text-align: center;
        img{
          width:160px;
        }
      }
      .noticePaneContent{
        width: 710px;
        height: 440px;
        padding: 30px;
        background-color: rgba(241, 250, 255, 0.5);
        /*box-shadow:10px 10px 5px #6893b0;*/
        box-shadow:7px 7px 5px #7cb7de;
        .rad;
        &>p{
          margin-bottom: 10px;
          &>span:first-child{
            color:#fff;
            display:inline-block;
            padding:4px 20px;
            margin-right:10px;
            background: linear-gradient(#e06000, #f18b00);
            .rad;
          }
        }
        &>div.desc{
          line-height:30px;
          font-size:14px;
          margin-top:20px;
          color:@noticePaneColor;
          p{
            margin-bottom:16px;
          }
        }
      }
    }
  }

</style>
