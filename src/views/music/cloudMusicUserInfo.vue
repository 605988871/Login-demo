<template>
  <div>
    <el-button @click="login" v-if="!isLogin">登录</el-button>
    <el-button @click="logout" v-if="isLogin">退出登录</el-button>
  </div>
</template>

<script>
import { phoneLogin, logout } from '../../utils/cloudMusicApi'
import md5 from 'js-md5'
export default {
  name: '',
  props: [''],
  data() {
    return {
      isLogin: ''
    }
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    this.isLogin = this.$cookie.get('MUSIC_U') ? true : false
  },

  methods: {
    async login() {
      let obj = {
        phone: '13726267254',
        password: '216c1301',
        md5_password: md5('216c1301')
      }
      await phoneLogin(obj)
      if (this.$cookie.get('MUSIC_U')) {
        this.isLogin = true
      }
    },
    async logout() {
      await logout()
      if (!this.$cookie.get('MUSIC_U')) {
        this.isLogin = false
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
