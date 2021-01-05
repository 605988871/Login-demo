<template>
  <div class="demo">
    express + mongoose + mongodb实现增删查编辑
    <div style="text-align: left; margin: 10px">
      <el-row>
        <el-button type="success" @click="dialogFormVisible = true" size="mini">
          新增
        </el-button>
        <el-button type="danger" @click="del" size="mini">删除</el-button>
        <el-button type="warning" @click="loginOut" size="mini">
          退出登录
        </el-button>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">
            <span>{{ scope.row.name }}</span>
          </div>
          <div v-else>
            <el-input v-model="nameEdit" size="mini"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="180">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">
            <span>{{ scope.row.sex }}</span>
          </div>
          <div v-else>
            <el-input v-model="sexEdit" size="mini"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">
            <span>{{ scope.row.age }}</span>
          </div>
          <div v-else>
            <el-input v-model="ageEdit" size="mini"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="!scope.row.isEdit"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="editFinish(scope.$index, scope.row)"
            v-else
          >
            确定
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'demo',
  components: {},
  data() {
    return {
      loading: false,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: 'dong',
        sex: '',
        age: ''
      },
      nameEdit: '',
      sexEdit: '',
      ageEdit: '',
      formLabelWidth: '120px',
      multipleSelection: []
    }
  },
  mounted() {
    $('#showstar').remove()
    $('body').off('click')
    this.query()
  },
  methods: {
    add() {
      let data = {
        name: this.form.name,
        sex: this.form.sex,
        age: this.form.age
      }
      axios.post('/api/add', data).then(res => {
        this.$message({
          message: res.data.message,
          type: 'success'
        })
        this.dialogFormVisible = false
        this.query()
      })
    },
    del() {
      const obj = {
        id: this.multipleSelection
      }
      axios.post('/api/del', obj).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.query()
      })
    },
    query() {
      const obj = {
        name: this.name,
        age: this.age,
        sex: this.sex
      }
      axios.post('/api/query', obj).then(res => {
        this.tableData = []
        res.data.map((item, index) => {
          this.tableData.push(Object.assign(item, { isEdit: false }))
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach(e => {
        this.multipleSelection.push(e._id)
      })
    },
    handleEdit(index, row) {
      this.tableData.forEach((item, index) => {
        item.isEdit = false
      })
      this.nameEdit = row.name
      this.sexEdit = row.sex
      this.ageEdit = row.age
      row.isEdit = true
    },
    editFinish(index, row) {
      row.isEdit = false
      const obj = {
        id: row._id,
        name: this.nameEdit,
        age: this.ageEdit,
        sex: this.sexEdit
      }
      this.loading = true
      axios.post('/api/update', obj).then(res => {
        this.loading = false
        if (!res.data.successMsg) {
          this.query()
        } else {
          row.name = this.nameEdit
          row.age = this.ageEdit
          row.sex = this.sexEdit
        }
      })
    },
    handleDelete(index, row) {
      const obj = {
        id: row._id
      }
      axios.post('/api/del', obj).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.query()
      })
    },
    loginOut() {
      this.$store.commit('clearToken') //清楚token
      location.reload() //重新加载
    }
  }
}
</script>
