<template>
<div class="manageModule">
  <system-title :showClose="true"></system-title>
  <div class="teacherModuleContent">
    <div class="teacherInfo clearfix">
      <span class="leftSide">
        <img src="../../assets/images/userAvatar.png" alt="">
      </span>
      <ul class="rightSide">
       <li>
         <span>欢迎您，耿耿星河！</span>
         <el-button type="primary">个人中心</el-button>
       </li>
        <li>
          <el-row>
            <el-col :span="6">
              学校：xxx
            </el-col>
            <el-col :span="6">
              职务：xxx
            </el-col>
            <el-col :span="6">
              教育宣言：xxx
            </el-col>
            <el-col :span="6">
              权限：xxx
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <ul class="teacherModuleEntry">
      <li><div class="studentModule" @click="goStudentBank">
        <div>
          <span></span>
          <p>&nbsp;</p>
          <span></span>
        </div>
      </div></li>
      <li><div class="questionModule" @click="goQuestionBank">
        <div>
          <span></span>
          <p>&nbsp;</p>
          <span></span>
        </div>
      </div></li>
      <li><div class="noticeModule" @click="goNoticeBank">
        <div>
          <span></span>
          <p>&nbsp;</p>
          <span></span>
        </div>
      </div></li>
    </ul>
  </div>
</div>
</template>

<script>
  import systemTitle from '@/components/title'
export default {
  name: '',
  data(){
    return {
    }
  },
  components: {
    systemTitle
  },
  methods: {
    goStudentBank() {
      this.$router.push({name: 'studentBank'})
    },
    goQuestionBank() {
      this.$router.push({name: 'questionBank'})
    },
    goNoticeBank() {
      this.$router.push({name: 'noticeBank'})
    }
  }
}
</script>
<style lang="less" scoped>
  @import "~@/assets/styles/variable.less";
  .manageModule{
    height:100%;
    .teacherModuleContent{
      padding: 30px;
      height:calc(~"100% - 60px");
      .teacherInfo{
        &>span,&>ul{
          float: left;
        }
          .leftSide{
            display: block;
            width:80px;
            height:80px;
            border-radius: 50%;
            img{
              height:80px;
              width:80px;
            }
          }
          .rightSide{
            width: calc(~"100% - 80px");
            padding-left: 20px;
            margin-top:14px;
            .el-button{
              float:right;
              padding: 3px 10px;
            }
            &>li{
              &:first-child{
                border-bottom: 1px solid black;
                &>span{
                    font-size:20px;
                }
              }
              &:last-child{
                line-height:30px;
              }
            }
          }
      }

      .teacherModuleEntry{
        width: 100%;
        &>li{
          width: 33%;
          float:left;
          padding:20px;
          &>div{
            border-radius: 6px;
            min-height:200px;
            position:relative;
            &:hover{
              cursor: pointer;
            }
            &>div{
              text-align: center;
              position:absolute;
              top:50%;
              left:50%;
              transform: translate(-50%, -50%);
              &>span:first-child{
                display: inline-block;
                width:92px;
                height:92px;
                background-image: url('../../assets/images/teacherModuleIcon.jpg');
              }
              &>span:last-child{
                display: inline-block;
                width:170px;
                height:40px;
                background-image: url('../../assets/images/teacherModuleFont.jpg');
              }
            }
          }
            .studentModule{
              background-color: @studentModuleBgColor;
              &>div{
                &>span:first-child{
                  background-position: -6px -7px;
                }
                &>span:last-child{
                  background-position: -3px -5px;
                }
              }

            }
            .questionModule{
              background-color: @questionModuleBgColor;
              &>div{
              &>span:first-child{
              background-position: -105px -7px;
            }
              &>span:last-child{
                background-position: -172px -5px;
              }
            }
            }
            .noticeModule{
              background-color: @noticeModuleBgColor;
              &>div{
                &>span:first-child{
                  background-position: -105px -103px;
                }
                &>span:last-child{
                  background-position: -3px -88px;
                }
              }
            }

        }
      }
    }
  }
</style>

