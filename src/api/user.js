import base from './base'

/**
 * 登录类
 */
export default class User extends base {
    static openId = null;
    static token = null;

    static async miniProgramLogin(code) {
        let result = await this.post('common/miniProgramLogin', {
            code: code
        })
        if (result) {
            this.openId = result.openid;
        }
        return result
    }
    
    static async autoLogin() {
        let result = await this.post('common/login', {
            openid: this.openId
        })
        if (result) {
            this.workId = result.worker_id
            this.token = result.token;
        }
        return result
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