<template>
  <div class="home" id="home">
    <div>
      <el-row style="margin:20px 20px">
        <el-col :span="4">
          <el-card
            shadow="hover"
            v-loading="loading2"
            element-loading-spinner="el-icon-loading"
          >
            <div class="region">
              <span>{{ tags.region }}</span>
            </div>
            <el-row style="margin-top:30px">
              <el-col :span="8">
                <el-tag>{{ tags.tag1 }}</el-tag>
              </el-col>
              <el-col :span="8">
                <el-tag>{{ tags.tag2 }}</el-tag>
              </el-col>
              <el-col :span="8">
                <el-tag>{{ tags.tag5 }}</el-tag>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px">
              <el-col :span="8">
                <el-tag>{{ tags.tag3 }}</el-tag>
              </el-col>
              <el-col :span="8">
                <el-tag>{{ tags.tag4 }}</el-tag>
              </el-col>
              <el-col :span="8">
                <el-tag v-if="tags.tag6">{{ tags.tag6 }}</el-tag>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="16" style="text-align:center">
          <div
            class="poem-wrap"
            v-loading="loading1"
            element-loading-background="rgba(0,0,0,0)"
          >
            <div class="poem-border poem-left"></div>
            <div class="poem-border poem-right"></div>
            <h1 style="margin-top:-20px"><span>念两句诗</span></h1>
            <div class="content">
              <span>{{ gushi.content }}</span>
            </div>
            <div class="info" v-show="gushi.content">
              <span>
                [{{ gushi.dynasty }}] {{ gushi.author }} 《{{ gushi.title }}》
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="text-align:center">
          <div style="margin-top:20px">
            <el-avatar src="/static/img/avatar.png" :size="100"></el-avatar>
          </div>
          <div
            style=" font-family: 'avatar', cursive;font-size:20px;margin-top:20px;color:#2daebf"
          >
            正常or半糖
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      isReloadAlive: true,
      loading1: false,
      loading2: false,
      tags: {
        region: '',
        tag1: '',
        tag2: '',
        tag3: '',
        tag4: '',
        tag5: '',
        tag6: ''
      },
      gushi: {
        content: '',
        dynasty: '',
        author: '',
        title: ''
      }
    }
  },
  computed: {},
  created() {
    //this.L2DInit()
  },
  beforeDestroy() {},
  async mounted() {
    this.loading1 = true
    this.loading2 = true

    if (typeof Storage !== 'undefined') {
      // Store
      if (localStorage.getItem('jinrishiciToken') == null) {
        await this.getToken()
      }
      this.jinrishiciToken = localStorage.getItem('jinrishiciToken')
      await this.getTag()
      await this.getContent()
      // Retrieve
    } else {
      this.$message.err('抱歉！您的浏览器不支持 Web Storage ...')
    }

    let count = 0
    if ($('body, html').scrollTop() > 10) {
      $('.toTop').addClass('show')
      $('.toTop').removeClass('hide')
    }
    window.addEventListener('scroll', function() {
      let t = $('body, html').scrollTop() // 目前监听的是整个body的滚动条距离
      if (t > parseFloat($('.header').css('height'))) {
        $('.menu').addClass('box-active')
        $('.card').addClass('card-active')
      } else {
        $('.card').removeClass('card-active')
        $('.menu').removeClass('box-active')
      }
      if (t > 10 && count == 0) {
        count = 1
        $('.toTop').addClass('show')
        $('.toTop').removeClass('hide')
      }
      if (t == 0 && count == 1) {
        count = 0
        $('.toTop').addClass('hide')
        $('.toTop').removeClass('show')
      }
    })
  },
  methods: {
    async getToken() {
      try {
        const res = await axios.get('/jinrishici/token')
        localStorage.setItem('jinrishiciToken', res.data.data)
      } catch (err) {}
    },
    async getTag() {
      const res = await axios.get('/jinrishici/info', {
        headers: { 'X-User-Token': this.jinrishiciToken }
      })
      this.loading2 = false
      this.tags.region = res.data.data.region
      this.tags.tag1 = res.data.data.tags[0]
      this.tags.tag2 = res.data.data.tags[1]
      this.tags.tag3 = res.data.data.tags[2]
      this.tags.tag4 = res.data.data.tags[3]
      this.tags.tag5 = res.data.data.tags[4]
      this.tags.tag6 = res.data.data.tags[5]
    },
    async getContent() {
      const res = await axios.get('/jinrishici/sentence', {
        headers: { 'X-User-Token': this.jinrishiciToken }
      })
      this.loading1 = false
      this.gushi.content = res.data.data.content
      this.gushi.dynasty = res.data.data.origin.dynasty
      this.gushi.author = res.data.data.origin.author
      this.gushi.title = res.data.data.origin.title
    }
  }
}
</script>

<style lang="less" scoped></style>
