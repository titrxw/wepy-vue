import wepy from 'wepy'
import api from './api/auth';
import Tip from 'tip';
export default class page extends wepy.page {

    getOpenId(callback = null) {
        if (wepy.G.openId) {
            if (callback) {
                callback({});
            }
        } else {
            wx.login({
                success: async function(res) {
                    if (res.code) {
                        let result = await api.miniProgramLogin(res.code);
                        if (result) {
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
    }

    async doLogin(callback = null) {
        if (wepy.G.token) {
            Tip.hideLoading();
            callback({})
            return true
        }
        let result = await api.autoLogin();
        Tip.hideLoading();
        if (result) {
            if (callback) {
                callback(result);
            }
        }
    }

    autoLogin(callback = null) {
        Tip.showLoading();
        let self = this
        this.getOpenId(function(result) {
            self.doLogin(callback)
        })
    }


    mounted(options) {

    }

    render(options) {
        this.setData('G', wepy.G)
        this.G = wepy.G
        
        await this.mounted(options)
    
        this.setData('isMounted', true)
        this.isMounted = true
    
        this.$apply()
    }

    onLoad(options) {
        if (this.config && this.config.requireTabbar) {
            wx.showTabBar()
        } else {
            wx.hideTabBar()
        }
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