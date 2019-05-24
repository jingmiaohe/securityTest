<template>
  <div class="questionContent">
    <div class="questionTitle">
      {{number+1}}、{{question.questionText}}&nbsp;（{{questionWeighting}}分）
      <br><br style="line-height:5px;">
      <img v-if="question.type === 3" :src="question.questionRich" alt="">
      <img v-if="question.questionRich && (question.type === 4 || question.type === 5)" :src="question.questionRich" alt="">
      <video-player class="video-player vjs-custom-skin"
                    style="width:500px;display:inline-block"
                    v-if="question.type === 6 || question.type === 7"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions(question.questionRich)"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)">
      </video-player>
    </div>
    <ul v-if="question.type === 0 || question.type === 3" class="questionOption optionJudge">
      <li><button :class="choosedButtonClass('正确')" @click="chooseAnswer('正确',question.id)">正确</button></li>
      <li><button :class="choosedButtonClass('错误')" @click="chooseAnswer('错误',question.id)">错误</button></li>
    </ul>
    <ul v-if="question.type === 1 || question.type === 2" class="questionOption optionCol">
      <li><button :class="choosedButtonClass('A')" @click="chooseAnswer('A',question.id)">A、{{question.option1Text}}</button></li>
      <li><button :class="choosedButtonClass('B')" @click="chooseAnswer('B',question.id)">B、{{question.option2Text}}</button></li>
      <li><button :class="choosedButtonClass('C')" @click="chooseAnswer('C',question.id)">C、{{question.option3Text}}</button></li>
      <li v-if="question.option4Text"><button :class="choosedButtonClass('D')" @click="chooseAnswer('D',question.id)">D、{{question.option4Text}}</button></li>
    </ul>
    <ul v-if="question.type === 6 || question.type === 7 || question.type === 4 || question.type === 5"
        class="questionOption optionRow clearfix">
      <li>
        <img v-if="question.option1Rich && (question.type === 4 || question.type === 5)" :src="question.option1Rich" alt="">
        <br v-if="question.option1Rich && (question.type === 4 || question.type === 5)">
        <button :class="choosedButtonClass('A')"
                @click="chooseAnswer('A',question.id)">A、{{question.option1Text}}</button>
      </li>
      <li>
        <img v-if="question.option2Rich && (question.type === 4 || question.type === 5)" :src="question.option2Rich" alt="">
        <br v-if="question.option2Rich && (question.type === 4 || question.type === 5)">
        <button :class="choosedButtonClass('B')"
                @click="chooseAnswer('B',question.id)">B、{{question.option2Text}}</button></li>
      <li>
        <img v-if="question.option3Rich && (question.type === 4 || question.type === 5)" :src="question.option3Rich" alt="">
        <br v-if="question.option3Rich && (question.type === 4 || question.type === 5)">
        <button :class="choosedButtonClass('C')"
                @click="chooseAnswer('C',question.id)">C、{{question.option3Text}}</button></li>
      <li v-if="question.option4Text">
        <img v-if="question.option4Rich && (question.type === 4 || question.type === 5)" :src="question.option4Rich" alt="">
        <br v-if="question.option4Rich && (question.type === 4 || question.type === 5)">
        <button :class="choosedButtonClass('D')"
                @click="chooseAnswer('D',question.id)">D、{{question.option4Text}}</button>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'questionComp',
    data () {
      return {
        curAnswer: '',
        isSingleSelect: true,  // 是不是单选
        questionWeighting: 0,  // 题目分值
        questionTypeDesc: '', // 题目类型描述
        options: {
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // ZAI<video>加载元素后是否应该开始下载视频数据。auto立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，值应该代表一个比例 - 用冒号分隔的两个数字
          fluid: true, // 当true时，换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: 'video/mp4',
            src: ''
          }],
          poster: '',
          notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        }
      }
    },
    props: {
      question: {
        type: Object,
        default: {}
      },
      number: {
        type: Number,
        default: 0
      },
      oldAns: {
        type: String,
        default: ''
      }
    },
    methods: {
      chooseAnswer(option, id) {
        var that = this;
        if(that.isSingleSelect) {
          that.curAnswer = option;
        } else {
          var arr = that.curAnswer === '' ? [] : that.curAnswer.split(',');
          var index = arr.findIndex(function (item) {
            return option === item;
          })
          if (index > -1) {
            arr.splice(index, 1);
          } else {
            arr.push(option);
          }
          that.curAnswer = arr.join(',');
        }
        that.$emit('resetCurAnswer', that.curAnswer)
      },
      onPlayerPlay() {},
      onPlayerPause() {}
    },
    computed: {
      choosedButtonClass() {
        return function(option) {
          return this.curAnswer.indexOf(option) > -1 ? 'choosed': ''
        }
      },
      playerOptions(){
        var that = this;
        return function(rich) {
          that.options.sources[0].src = rich;
          return that.options;
        }
        }
      },
    watch: {
      oldAns:{
        immediate:true,
          handler:function(val, oldVal){
            this.curAnswer = val;
        }
      }
    },
    mounted() {
      var questionType = this.question['type'];
      switch(questionType) {
        case 0:
          this.questionTypeDesc = '文字判断题';
          this.questionWeighting = 4;
          this.isSingleSelect = true;
          break;
        case 1:
          this.questionTypeDesc = '文字选择题（单选）';
          this.questionWeighting = 4;
          this.isSingleSelect = true;
          break;
        case 2:
          this.questionTypeDesc = '文字选择题（多选）';
          this.questionWeighting = 4;
          this.isSingleSelect = false;
          break;
        case 3:
          this.questionTypeDesc = '图片判断题';
          this.questionWeighting = 6;
          this.isSingleSelect = true;
          break;
        case 4:
          this.questionTypeDesc = '图片选择题（单选）';
          this.questionWeighting = 7;
          this.isSingleSelect = true;
          break;
        case 5:
          this.questionTypeDesc = '图片选择题（多选）';
          this.questionWeighting = 7;
          this.isSingleSelect = false;
          break;
        case 6:
          this.questionTypeDesc = '视频选择题（单选）';
          this.questionWeighting = 10;
          this.isSingleSelect = true;
          break;
        case 7:
          this.questionTypeDesc = '视频选择题（多选）';
          this.questionWeighting = 10;
          this.isSingleSelect = false;
          break;
      }
      this.$emit('resetQuestionWeighting', this.questionWeighting)
      this.$emit('resetQuestionTypeDesc', this.questionTypeDesc)
    }
  }
