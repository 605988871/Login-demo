<template>
  <div>
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
          <router-link :to="{ name: 'Home' }">首页</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/demo' }">express</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/test' }">水墨按钮</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/cloudMusic' }">网易云api</router-link>
        </li>
        <li><a>友链</a></li>
        <li><a>维护</a></li>
        <li><a>投喂</a></li>
        <li><a>管理</a></li>
        <li>
          <a @click="loginOut">
            退出登录
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  props: [''],
  data() {
    return {}
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    var star = require('../../utils/star')
  },

  methods: {
    loginOut() {
      this.$loginOut()
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  background-image: url(../../assets/img/header.jpg);
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
  a,
  h2 {
    color: white !important;
  }
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
</style>
