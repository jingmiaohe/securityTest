<template>
  <div class="questionBank">
    <system-title :showMenu="true" :showClose="true"></system-title>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="题目信息" name="first">
        <div class="upLoad">
          <el-button size="mini" type="primary" plain @click="loadQusTem">下载模版</el-button>
          <el-select v-model="gradeVal" class="gradeChoice">
            <el-option
              v-for="item in options"
              :key="item.val"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
          <el-upload
            name="uploadFile"
            class="uploadDemo"
            action="/question/importExcel"
            :data="{'grade': gradeVal}"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess">
            <el-button size="mini" type="primary"  plain >点击上传</el-button>
          </el-upload>
          <el-button size="mini" type="primary" plain @click="addQus" style="display:none">添加</el-button>
        </div>
        <el-table :data="exerciseData"
                  border>
          <el-table-column label="题目类型"
                           width="160"
                           prop="exerciseType">
            <template slot-scope="scope">
              <span>{{getType(scope.row.type)}}</span>
            </template>
          </el-table-column>

          <el-table-column label="题目">
            <el-table-column label="题目"
                             width="240"
                             prop="questionText">
            </el-table-column>
            <el-table-column label="资源"
                             width="60">
              <template slot-scope="scope">
                <a v-if="scope.row.questionRich" target="_blank" :href="scope.row.questionRich">
                  <i class="el-icon-picture" style="font-size: 24px;"></i>
                </a>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="A选项">
            <el-table-column label="A选项"
                             width="260"
                             prop="option1Text">
            </el-table-column>
            <el-table-column label="资源"
                             width="60">
              <template slot-scope="scope">
                <a v-if="scope.row.option1Rich" target="_blank" :href="scope.row.option1Rich">
                  <i class="el-icon-picture" style="font-size: 24px;"></i>
                </a>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="B选项">
            <el-table-column label="B选项"
                             width="260"
                             prop="option2Text">
            </el-table-column>
            <el-table-column label="资源"
                             width="60">
              <template slot-scope="scope">
                <a v-if="scope.row.option2Rich" target="_blank" :href="scope.row.option2Rich">
                  <i class="el-icon-picture" style="font-size: 24px;"></i>
                </a>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="C选项">
            <el-table-column label="C选项"
                             width="260"
                             prop="option3Text">
            </el-table-column>
            <el-table-column label="资源"
                             width="60">
              <template slot-scope="scope">
                <a v-if="scope.row.option3Rich" target="_blank" :href="scope.row.option3Rich">
                  <i class="el-icon-picture" style="font-size: 24px;"></i>
                </a>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="D选项">
            <el-table-column label="D选项"
                             width="260"
                             prop="option4Text">
            </el-table-column>
            <el-table-column label="资源"
                             width="60">
              <template slot-scope="scope">
                <a v-if="scope.row.option4Rich" target="_blank" :href="scope.row.option4Rich">
                  <i class="el-icon-picture" style="font-size: 24px;"></i>
                </a>
                <span v-else>--</span>
              </template>
            </el-table-column>
          </el-table-column>

            <el-table-column label="答案"
                             width="100"
                             prop="answer">
            </el-table-column>

          <el-table-column label="答案解析"
                           width="280"
                           prop="analysis">
          </el-table-column>
          <el-table-column
            fixed="right"
            width="140"
            label="操作">
            <template slot-scope="scope">
              <el-upload
                name="uploadFile"
                class="uploadDemo"
                style="margin-right:10px;"
                action="/question/importVideo"
                :data="{'questionId': scope.row.id}"
                :show-file-list="false"
                :on-success="uploadVideoSuccess">
                <el-button size="mini" v-show="scope.row.type === 6 || scope.row.type === 7"
                           type="success" icon="el-icon-upload"  circle></el-button>
              </el-upload>

              <el-button @click="delQus(scope.row.id)" size="mini"
                         type="danger" icon="el-icon-delete"  circle></el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          :total="totalNum">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import file from '@/assets/file/qusTemplate.xlsx'
  import systemTitle from '@/components/title'
  import { checkQuestions, delQuestion } from '@/api/bank'
export default {
  name: '',
  data(){
    return {
      exerciseData:[],
      activeName: 'first',
      options: [
        {name:'一年级',val: 1 },
        {name:'二年级',val: 2 },
        {name:'三年级',val: 3 },
        {name:'四年级',val: 4 },
        {name:'五年级',val: 5 },
        {name:'六年级',val: 6 }
        ],
      gradeVal: '',
      currentPage: 1,
      totalNum: 0
    }
  },
  components: {
    systemTitle
  },
  methods: {
    loadQusTem() {
      console.log(file);
      location.href = file;
    },
    uploadSuccess(response, file, fileList) {
      this.gradeVal = '';
      if (response.status === -1) {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 5 * 1000
        })
      } else if (response.status === 0) {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        checkQuestions(this.currentPage, 10).then(res => {
          this.totalNum = res.data.total;
          this.exerciseData = res.data.rows;
        })
      }
    },
    uploadVideoSuccess(response, file, fileList) {
      if (response.status === -1) {
        this.$message({
          message: response.message,
          type: 'error',
          duration: 5 * 1000
        })
      } else if (response.status === 0) {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        checkQuestions(this.currentPage, 10).then(res => {
          this.totalNum = res.data.total;
          this.exerciseData = res.data.rows;
        })
      }
    },
    addQus() {
        // 添加 题库
    },
    editQus() {
      // 编辑 题库
    },
    delQus(id) {
      // 删除 题库
      delQuestion(id).then(res => {
        console.log('shanchu')
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        checkQuestions(this.currentPage, 10).then(res => {
          this.totalNum = res.data.total;
          this.exerciseData = res.data.rows;
        })
      })
    },
    beforeUpload() {
        if (this.gradeVal === '') {
          this.$message({
            showClose: true,
            message: '请选择上传题目的年级',
            type: 'warning'
          });
        }
    },
    getType(type) {
      var questionTypeDesc = '';
      switch(type) {
        case 0:
          questionTypeDesc = '文字判断题';
          break;
        case 1:
          questionTypeDesc = '文字选择题（单选）';
          break;
        case 2:
          questionTypeDesc = '文字选择题（多选）';
          break;
        case 3:
          questionTypeDesc = '图片判断题';
          break;
        case 4:
          questionTypeDesc = '图片选择题（单选）';
          break;
        case 5:
          questionTypeDesc = '图片选择题（多选）';
          break;
        case 6:
          questionTypeDesc = '视频选择题（单选）';
          break;
        case 7:
          questionTypeDesc = '视频选择题（多选）';
          break;
      }
      return questionTypeDesc;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  watch: {
    currentPage(val, oldVal) {
      checkQuestions(val, 10).then(res => {
        this.totalNum = res.data.total;
        this.exerciseData = res.data.rows;
      })
    }
  },
  created() {
    this.currentPage = 1;
    checkQuestions(1, 10).then(res => {
      this.totalNum = res.data.total;
      this.exerciseData = res.data.rows;
    })
  }
}
</script>
<style lang="less" scoped>
  .uploadDemo{
    display: inline-block;
  }
</style>
<style lang="less" >
  .gradeChoice{
    .el-select__caret.el-input__icon.el-icon-arrow-up{
      line-height:30px;
    }
  }
</style>

