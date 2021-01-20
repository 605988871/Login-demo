import request from '../utils/request'
//登录
export async function phoneLogin(obj) {
  const res = await request.post('/music/login/cellphone', obj)
  return res
}

//退出登录
export async function logout() {
  const res = await request.get('/music/logout')
  return res
}

//轮播图
export async function banner(type) {
  const res = await request.get('/music/banner', { params: { type: type } })
  return res
}

//搜索
export async function search(obj) {
  const res = await request.get('/music/cloudsearch', {
    params: obj
  })
  return res
}

//搜索建议
export async function searchSug(obj) {
  return request.get('/music/search/suggest', {
    params: obj
  })
}
