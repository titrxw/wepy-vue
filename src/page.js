import wepy from 'wepy'
import user from '@/api/user';
import Tip from 'tip';
import G from '@/conf';

export default class page extends wepy.page {

    getOpenId(callback = null) {
        if (G.openId) {
            if (callback) {
                callback();
            }
        } else {
            wx.login({
                success: async function(res) {
                    if (res.code) {
                        let result = await user.miniProgramLogin(res.code);
                        if (result) {
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
    }

    async doLogin(callback = null) {
        if (user.token) {
            Tip.hideLoading();
            callback()
            return true
        }
        let result = await user.autoLogin();
        Tip.hideLoading();
        if (result) {
            if (callback) {
                callback();
            }
        }
    }

    autoLogin(callback = null) {
        Tip.showLoading();
        let self = this
        this.getOpenId(function() {
            self.doLogin(callback)
        })
    }


    mounted(options) {

    }

    async render(options) {
        this.setData('G', G)
        this.G = G

        await this.mounted(options)

        this.setData('isMounted', true)
        this.isMounted = true

        this.$apply()
    }

    onLoad(options) {
        if (this.config && this.config.requireLogin) {
            let self = this
            this.autoLogin(function() {
                self.render(options)
            })
        } else {
            this.render(options)
        }
    }
}