import wepy from 'wepy'
import user from '@/api/user';
import Tip from 'tip';
import G from '@/conf';

export default class page extends wepy.page {
    mounted(options) {

    }

    async render(options) {
        await this.mounted(options)

        this.setData('isMounted', true)
        this.isMounted = true

        this.$apply()
    }


    async miniProgramLogin(byUnionId = false) {
        Tip.showLoading()
        let result = await user.miniProgramLogin(byUnionId)
        if (!result && byUnionId) {
            // 保存当前页面的地址
            this.$redirect('/wechat_auth')
            return false;
        }
        Tip.hideLoading()
        return result
    }

    async autoLogin(byUnionId = false) {
        Tip.showLoading()
        let result = await user.autoLogin(byUnionId)
        if (!result && byUnionId) {
            // 保存当前页面的地址
            this.$redirect('/wechat_auth')
            return false;
        }
        Tip.hideLoading()
        return result
    }

    async onLoad(options) {
        this.setData('G', G)
        this.G = G
        this.setData('isMounted', false)
        this.isMounted = false


        if (this.config) {
            if (this.config.loginByOpenId) {
                let result = await this.miniProgramLogin(this.config.loginByUnionId)
                if (result) {
                    this.render(options)
                }
                return true
            } else if (this.config.loginByAccount) {
                let result = await this.autoLogin(this.config.loginByUnionId)
                if (result) {
                    this.render(options)
                }
                return true
            }
        }

        this.render(options)
    }

    async uploadFile(count = 9, sourceType = null) {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: count,
                sourceType: sourceType,
                success: function(res) {
                    var num = 0
                    var result = []
                    res.tempFiles.forEach(async(element) => {
                        if (G.uploadFileSize * 1024 < element.size) {
                            Tip.errorToast(
                                '文件太大, 不能超过 ' + G.uploadFileSize / 1024 + 'M.'
                            );
                            return resolve(false)
                        }

                        Tip.showLoading();
                        let cresult = await new Promise((cresolve, creject) => {
                            wepy.uploadFile({
                                url: G.uploadHost,
                                filePath: element.path,
                                success: function(res) {
                                    if (res) {
                                        return cresolve(res)
                                    } else {
                                        return cresolve(false)
                                    }
                                },
                                fail: function() {
                                    return cresolve(false)
                                },
                                complete: function() {
                                    Tip.hideLoading();
                                }
                            });
                        })
                        if (cresult) {
                            result.push(cresult)
                        } else {
                            return resolve(false)
                        }

                        ++num;
                        if (num == res.tempFiles.length) {
                            if (count == 1) {
                                result = result[0]
                            }
                            return resolve(result)
                        }
                    });
                },
                fail: function() {
                    return resolve(false)
                }
            });
        })
    }
}