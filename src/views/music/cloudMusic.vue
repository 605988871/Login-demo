<template>
  <div>
    <el-button @click="login">登录</el-button>
    <el-button @click="logout">退出登录</el-button>
    <auto-complete
      ref="autoComplete"
      :dataSource="dataSource"
      @searchSug="searchSug"
    ></auto-complete>
    <el-button @click="search">搜索</el-button>
    <el-button @click="searchSug">搜索建议</el-button>
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
      keywords: '',
      dataSource: []
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
    async search() {
      let obj = {
        keywords: this.keywords
      }
      await search(obj)
    },
    async searchSug() {
      let obj = {
        keywords: this.$refs.autoComplete.input
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
