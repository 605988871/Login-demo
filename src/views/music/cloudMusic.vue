<template>
  <div>
    <el-button @click="login">登录</el-button>
    <el-button @click="logout">退出登录</el-button>
    <auto-complete
      ref="autoComplete"
      :dataSource="dataSource"
      @searchSug="searchSug"
      @search="search"
    ></auto-complete>
    <div style="width:60%; margin: 0 auto;">
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="单曲" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="歌手" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="歌单" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="专辑" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="MV" name="fifth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="电台" name="sixth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  phoneLogin,
  logout,
  banner,
  search,
  searchSug
} from '../../utils/cloudMusicApi'
import AutoComplete from '../../components/autoComplete.vue'
export default {
  name: '',
  props: [''],
  data() {
    return {
      dataSource: {
        order: []
      },
      activeName: 'first'
    }
  },

  components: {
    AutoComplete
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handleClick() {},
    async login() {
      let obj = {
        phone: '13726267254',
        password: '216c1301',
        md5_password: this.$md5('216c1301')
      }
      await phoneLogin(obj)
    },
    async logout() {
      await logout()
    },
    async search(obj) {
      const res = await search(obj)
      console.log(res)
    },
    async searchSug(keywords) {
      let obj = {
        keywords: keywords
      }
      try {
        let dataSource = await searchSug(obj)
        this.dataSource = dataSource.data.result
      } catch (error) {}
    }
  }
}
</script>
<style lang="less" scoped></style>
