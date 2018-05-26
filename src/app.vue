<style lang="css">
@import '/zanui/helper.wxss';
page {
  width: 100%;
  height: 100%;
  background: #fff;
  border: none;
}
.container {
  border: none;
  background: #fff;
  overflow: hidden;
  min-height: 100px;
  box-sizing: border-box;
}
textarea {
  width: auto;
  height: 150px;
  display: block;
  position: relative;
  font-size: 14px;
}
icon {
  display: inline-block;
  font-size: 0;
  margin: 0 auto;
}
.background-fff {
  background: #fff;
}
.cell--without-border::after {
  border: 0 none !important;
}
.padding-15 {
  padding: 15px;
}
.margin-auto {
  margin: 0 auto;
}
.padding-top-15 {
  padding-top: 15px;
}
.full-height{
  height:100%;
}
</style>

<script>
import wepy from 'wepy';
import 'wepy-async-function';
import G from './conf';
import qs from 'qs';
import api from './api';
import Tip from 'tip';
import Validate from './libs/validate'

export default class extends wepy.app {
  // 这里只能是静态数据
  config = {
    pages: [
      'pages/customer/index',
      'pages/customer/login',
      'pages/business/index',
      'pages/business/login',
      'pages/index',
      'pages/customer/authentication',
      'pages/customer/auth_success',
      'pages/customer/contract',
      'pages/customer/progress',
      'pages/business/pact/index',
      'pages/business/pact/add',
      'pages/business/pact/detail',
      'pages/business/pact/submit',
      'pages/business/progress/index',
      'pages/business/progress/add',
      'pages/business/progress/submit'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };
  
  constructor() {
    super();
    this.use('requestfix');
    console.log(this)
  }

  onLaunch(options) {
    console.log(this)
    console.log(options)
    let _self = this;
    this.intercept('request', {
      config(res) {
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
            break;
          case 401:
            G.token = '';
            wx.redirectTo({
              url: '../index'
            });
            return false;
            break;
          case 302:
            G.token = '';
            wx.redirectTo({
              url: 'login'
            });
            return false;
            break;
          default:
            if (res.data.ret) {
              Tip.errorToast('数据格式错误' + res.data.msg);
              return false;
            }
            return res.data;
            break;
        }
        return false;
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
  }

  login(callback = null) {
    let _self = this;
    wx.login({
      success: async function(res) {
        if (res.code) {
          let result = await api.miniProgramLogin({ code: res.code });
          if (result) {
            wepy.G.openId = result.openid;
            if (callback) {
              callback();
            }
          }
        } else {
          Tip.errorToast('登录失败！' + res.errMsg);
        }
      }
    });
  }

  getUserInfo() {
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res);
            }
          });
        }
      }
    });
  }
}
</script>
