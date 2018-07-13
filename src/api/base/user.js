import base from './base'

/**
 * 登录类
 */
export default class User extends base {
    static openId = null;
    static token = null;
    static lastTime = null


    static async miniProgramLogin() {
        let self = this
        return new Promise((resolve, reject) => {
            if (self.openId) {
                return resolve(true)
            } else {
                wx.login({
                    success: async function(res) {
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
                    fail: function() {
                        return resolve(false)
                    }
                });
            }
        })
    }

    static async autoLogin() {
        let self = this
        return new Promise(async(resolve, reject) => {
            let result = await self.miniProgramLogin()
            if (!result) {
                return resolve(false);
            }

            if (self.getToken()) {
                return resolve(true)
            }
            result = await self.post('common/login', {
                openid: self.openId
            })
            if (result) {
                self.login(result)
                return resolve(true)
            }
            return resolve(false)
        })
    }

    static async register(params) {
        params['openid'] = this.openId
        let result = await this.post('common/bind', {
            form: params
        })
        if (result) {
            this.login(result)
        }
        return result
    }

    static login(result) {
        this.token = result.token
        this.lastTime = Date.parse(new Date()) / 1000;
    }

    static unLogin() {
        this.token = null
    }

    static getToken() {
        let curTime = Date.parse(new Date()) / 1000;
        if (this.lastTime && (curTime - this.lastTime) > (2 * 60 * 55)) {
            this.unlogin()
        }
        return this.token
    }
}