
import wepy from 'wepy';
import 'wepy-async-function';
import G from './conf';
import qs from 'qs';
import api from './api';
import Tip from 'tip';
import Validate from './libs/validate'

export default class app extends wepy.app {

  constructor() {
    super();
  }

  mounted (options) {

  }

  onLaunch(options) {
    this.intercept('request', {
      config(res) {
        if (!res.data) {
          res.data = {}
        }
        res.data.token = G.token;
        res.data = qs.stringify(res.data);

        if (!Validate.isUrl(res.url)) {
          res.url = G.apiHost + res.url;
        }

        if (res.method == 'GET') {
          res.url = res.url + '?' + res.data;
        }

        return res;
      },
      success(res) {
        if (typeof res.data == 'string') {
          // 这里暂时有问题
          Tip.errorToast('数据格式错误' + res.data);
          return false;
        }
        // 业务需求
        switch (res.data.ret) {
          case 200:
            return res.data.data;
          case 401:
            G.token = '';
            wx.redirectTo({
              url: 'login'
            });
            return false;
          case 302:
            G.token = '';
            wx.redirectTo({
              url: 'login'
            });
            return false;
          default:
            if (res.data.ret) {
              Tip.errorToast(res.data.msg);
              return false;
            }
            return res.data;
        }
      },
      fail(p) {
        Tip.errorToast('系统错误');
        return false;
      }
    });
    this.intercept('uploadFile', {
      config(p) {
        p.name = 'file';
        if (!p.formData) {
          p.formData = {};
        }
        p.formData['token'] = G.token;
        return p;
      },
      success(p) {
        try {
          p.data = JSON.parse(p.data);
        } catch (e) {
          Tip.errorToast('数据格式错误' + p.data);
          return false;
        }
        if (p.data.ret == 200 && p.data.data.url) {
          return p.data.data.url;
        } else {
          Tip.errorToast('上传失败' + p.data.msg);
          return false;
        }
      },
      fail(p) {
        Tip.errorToast('系统错误');
        return false;
      }
    });
    wx.getSystemInfo({
      success: function(res) {
        wepy.G.systemInfo = res;
      }
    });
    this.mounted(options)
  }

  getOpenId(callback = null) {
    wx.login({
      success: async function(res) {
        if (res.code) {
          let result = await api.miniProgramLogin({ code: res.code });
          if (result) {
            G.openId = result.openid;
            if (callback) {
              callback(res);
            }
          }
        } else {
          Tip.errorToast('登录失败！' + res.errMsg);
        }
      }
    });
  }

  async doLogin (callback = null) {
    if (G.token) {
      Tip.hideLoading();
      callback({})
      return true
    }
    let result = await api.autoLogin({ openid: G.openId });
    if (result) {
      Tip.hideLoading();
      G.token = result.token;
      if (callback) {
        callback(result);
      }
    }
  }

  autoLogin (callback = null) {
    Tip.showLoading();
    if (G.openId) {
      this.doLogin(callback)
    } else {
      let self = this
      this.getOpenId(function (result) {
        self.doLogin(callback)
      })
    }
  }
}
