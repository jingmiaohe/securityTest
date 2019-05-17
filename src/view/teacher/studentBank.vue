<template>
  <div class="studentBank">
    <system-title :showMenu="true" :showClose="true"></system-title>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="学生信息" name="first">
        <div class="upLoad">
          <el-button size="mini" type="primary" plain @click="loadStuTem">下载模版</el-button>
          <el-upload
            class="uploadDemo"
            name="uploadFile"
            action="/student/importExcel"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <el-button size="mini" type="primary"  plain >点击上传</el-button>
          </el-upload>
          <el-button size="mini" type="primary" plain @click="addStu">添加</el-button>
        </div>
        <el-table
          :data="studentData"
          border
          style="width: 100%">
          <el-table-column
            label="姓名"
            prop="name">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"
                        @blur="editName(scope.row.id, scope.row.name)"
                         ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="学号"
            prop="studentNumber">
            <template slot-scope="scope">
              <el-input v-model="scope.row.studentNumber"
                        @blur="editNum(scope.row.id, scope.row.studentNumber)"
                         ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
            prop="sex">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sex === 0 ? '男' : '女'"
                        @blur="editSex(scope.row.id, scope.row.sex)"
                         ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="年级"
            prop="grade">
            <template slot-scope="scope">
              <el-input v-model="scope.row.grade"
                        @blur="editGrade(scope.row.id, scope.row.grade)"
                         ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="班级"
            prop="clazz">
            <template slot-scope="scope">
              <el-input v-model="scope.row.clazz"
                        @blur="editClazz(scope.row.id, scope.row.clazz)"
                         ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="学校"
            prop="school">
            <template slot-scope="scope">
              <el-input v-model="scope.row.school"
                        @blur="editSchool(scope.row.id, scope.row.school)"
                         ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="delStu(scope.row.id)" size="mini"
                         type="danger" icon="el-icon-delete" circle></el-button>
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
  import { checkStudents, editStudent, addStudent, delStudent } from '@/api/bank'
  import file from '@/assets/file/stuTemplate.xlsx'
  import systemTitle from '@/components/title'
export default {
  name: 'studentBank',
  data(){
    return {
      studentData: [],
      totalNum: 0,
      activeName: 'first',
      currentPage: 1,
      activeId: ''
    }
  },
  methods: {
    loadStuTem() {
      console.log(file);
      location.href = file;
    },
    uploadSuccess(response, file, fileList) {
      console.log('上传成功')
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
        checkStudents(this.currentPage, 10).then(res => {
          this.totalNum = res.data.total;
          this.totalPage = res.data.totalPage;
          this.studentData = res.data.rows;
        })
      }
    },
    addStu() {
      // 如果当前 是最后一页就刷新 跳转到最后一页
      var obj = {
        studentNumber: '',
        name: '',
        school: '',
        grade: '',
        clazz: '',
        sex: ''
      }
      this.currentPage = this.totalPage;
      this.studentData.push(obj);
    },
    delStu(id) {
      delStudent(id).then(res => {
        checkStudents(this.currentPage, 10).then(res => {
          this.totalNum = res.data.total;
          this.totalPage = res.data.totalPage;
          this.studentData = res.data.rows;
        })
      })
    },
    editName(id, name) {
      editStudent(id, 'name', name)
    },
    editNum(id, num) {
      if(id) {
        editStudent(id, 'studentNumber', num)
      } else {
        addStudent({'studentNumber': num});
      }
    },
    editSex(id, sex) {
      var sexVal = sex === '男'?'0':(sex === '女'?'1':'0')
      if(id) {
        editStudent(id, 'sex', sexVal)
      } else {
        addStudent({'sex': num});
      }
    },
    editGrade(id, grade) {
      if(id) {
        editStudent(id, 'grade', grade)
      } else {
        addStudent({'grade': num});
      }
    },
    editClazz(id, clazz) {
      if(id) {
        editStudent(id, 'clazz', clazz)
      } else {
        addStudent({'clazz': num});
      }
    },
    editSchool(id, school) {
      if(id) {
        ditStudent(id, 'school', school)
      } else {
        addStudent({'school': num});
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  watch: {
    currentPage(val, oldVal) {
      checkStudents(val, 10).then(res => {
        this.totalNum = res.data.total;
        this.studentData = res.data.rows;
      })
    }
  },
  components: {
    systemTitle
  },
  created() {
    // 学生信息
    this.currentPage = 1;
    checkStudents(1, 10).then(res => {
        this.totalNum = res.data.total;
        this.totalPage = res.data.totalPage;
        this.studentData = res.data.rows;
    })
  }
}
</script>
<style lang="less" scoped>
  .uploadDemo{
    display: inline-block;
  }
</style>

