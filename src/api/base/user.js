import base from './base'

/**
 * 登录类
 */
export default class User extends base {
    static openId = null;
    static token = null;
    static sessionKey = null
    static hasUnionIdLogin = false


    static async miniProgramLogin(byUnionId = false) {
        let self = this
        return new Promise((resolve, reject) => {
            if (self.openId) {
                return resolve(true)
            } else {
                wx.login({
                    success: async function(res) {
                        console.log(res)
                        if (res.code) {
                            let result = await self.post('common/miniProgramLogin', {
                                code: res.code
                            })
                            if (result) {
                                console.log(result)
                                self.openId = result.openid;
                                self.sessionKey = result.session_key
                                if (byUnionId) {
                                    result = await self.unionIdLogin()
                                    if (!result) {
                                        return resolve(false)
                                    }
                                }
                                self.login(result)
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

    static async unionIdLogin() {
        if (this.hasUnionIdLogin) {
            return true
        }
        let result = await this.getWUserInfo()
        if (result) {
            result['openid'] = this.openId
            result = await this.userSureAuth(result)
            if (result) {
                this.hasUnionIdLogin = true
                return true
            }
            return false
        }

        return false
    }

    static getWUserInfo() {
        if (this.G.userInfo) {
            return true
        }
        let self = this
        return new Promise((resolve, reject) => {
            // wx.getSetting({
            //     success: function(res) {
            //         if (res.authSetting['scope.userInfo']) {
            //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            //             wx.getUserInfo({
            //                 success: function(res) {
            //                     self.G.userInfo = res.userInfo
            //                     return resolve(true)
            //                 },
            //                 fail() {
            //                     return resolve(false)
            //                 }
            //             });
            //         } else {
            //             return resolve(false)
            //         }
            //     },
            //     fail() {
            //         return resolve(false)
            //     }
            // });

            wx.getUserInfo({
                success: function(res) {
                    self.G.userInfo = res.userInfo
                    return resolve(res)
                },
                fail() {
                    return resolve(false)
                }
            });
        })
    }

    // 微信授权后保存用户信息
    static userSureAuth(params) {
        this.G.userInfo = params.userInfo;
        return this.post('member/completeFans', params)
    }






    static async autoLogin(byUnionId = false) {
        let self = this
        return new Promise(async(resolve, reject) => {
            let result = await self.miniProgramLogin(byUnionId)
            if (!result) {
                return resolve(false);
            }

            if (self.token) {
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
    }

    static unLogin() {
        this.token = null
    }
}