export default [{
    path: 'index',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: true,
      showNavBar: false
    }
  },
  {
    path: 'feedback',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireWechatAuth: false,
      showTabBar: false,
      showNavBar: false
    }
  },
  {
    path: 'login',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireWechatAuth: false,
      showTabBar: false,
      showNavBar: false
    },
    component: ''
  },
  {
    path: 'authentication',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireWechatAuth: false,
      showTabBar: false,
      showNavBar: false
    },
    component: ''
  },
]
