<template>
  <div class="home" id="home">
    <div class="header" id="starHeight">
      <div id="blogTitle">
        <span>
          <a style="font-size: 60px">QQㄋㄟㄋㄟ好饮到扑街茶铺</a>
        </span>
        <h2 style="font-size: 30px; font-weight: 500">
          生活是没有标准答案的。
        </h2>
      </div>
      <!--end: blogTitle 博客的标题和副标题 -->
    </div>
    <div class="menu">
      <ul>
        <li>
          <a>首页</a>
        </li>
        <li><a>联系</a></li>
        <li>
          <router-link :to="{ name: 'Demo' }">技能树</router-link>
        </li>
        <li><a>留言板</a></li>
        <li><a>相册</a></li>
        <li><a>友链</a></li>
        <li><a>维护</a></li>
        <li><a>投喂</a></li>
        <li><a>管理</a></li>
        <li><a @click="loginOut">退出登录</a></li>
      </ul>
    </div>
    <div c>
      <el-row style="margin:20px 20px">
        <el-col :span="4">
          <el-card
            shadow="hover"
            class="card"
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
            <el-avatar
              src="https://pic.cnblogs.com/avatar/1273193/20190806180831.png"
              :size="100"
            ></el-avatar>
          </div>
          <div
            style=" font-family: 'avatar', cursive;font-size:20px;margin-top:20px;color:#2daebf"
          >
            正常or半糖
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="aplayer"></div>
    <div
      id="jsi-flying-fish-container"
      style="
        position: fixed;
        left: 0px;
        bottom: 0px;
        z-index: 1;
        pointer-events: none;
        width: 100%;
        height: 20%;
      "
    ></div>
    <div class="toTop" @click="toTop"></div>
    <aplayer></aplayer>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { RENDERER } from '../../utils/fish'
import { L2Dwidget } from 'live2d-widget'
import 'aplayer/dist/APlayer.min.css'
import Aplayer from './components/aplayer.vue'

export default {
  name: 'Home',
  components: {
    Aplayer
  },
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
    this.L2DInit()
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
    var clickCircle = require('../../utils/click')
    var star = require('../../utils/star')
    RENDERER.init()
    let count = 0
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
        console.log(1)
      }
      if (t == 0 && count == 1) {
        count = 0
        $('.toTop').addClass('hide')
        $('.toTop').removeClass('show')
        console.log(2)
      }
    })
  },
  methods: {
    L2DInit() {
      L2Dwidget.init({
        model: {
          jsonPath:
            'https://unpkg.com/live2d-widget-model-hijiki/assets/hijiki.model.json'
          // 'https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json'
        },
        display: { position: 'right' },
        mobile: { show: true },
        react: {
          opacity: 0.8
        },
        dialog: {
          enable: true,
          script: {
            //每20s，显示一言（调用一言Api返回的句子）
            'every idle 20s': '$hitokoto$',
            //触摸到class='star'对象
            'hover #jsi-flying-fish-container':
              '星星在天上而你在我心里 (*/ω＼*)',
            //触摸到身体
            'tap body': '害羞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
            //触摸到头部
            'tap face': '~~'
          }
        }
      })
    },
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
    },

    loginOut() {
      this.$loginOut()
    },
    toTop() {
      let setTime = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop =
          document.documentElement.scrollTop - 10
        if (document.documentElement.scrollTop == 0) {
          clearInterval(setTime)
        }
      }, 5)
    }
  }
}
</script>

<style lang="less" scoped></style>
