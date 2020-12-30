<template>
  <div class="home" id="home">
    <div class="header" id="starHeight">
      <div id="blogTitle">
        <h1>
          <a>domi</a>
        </h1>
        <h2>生活是没有标准答案的。</h2>
      </div>
      <!--end: blogTitle 博客的标题和副标题 -->
    </div>
    <div
      id="jsi-flying-fish-container"
      style="
        position: fixed;
        left: 0px;
        bottom: 0px;
        z-index: -9999999;
        pointer-events: none;
        width: 100%;
        height: 20%;
      "
    ></div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { RENDERER } from "../utils/fish";
import "../utils/clickCircle";
import { L2Dwidget } from "live2d-widget";

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      var star = require( "../utils/star");
      RENDERER.init();
      L2Dwidget.init({
        model: {
          jsonPath:
            "https://unpkg.com/live2d-widget-model-hijiki/assets/hijiki.model.json",
        },
        display: { position: "right" },
        mobile: { show: true },
      });
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.home {
  height: 99vh;
  width: 100%;
  cursor: url(https://files-cdn.cnblogs.com/files/miluluyo/cursora.ico), auto;
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
</style>
