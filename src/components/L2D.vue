<template>
  <div></div>
</template>

<script>
import { L2Dwidget } from 'live2d-widget'
export default {
  name: 'L2D',
  props: [''],
  data() {
    return {}
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
    this.L2DInit()
  },

  methods: {
    L2DInit() {
      L2Dwidget.init({
        model: {
          jsonPath:
            'https://unpkg.com/live2d-widget-model-hijiki/assets/hijiki.model.json'
          // 'https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json'
        },
        display: { position: 'left' },
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
    }
  }
}
</script>
<style lang="less" scoped></style>
