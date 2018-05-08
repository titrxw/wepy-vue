<style lang="css">

.container {
  background: #f9f9f9;
  overflow: hidden;
  min-height: 100vh;
  box-sizing: border-box;
}
.container::before {
  position: fixed;
  top: 0;
  left: 0;
  content: ' ';
  width: 100%;
  height: 1rpx;
  background-color: #e2e2e2;
  z-index: 5;
}
textarea {
  width: auto;
  height: 150px;
  display: block;
  position: relative;
  font-size: 14px;
}
</style>

<script>
import wepy from 'wepy';
import 'wepy-async-function';
import G from './conf';
import qs from 'qs';
import api from './api';
import store from './store';

export default class extends wepy.app {
  // 这里只能是静态数据
  config = {
    pages: [
      'pages/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
  constructor() {
    super();
    this.use('requestfix');
    wepy.G = G;
  }

  onLaunch(options) {
    let _self = this;

    // wepy请求hook
    this.intercept('request', {
      config(res) {
        res.data.token = wepy.G.token;
        res.data = qs.stringify(res.data);

        if (!/^http(.*)/i.test(res.url)) {
          res.url = wepy.G.apiHost + res.url;
        }
        if (res.method == 'GET') {
          res.url = res.url + '?' + res.data
        }

        return res;
      },
      success(res) {
        if (typeof res.data == 'string') {
          // 这里暂时有问题
          store.actions.msg('系统错误');
          return false;
        }
        // 业务需求
        switch (res.data.ret) {
          case 200:
            return res.data.data;
            break;
          case 300:
            G.token = '';
            _self.autoLogin();
            return false;
            break;
          case 302:
            G.token = '';
            wx.navigateTo({
              url: 'login'
            });
            return false;
            break;
          default:
            if (res.data.ret) {
              store.actions.msg(res.data.msg);
              return false;
            }
            return res.data;
            break;
        }
        return false;
      },
      fail(p) {
        // 这里暂时有问题
        store.actions.msg('系统错误');
        return false;
      }
    });

    this.login();
    wx.getSystemInfo({
      success: function(res) {
        wepy.G.systemInfo = res;
      }
    });
  }

  login() {
    let _self = this;
    wx.login({
      success: async function(res) {
        if (res.code) {
          let result = await api.miniProgramLogin({ code: res.code });
          if (result) {
            wepy.G.openId = result.openid;
            _self.autoLogin();
          }
        } else {
          store.actions.msg('登录失败！' + res.errMsg);
        }
      }
    });
  }
  // 系统登录
  async autoLogin() {
    let result = await api.autoLogin({ openid: wepy.G.openId });
    if (result) {
      wepy.G.token = result.token;
    }
  }

  // getUserInfo() {
  //   wepy.getUserInfo({
  //     async success(res) {
  //       wepy.G.userInfo = res;
  //       let result = await api.wxDataCrypt({
  //         encryptedData: res.encryptedData,
  //         iv: res.iv,
  //         sessionKey: wepy.G.sessionKey
  //       });
  //     }
  //   });
  // }
}
</script>
