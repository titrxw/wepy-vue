<style lang="css">
@import '/zanui/helper.wxss';
page{
  width: 100%;
  height: 100%;
}
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
icon {
  display:inline-block;
  font-size:0;
  margin:0 auto;
}
.background-fff{
  background:#fff;
}
.cell--without-border::after{
  border: 0 none !important; 
}
.padding-15{
  padding: 15px;
}
.margin-auto{
  margin: 0 auto;
}
.padding-top-15{
  padding-top:15px;
}
</style>

<script>
import wepy from 'wepy';
import 'wepy-async-function';
import G from  './conf';
import qs from 'qs';
import api from './api';

export default class extends wepy.app {
  // 这里只能是静态数据
  config = { 
    pages: [ 
      'pages/customer/index',
      'pages/customer/login',
      'pages/customer/authentication',
      'pages/customer/auth_success',
      'pages/customer/contract',
      'pages/customer/progress'
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
  }

  onLaunch(options) {
    let _self = this;
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
          wx.showToast({
            title: '数据格式错误' + res.data,
            icon: 'none',
            duration: 2000
          })
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
              })
              return false;
            }
            return res.data;
            break;
        }
        return false;
      },
      fail(p) {
        // 这里暂时有问题
        wx.showToast({
          title: '系统错误',
          icon: 'none',
          duration: 2000
        })
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
              callback ()
            }
          }
        } else {
          wx.showToast({
            title: '登录失败！' + res.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
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
  
  // getCurrentPageUrl(){
  //     var pages = getCurrentPages()    //获取加载的页面
  //     var currentPage = pages[pages.length-1]    //获取当前页面的对象
  //     var url = currentPage.route    //当前页面url
  //     return url
  // }
}
</script>
