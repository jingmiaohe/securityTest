<template>
  <div class="systemTitle">
    <img src="@/assets/images/systemTitle.png" alt="">
    <!--<button @click="goTest">开始测评</button>-->
      <ul>
        <li>
          <el-tooltip content="消息通知" effect="light" v-show="showMessage">
            <el-badge :value="noticeNum" style="height:24px;line-height:24px;">
              <i class="el-icon-message"  @click="handleClickMess"></i>
            </el-badge>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip content="回到主页" effect="light" v-show="showMenu">
            <i class="el-icon-menu"  @click="handleClickMenu"></i>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip content="退出登录" effect="light" v-show="showClose">
            <i class="el-icon-circle-close"  @click="handleClickClose"></i>
          </el-tooltip>
        </li>

      </ul>
  </div>
</template>

<script>
  import { checkNotice } from '@/api/bank'
  export default {
    name: 'systemTitle',
    data () {
      return {
        noticeNum: 0
      }
    },
    props: {
      showMessage: {
        type: Boolean,
        default: false
      },
      showMenu: {
        type: Boolean,
        default: false
      },
      showClose: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClickMess() {
        var that  = this;
        checkNotice().then(res => {
          var data = res.data;
          var len = data.length;
          var ulHtml = '';
          that.noticeNum = len;
          for(var i = 0; i<len; i++) {
            console.log(ulHtml)
            ulHtml += '<li>'+data[i]['content']+'</li>'
          }
          if (len > 0) {
            that.$notify({
              title: '公 告',
              dangerouslyUseHTMLString: true,
              message: ulHtml
            });
          }
        })
      },
      handleClickMenu() {
        if(this.$route.meta['role'] === 'student') {
          this.$router.push('/data')
        } else if (this.$route.meta['role'] === 'admin') {
          this.$router.push('/teacher')
        }
      },
      handleClickClose() {
        if(this.$route.meta['role'] === 'student') {
          this.$store.dispatch('LogOut').then(() => {
            this.$router.push({path: '/login'});
          })
        } else if (this.$route.meta['role'] === 'admin') {
          this.$store.dispatch('TLogOut').then(() => {
            this.$router.push({path: '/login'});
          })
        }

    }
  },
    created() {
      if (this.$route.name === 'data') {
        this.handleClickMess();
      }
    }
  }
</script>
<style scoped lang="less">
  .systemTitle{
    background: linear-gradient(#2d7bb1, #2b6ac8);
    height:60px;
    line-height:60px;
    img{
      height:30px;
      vertical-align: middle;
    }
    ul{
      float:right;
      li{
        display: inline-block;
        .el-badge.el-tooltip{
          margin-right:30px;
        }
      }
      i{
        margin: 0 20px;
        font-size: 1.5em;
        vertical-align: middle;
        color:#fff;
        &.el-icon-message{
          margin-right: 10px;
        }
      }
    }

  }
</style>
