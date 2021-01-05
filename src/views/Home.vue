<template>
  <div class="home" id="home">
    <div class="header" id="starHeight">
      <div id="blogTitle">
        <span>
          <a style="font-size: 60px">朝花夕拾</a>
        </span>
        <h2 style="font-size: 30px; font-weight: 500">
          生活是没有标准答案的。
        </h2>
      </div>
      <!--end: blogTitle 博客的标题和副标题 -->
    </div>
    <div class="menu">
      <ul>
        <li><a>首页</a></li>
        <li><a>联系</a></li>
        <li><a>技能树</a></li>
        <li><a>留言板</a></li>
        <li><a>相册</a></li>
        <li><a>友链</a></li>
        <li><a>维护</a></li>
        <li><a>投喂</a></li>
        <li><a>管理</a></li>
      </ul>
    </div>
    <div>
      <el-row style="margin:20px 20px">
        <el-col :span="4">
          <el-card shadow="hover" class="card">
            <div class="region">{{ tags.region }}</div>
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
                <el-tag>{{ tags.tag6 }}</el-tag>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="16" style="text-align:center">
          <div class="poem-wrap">
            <div class="poem-border poem-left"></div>
            <div class="poem-border poem-right"></div>
            <h1 style="margin-top:-20px">念两句诗</h1>
            <div class="content">{{ gushi.content }}</div>
            <div class="info">
              [{{ gushi.dynasty }}] {{ gushi.author }} 《{{ gushi.title }}》
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="text-align:center"></el-col>
      </el-row>
    </div>
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
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { RENDERER } from '../utils/fish'
import '../utils/clickCircle'
import { L2Dwidget } from 'live2d-widget'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
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
  created() {},
  mounted() {
    if (typeof Storage !== 'undefined') {
      // Store
      if (localStorage.getItem('jinrishiciToken') == null) {
        axios.get('/jinrishici/token').then(res => {
          localStorage.setItem('jinrishiciToken', res.data.data)
        })
      } // Retrieve
    } else {
      this.$message.err('抱歉！您的浏览器不支持 Web Storage ...')
    }
    let jinrishiciToken = localStorage.getItem('jinrishiciToken')
    axios
      .get('/jinrishici/info', {
        headers: { 'X-User-Token': jinrishiciToken }
      })
      .then(res => {
        this.tags.region = res.data.data.region
        this.tags.tag1 = res.data.data.tags[0]
        this.tags.tag2 = res.data.data.tags[1]
        this.tags.tag3 = res.data.data.tags[2]
        this.tags.tag4 = res.data.data.tags[3]
        this.tags.tag5 = res.data.data.tags[4]
        this.tags.tag6 = res.data.data.tags[5]
      })
    axios
      .get('/jinrishici/sentence', {
        headers: { 'X-User-Token': jinrishiciToken }
      })
      .then(res => {
        console.log(res)
        this.gushi.content = res.data.data.content
        this.gushi.dynasty = res.data.data.origin.dynasty
        this.gushi.author = res.data.data.origin.author
        this.gushi.title = res.data.data.origin.title
      })
    this.$nextTick(() => {
      var star = require('../utils/star')
      RENDERER.init()
      L2Dwidget.init({
        model: {
          jsonPath:
            'https://unpkg.com/live2d-widget-model-hijiki/assets/hijiki.model.json'
        },
        display: { position: 'right' },
        mobile: { show: true },
        react: {
          opacity: 0.8
        }
      })
    })
    window.addEventListener('scroll', function() {
      let t = $('body, html').scrollTop() // 目前监听的是整个body的滚动条距离

      if (t > parseFloat($('.header').css('height'))) {
        $('.menu').addClass('box-active')
        $('.card').addClass('card-active')
      } else {
        $('.card').removeClass('card-active')
        $('.menu').removeClass('box-active')
      }
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home {
  height: 150vh;
  width: 100%;
  cursor: url(../assets/cursora.ico), auto;
}
div.home::after {
  background-image: url(https://api.imacroc.cn/acg/);
  content: '';
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.06;
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.header {
  background-image: url(../assets/header.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: rgb(34, 34, 34);
  overflow: hidden;
  width: 100%;
  height: 40vh;
  max-height: 40vh;
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
  text-align: center;
  display: table;
}

#blogTitle {
  font-family: 'blogTitle', cursive;
  color: white;
  position: relative; /*脱离文档流*/
  top: 50%;
  margin-top: -50px;
}

.menu {
  width: 100%;
  text-align: center;
  z-index: 1000;
  background: white;
  opacity: 0.9;
  border-bottom: 1px solid rgba(138, 199, 223, 0.2);
  box-shadow: 0px 10px 15px -18px #000;
  ul {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 8px 0;
    li {
      display: inline-block;
      margin: 4px;
      text-align: center;
      width: 84px;
      height: 24px;
      outline: none;
      cursor: pointer;
      line-height: 24px;
      a {
        color: #2daebf;
        text-decoration: none;
        margin: 0px;
        padding-top: 4px;
        font-weight: 400;
        text-shadow: 1px 1px 10px #bdbaba;
      }
      a:hover {
        color: #ec8836;
        text-decoration: none; /* 不显示超链接下划线 */
      }
    }
  }
}
.box-active {
  position: fixed;
  top: 0;
}
.card {
  top: 20px;
  left: 20px;
  width: 100%;
  height: 175px;
}

.poem-wrap {
  position: relative;
  width: 1000px;
  max-width: 80%;
  border: 2px solid #797979;
  border-top: 0;
  text-align: center;
  margin: 40px auto;
  h1 {
    position: relative;
    margin-top: -20px;
    display: inline-block;
    letter-spacing: 4px;
    color: #797979;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .content {
    font-size: 25px;
    font-weight: 100;
  }
  .info {
    font-size: 15px;
    margin: 15px auto;
    color: #909399;
  }
}

.poem-border {
  position: absolute;
  height: 2px;
  width: 27%;
  background-color: #797979;
}
.poem-right {
  right: 0;
}

.poem-left {
  left: 0;
}
</style>
