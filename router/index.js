import RouterConf from './routers.js'
import Router from '../libs/router'

let router = new Router(RouterConf, wx)

router.beforeEach = function (to, from, next) {
  console.log(to)
  // if (to.path == 'login')
  //   next('upload?id=34') 
  // else {
  //   next()
  // }
  next()
}

export default router
