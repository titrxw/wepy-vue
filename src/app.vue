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
  HEIGHT:100%;
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
.padding-top-15{
  padding-top:15px;
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
.zan-loadmore__tips{
  background: #f1f2f7 !important;
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
      'pages/login'
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
  }

  onLaunch(options) {
    let _self = this;
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
            break;
          case 401:
            G.token = '';
            wx.redirectTo({
              url: 'login'
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
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              });
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

  // getUserInfo() {
  //   wx.getSetting({
  //     success: function(res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //         wx.getUserInfo({
  //           success: function(res) {
  //             console.log(res);
  //           }
  //         });
  //       }
  //     }
  //   });
  // }
}
</script>
