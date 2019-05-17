<template>
  <div class="noticeBank">
    <system-title :showMenu="true" :showClose="true"></system-title>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="公告管理" name="first">
        <div class="upLoad">
          <el-button size="mini" type="primary" plain @click="addNotice">添加</el-button>
        </div>
        <el-table
          :data="noticeData"
          border
          style="width: 100%">
          <el-table-column
            label="内容"
            prop="content">
            <template slot-scope="scope">
              <el-input type="textarea" v-model="scope.row.content"
                        @blur="editNotice(scope.row.id, scope.row.content)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="delNotice(scope.row.id)" size="mini"
                         type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { checkNotice, editNotice, addNotice, delNotice } from '@/api/bank'
  import systemTitle from '@/components/title'
export default {
  name: '',
  data(){
    return {
      activeName: 'first',
      noticeData: []
    }
  },
  components: {
    systemTitle
  },
  methods: {
    addNotice() {
      this.noticeData.push({id:'', content: ''})
    },
    editNotice(id, content) {
      if(id) {
        editNotice(id, content);
      } else {
        addNotice(content);
      }
    },
    delNotice(id) {
      delNotice(id);
    }
  },
  created() {
    checkNotice().then(res => {
      this.noticeData = res.data;
    })
  }
}
</script>
<style lang="less" scoped>
</style>

