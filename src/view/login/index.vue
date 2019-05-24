<template>
  <div class="loginPage">
    <img class="backgroundImg" src="@/assets/images/background.jpg" alt="login">
    <img class="systemNameImg" src="@/assets/images/systemName.png" alt="systemName">
    <div class="loginBox">
      <img src="@/assets/images/login-1.jpg" alt="loginBox">
      <div class="clearfix cardTitle">
        <div :class="active === 'student'? 'active': ''"
             @click="active = 'student'"><img src="@/assets/images/studentLogin.jpg" alt=""></div>
        <div :class="active === 'student'? '': 'active'"
             @click="active = 'admin'"><img src="@/assets/images/teacherLogin.jpg" alt=""></div>
      </div>
      <ul>
        <li>
          <el-input v-model="userName" placeholder="请输入姓名"></el-input>
          <img src="@/assets/images/login-6.png" alt="">
        </li>
        <li>
          <el-input v-if="active === 'student'" v-model="userCode" placeholder="请输入学号"></el-input>
          <el-input v-else type="password" v-model="userCode" placeholder="请输入密码"></el-input>
          <img src="@/assets/images/login-8.png" alt="">
        </li>
        <li>
          <el-button class="loginButton" @click="goLogin">登录</el-button>
        </li>
      </ul>
    </div>
    <div class="desc">
      <p>技术支持：中安华邦安全生产技术研究院</p>
      <p>
        互联网文化经营单位许可证号：京网文〔2016〕5796-758号  |  电信业务经营许可证：京B2-20170489  |  网站备案号:京ICP备16011828号-1   |   Tel：010-87952680（总机）  |  Email:chipont@chipont.com.cn
      </p>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {
        userName: '',
        userCode: '',
        active: 'student'
      }
    },
    methods: {
      goLogin() {
        if (this.active === 'student') {
          this.$store.dispatch('Login', {name: this.userName, studentNumber: this.userCode}).then(() => {
            this.$router.push({path: '/data'})
          })
        } else {
          console.log(this.userCode)
          this.$store.dispatch('TLogin', {name: this.userName, pwd: this.userCode}).then(() => {
            this.$router.push({path: '/teacher'})
          })
        }
        }
    }
  }
</script>
<style scoped lang="less">
  @import "~@/assets/styles/variable.less";
  .loginPage {
    height: 100%;
    position: relative;
    background-color: @loginBgColor;
    .backgroundImg {
      position: absolute;
      width:50%;
      top: 50px;
      left:50px;
    }
    .systemNameImg {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 45%;
    }
    .loginBox{
      width: 500px;
      height: 360px;
      position: absolute;
      top: 50%;
      right: 50px;
      transform: translate(0, -50%);
      &>div.cardTitle{
        position: absolute;
        top:19px;
        left:22px;
        width:454px;
        height:48px;
        text-align: center;
        &>div{
          float:left;
          width: 50%;
          height:100%;
          background-color: @loginTitleBgColor;
          &.active{
            background-color: transparent;
          }
        }
        img{
          margin-top:12px;
          width:60px;
        }
      }
      &>img{
        width: 100%;
        height: 100%;
      }
      ul{
          position: absolute;
          top:55%;
          left:50%;
          transform:translate(-50%, -50%);
          li{
            position:relative;
            margin-bottom:24px;
            width:300px;
            .el-input+img{
              position: absolute;
              top: 10px;
              left:6px;
            }
            .el-button{
              width: 100%;
              height: 40px;
              line-height:40px;
              padding:0;
              color:#fff;
              border-radius: 8px;
              &.loginButton{
                background: linear-gradient( #88dfff,#1e88ff);
              }
            }
          }
        }
    }
    .desc{
      position:absolute;
      bottom:10px;
      left:0;
      font-size:10px;
      text-align: center;
      width:100%;
    }
  }
</style>
<style>
  .loginBox li .el-input input{
    padding-left:28px;
  }
</style>
