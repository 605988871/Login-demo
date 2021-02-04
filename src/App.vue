<template>
  <div id="app">
    <layout v-if="showLayout"></layout>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="['Home', 'CloudMusicSearch']">
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
    <svg
      t="1612338032439"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2663"
      width="50"
      height="50"
      style="position: fixed;right:50px;bottom:120px"
      @click="showPlayList"
    >
      <path
        d="M614.18804 848.20562a99.6 181.7 74.666 1 0 350.463201-96.099453 99.6 181.7 74.666 1 0-350.463201 96.099453Z"
        fill="#4EEAAB"
        p-id="2664"
      ></path>
      <path
        d="M966.7 180.4c0-21.2-17.2-38.4-38.4-38.4s-38.4 17.2-38.4 38.4v516.9c-13.9-2.9-29.2-4.6-45.6-4.6-18.4 0-38 1.9-58.4 6-97.9 19.5-175.6 80.7-173.6 136.8 1.6 44.4 52.6 72.2 122.4 72.2 18.4 0 38-1.9 58.4-6C891 882.2 968.7 821 966.7 764.9c0-0.3-0.1-0.5-0.2-0.8 0-0.6 0.2-1.2 0.2-1.9V180.4zM778 826.3c-15 3-29.6 4.5-43.4 4.5-17.6 0-30.4-2.4-38.7-5.1 14.7-16 50.5-40.9 105-51.7 15-3 29.6-4.5 43.4-4.5 17.6 0 30.4 2.4 38.7 5.1-14.7 16-50.5 40.9-105 51.7zM95.7 218.8H707c21.2 0 38.4-17.2 38.4-38.4S728.3 142 707.1 142H95.7c-21.2 0-38.4 17.2-38.4 38.4s17.2 38.4 38.4 38.4zM582 363.1H95.7c-21.2 0-38.4 17.2-38.4 38.4s17.2 38.4 38.4 38.4H582c21.2 0 38.4-17.2 38.4-38.4 0-21.3-17.2-38.4-38.4-38.4zM456.8 584.1H95.7c-21.2 0-38.4 17.2-38.4 38.4s17.2 38.4 38.4 38.4h361.1c21.2 0 38.4-17.2 38.4-38.4s-17.2-38.4-38.4-38.4zM331.7 805.2h-236c-21.2 0-38.4 17.2-38.4 38.4S74.5 882 95.7 882h236c21.2 0 38.4-17.2 38.4-38.4s-17.2-38.4-38.4-38.4z"
        fill="#454563"
        p-id="2665"
      ></path>
    </svg>
    <play-list></play-list>
  </div>
</template>
<script>
import { RENDERER } from './utils/fish'
import layout from './views/layout/layout'
import Aplayer from './components/aplayer'
import toTop from './components/toTop'
import L2D from './components/L2D'
import Bus from './utils/eventBus'
import playList from '@/components/playList'
export default {
  components: {
    layout,
    Aplayer,
    toTop,
    L2D,
    playList
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
  methods: {
    showPlayList() {
      Bus.$emit('show')
    }
  },
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
