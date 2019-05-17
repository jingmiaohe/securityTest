<template>
  <div class="submitBtn" @click="handleClick">
    <img v-if="type === 'orange'" src="@/assets/images/submit-orange.png" alt="">
    <img v-if="type === 'yellow'"src="@/assets/images/submit-yellow.png" alt="">
    <span>{{text}}</span>
  </div>
</template>

<script>
  export default {
    name: 'systemTitle',
    data () {
      return {
      }
    },
    props: {
      text: String,
      type: String
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>
<style scoped lang="less">
  div.submitBtn{
    text-align:center;
    position:relative;
    cursor: pointer;
    img{
      width:140px;
      height:54px;
    }
    span{
      position:absolute;
      top: 10px;
      left:50%;
      transform:translate(-50%, 0);
      color:#fff;
    }
  }
</style>
