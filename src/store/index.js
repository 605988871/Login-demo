import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import { reduceSearchSuggestions } from '@/utils/reduce'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    playList: []
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)
    },
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    getToken(state) {
      state.token = Cookie.get('token')
    },
    setPlayList(state, song) {
      state.playList.push(song)
      state.playList = reduceSearchSuggestions(state.playList)
    },
    clearPlayList(state) {
      state.playList = []
    }
  },
  actions: {},
  modules: {}
})
