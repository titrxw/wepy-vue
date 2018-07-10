import base from './base'

/**
 * 登录类
 */
export default class User extends base {
  static openId = null;
  static token = null;


  static async miniProgramLogin() {
    let self = this
    return new Promise((resolve, reject) => {
      if (self.openId) {
        return resolve(true)
      } else {
        wx.login({
          success: async function (res) {
            if (res.code) {
              let result = await self.post('common/miniProgramLogin', {
                code: res.code
              })
              if (result) {
                self.openId = result.openid;
                return resolve(true)
              }
            }
            return resolve(false)
          },
          fail: function () {
            return resolve(false)
          }
        });
      }
    })
  }

  static async autoLogin() {
    let result = await this.miniProgramLogin()
    if (!result) {
      return false;
    }

    if (this.token) {
      return true
    }
    result = await this.post('common/login', {
      openid: this.openId
    })
    if (result) {
      this.token = result.token;
      return true
    }
    return false
  }

  static async register(params) {
    params['openid'] = this.openId
    let result = await this.post('common/bind', {
      form: params
    })
    if (result) {
      this.token = result.token
    }
    return result
  }

  static unLogin() {
    this.token = null
  }
}
