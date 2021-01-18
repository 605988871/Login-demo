import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jquery from 'jquery'
import ElementUI from 'element-ui'
import md5 from 'js-md5'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/style/Home.less'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Antd)

Vue.prototype.$md5 = md5
Vue.prototype.$loginOut = function() {
  this.$store.commit('clearToken') //清楚token
  location.reload() //重新加载
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  jquery,
  render: h => h(App)
}).$mount('#app')
