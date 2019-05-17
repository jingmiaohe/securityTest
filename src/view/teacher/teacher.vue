<template>
  <div class="teacherView">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="学生信息" name="first">
        <div class="upLoad">
          <el-button size="mini" type="primary" plain>下载模版</el-button>
          <el-button size="mini" type="primary" plain>上传</el-button>
          <el-button size="mini" type="primary" plain>添加</el-button>
        </div>
        <el-table
          :data="studentData"
          border
          style="width: 100%">
          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="学号"
            prop="studentId">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="sex">
          </el-table-column>
          <el-table-column
            label="班级"
            prop="grade">
          </el-table-column>
          <el-table-column
            label="学校"
            prop="school">
          </el-table-column>
          <el-table-column
            fixed="right"
            width="100"
            label="操作">
            <template scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button @click="handleClick(scope.row)" size="mini"
                         type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="题目信息" name="second">
        <div class="upLoad">
          <el-button size="mini" type="primary" plain>下载模版</el-button>
          <el-button size="mini" type="primary" plain>上传</el-button>
          <el-button size="mini" type="primary" plain>添加</el-button>
        </div>
        <el-table :data="exerciseData"
                  border>
          <el-table-column label="题目类型"
                           prop="exerciseType">
          </el-table-column>
          <el-table-column label="题目标题">
            <el-table-column label="题目内容"
                             prop="title">
            </el-table-column>
            <el-table-column label="图片地址"
                             prop="titleImg">
            </el-table-column>
          </el-table-column>

          <el-table-column label="A选项">
            <el-table-column label="A选项内容"
                             prop="optionA">
            </el-table-column>
            <el-table-column label="图片地址"
                             prop="optionAImg">
            </el-table-column>
          </el-table-column>

          <el-table-column label="B选项">
            <el-table-column label="B选项内容"
                             prop="optionB">
            </el-table-column>
            <el-table-column label="图片地址"
                             prop="optionBImg">
            </el-table-column>
          </el-table-column>

          <el-table-column label="C选项">
            <el-table-column label="C选项内容"
                             prop="optionC">
            </el-table-column>
            <el-table-column label="图片地址"
                             prop="optionCImg">
            </el-table-column>
          </el-table-column>

          <el-table-column label="D选项">
            <el-table-column label="D选项内容"
                             prop="optionD">
            </el-table-column>
            <el-table-column label="图片地址"
                             prop="optionDImg">
            </el-table-column>
          </el-table-column>


            <el-table-column label="答案"
                             prop="answer">
            </el-table-column>

          <el-table-column
            fixed="right"
            width="100"
            label="操作">
            <template scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button @click="handleClick(scope.row)" size="mini"
                         type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: '',
  data(){
    return {
      studentData: [
        {name: '华', studentId: '11111111111',sex: '男', grade: '五年级二班', school: 'xxx学校'},
      ],
      exerciseData:[
        { exerciseType: '图文选择题',
          title: '测试1测试1测试1测试1？',
          titleImg: '--',
          optionA: 'aaaaaaaaaaa',
          optionAImg: 'aaaaaaaaaaa',
          optionB: 'aaaaaaaaaaa',
          optionBImg: 'aaaaaaaaaaa',
          optionC: 'aaaaaaaaaaa',
          optionCImg: 'aaaaaaaaaaa',
          optionD: 'aaaaaaaaaaa',
          optionDImg: 'aaaaaaaaaaa',
          answer: 'A,B'
        }
      ],
      activeName: 'first'
    }
  }
}
</script>
<style lang="less" scoped>
  .teacherView{
    padding-top:10px;
    height: 100%;
    box-sizing: border-box;
    .el-tabs.el-tabs--top.el-tabs--border-card{
      height: 100%;
    }
    .el-tab-pane{
      padding: 0 20px;
    }
    .upLoad{
      text-align: right;
      margin-bottom:10px;
    }
  }
</style>
<style  lang="less">
  .teacherView{
    /*.el-tabs__nav{*/
      /*padding-left:10px;*/
    /*}*/
    padding:10px;
  }
</style>

