let log = function (params) {
  let pages = getCurrentPages() //获取加载的页面
  let currentPage = pages[pages.length-1] //获取当前页面的对象
  params['path'] = currentPage ? currentPage.route : ''
  params['time'] =  new Date().valueOf()
  // 报送
}

let _app = App;
App = function (app) {
  ['onLaunch', 'onShow', 'onHide', 'onError'].forEach((methodName) => {
    let userDefinedMethod = app[methodName]; // 暂存用户定义的方法
    app[methodName] = function (options) {
      let breadcrumb = {
        type: 'function',
        belong: 'app', // 来源
        method: methodName,
        query: options && options.query, // 页面参数
        scene: options && options.scene, // 场景编号
      };
      if (methodName == 'onError') {
        breadcrumb.error = options
      }
      log(breadcrumb)
      return userDefinedMethod && userDefinedMethod.call(this, options);
    };
  });
  return _app(app);
};

let _page = Page
Page = function (page) {
  // 合并方法，插入记录脚本
  ['onLoad', 'onShow', 'onHide'].forEach((methodName) => {
    let userDefinedMethod = page[methodName]; // 暂存用户定义的方法
    page[methodName] = function (options) {
      let breadcrumb = {
        type: 'function',
        belong: 'page', // 来源
        method: methodName,
        query: options && options.query, // 页面参数
      };
      log(breadcrumb)
      return userDefinedMethod && userDefinedMethod.call(this, options);
    };
  });
  return _page(page);
};

let _request = wx.request
Object.defineProperty(wx, 'request', {
 configurable: true,
 enumerable: true,
 writable: true,
 value: function(params) {
  if (!params.fail) {
    fail.fail = function (e) {
      log({
        type: 'request_error',
        params,
        e
      })
    }
  } else {
    let fail = params.fail
    params.fail = function (e) {
      log({
        type: 'request_error',
        params,
        e
      })
      fail(e)
    }
  }
  return _request(params)
 }
});