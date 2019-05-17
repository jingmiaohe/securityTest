import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

//页面会先从 cookie 中查看是否存有 token，没有，
// 就走一遍上一部分的流程重新登录，如果有token,就会把这个 token 返给后端去拉取user_info，保证用户信息是最新的。

router.beforeEach((to, from, next) => {
  // 刷新 退出
  // 如果cookie 有值
  console.log(to)
  if(to.path === '/login') {
    next();
  } else {
    if(to.meta.role === 'student') {
      store.dispatch('GetInfo').then(res => {
        next();
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          next({ path: '/' })
        })
      })
    } else if (to.meta.role === 'admin') {
      store.dispatch('GetTInfo').then(res => {
        next();
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          next({ path: '/' })
        })
      })
    } else {
      next();
    }
  }
})


router.afterEach(() => {
  // NProgress.done() // 结束Progress
})
