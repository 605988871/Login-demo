import Vue from "vue";
import store from "../store/index";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue')
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import('../views/demo/demo.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login/login.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
const that = this
//判断用户登录状态，未登录跳转到登录页面，以登录跳转到首页
router.beforeEach((to, from, next) => {
  //从cookie里获取token，防止刷新后 token 丢失
  store.commit('getToken');
  let token = store.state.token;
  if (!token && to.name !== 'Login') {
    next({
      name: 'Login'
    })
  } else {
    if (token && to.name == 'Login') {
      next({
        name: 'Home'
      })
    } else {
      next()
    }

  }
});

export default router;