</script>
<style scoped lang="less">
  @import "~@/assets/styles/variable.less";
  .questionContent{
    margin-top:20px;
    min-height: 100px;
    /*max-height: calc(~"100% - 240px");*/
    width:100%;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    padding: 0 20px;
    z-index:10;
    .questionTitle{
      font-weight: bold;
      margin-bottom:20px;
      text-align: center;
      img{
        margin-top: 20px;
        max-height:300px;
      }
    }
    .questionOption{
      li{
        text-align: center;
        /*max-height: 300px;*/
      }
      button{
        min-height:40px;
        background: linear-gradient(#fff, #c8c8c8);
        .rad7;
        font-size:14px;
        line-height:30px;
        &.choosed{
          /*<!--background:linear-gradient(@cardTitleBgColor, @noticePaneColor);-->*/
          background:@cardTitleBgColor;
          color:#fff;
        }
        &:hover{
          /*<!--background:linear-gradient(@cardTitleBgColor, @noticePaneColor);-->*/
          background:@cardTitleBgColor;
          opacity: 0.8;
          color:#fff;
        }
        &:active{
          background:@cardTitleBgColor;
          opacity: 1;
          color:#fff;
        }
      }
      &.optionJudge{
        li{
          margin-bottom: 24px;
          button{
            width: 180px;
          }
        }
      }
      &.optionCol{
        li{
          margin-top: 20px;
          button{
            width:300px;

          }
        }
      }
      &.optionRow{
        li{
          margin-top: 10px;
          float: left;
          width:50%;
          button{
            max-width:360px;
            width:calc(~"100% - 10px");
          }
          img{
            /*max-height:200px;*/
            /*max-width:200px;*/
            width:200px;
            height:150px;
            margin-bottom:10px
          }
        }
      }
    }
  }
</style>
