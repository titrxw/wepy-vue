import base from './base'

/**
 * 登录类
 */
export default class Auth extends base {
  static async miniProgramLogin(code) {
    let result = await this.post('mc/common/miniProgramLogin', {
      code: code
    })
    if (result) {
      this.G.openId = result.openid;
    }
    return result
  }
  static async autoLogin() {
    let result = await this.post('mc/common/login', {
      openid: this.G.openId
    })
    if (result) {
      this.G.workId = result.worker_id
      this.G.token = result.token;
    }
    return result
  }
  static async register(params) {
    params['openid'] = this.G.openId
    let result = await this.post('mc/common/bind', {
      form: params
    })
    if (result) {
      this.G.token = result.token
    }
    return result
  }
  static unLogin() {
    this.G.token = null
  }
}
