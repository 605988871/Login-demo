<template>
  <div id="app">
    <layout v-if="showLayout"></layout>
    <transition name="fade-transform" mode="out-in">
      <keep-alive include="Home">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div style="height: 150px;"></div>
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
    <aplayer v-if="showLayout"></aplayer>
    <to-top v-if="showLayout"></to-top>
    <l-2-d v-if="showL2d"></l-2-d>
  </div>
</template>
<script>
import { RENDERER } from './utils/fish'
import layout from './views/layout/layout'
import Aplayer from './components/aplayer'
import toTop from './components/toTop'
import L2D from './components/L2D'
export default {
  components: {
    layout,
    Aplayer,
    toTop,
    L2D
  },
  data() {
    return {
      direction: 'slide-right',
      showL2d: false
    }
  },
  created() {
    if (this.showLayout) {
      setTimeout(() => {
        this.showL2d = true
      }, 1000)
    } else {
      this.showL2d = false
    }
  },
  mounted() {
    var clickCircle = require('./utils/click')
    RENDERER.init()
  },
  computed: {
    showLayout() {
      return this.$store.state.token ? true : false
    }
  },
  methods: {},
  watch: {
    showLayout(val) {
      if (val) {
        setTimeout(() => {
          this.showL2d = true
        }, 1000)
      } else {
        this.showL2d = false
      }
    },
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (to.path == '/') {
        this.direction = 'slide-right'
      } else if (from.path == '/') {
        this.direction = 'slide-left'
      } else {
        this.direction = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }
}
</script>
<style>
body {
  min-width: 1200px;
}
body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #eee;
}
body::-webkit-scrollbar-thumb {
  background: #fe9600;
}
body::-webkit-scrollbar-track {
  background-color: #eee;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 130vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@font-face {
  font-family: blogTitle;
  src: url('./assets/ttf/Slidechunfeng-Regular.ttf');
  font-family: avatar;
  src: url('./assets/ttf/Nyashi.ttf');
}

.appView {
  width: 100%;
  transition: transform 0.3s ease-out;
}

.slide-left-enter {
  transform: translate(100%, 0);

  opacity: 0;
}
.slide-left-leave-active {
  transform: translate(-50%, 0);
  transition: all 0.5s;
}
.slide-right-enter {
  transform: translate(-50%, 0);
  opacity: 0;
}
.slide-right-leave-active {
  transform: translate(100%, 0);
  transition: all 0.5s;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter {
  opacity: 0;
  /* transform: translateX(-30px); */
}
.fade-transform-leave-to {
  opacity: 0;
  /* transform: translateX(30px); */
}
</style>
