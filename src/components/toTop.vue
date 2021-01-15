<template>
  <div>
    <div class="toTop" @click="toTop"></div>
  </div>
</template>

<script>
export default {
  name: 'toTop',
  props: [''],
  data() {
    return {}
  },

  components: {},

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {
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
<style lang="less" scoped>
.toTop {
  position: fixed;
  z-index: 999;
  right: 50px;
  top: -900px;
  background: url(/static/img/scroll.png) no-repeat center;
  height: 900px;
  width: 70px;
}

@-webkit-keyframes show /*Safari and Chrome*/ {
  from {
    top: -900px;
  }
  to {
    top: -300px;
  }
}

@-webkit-keyframes hide /*Safari and Chrome*/ {
  from {
    top: -300px;
  }
  to {
    top: -900px;
  }
}

.show {
  animation: show 0.5s;
  top: -300px;
}

.hide {
  animation: hide 2s;
  top: -900px;
}
</style>
