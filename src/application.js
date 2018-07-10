import wepy from 'wepy';
import 'wepy-async-function';
import G from './conf';
import user from './api/user';
import Tip from 'tip';
import Validate from './libs/validate'

export default class app extends wepy.app {
    mounted(options) {

    }

    onLaunch(options) {
        this.intercept('request', {
            config(res) {
                if (!res.data) {
                    res.data = {}
                }
                res.data.token = user.token;

                if (!Validate.isUrl(res.url)) {
                    res.url = G.apiHost + res.url;
                }

                return res;
            },
            success(res) {
                if (typeof res.data == 'string') {
                    // 这里暂时有问题
                    Tip.errorToast('数据格式错误' + res.data);
                    return false;
                }
                // 业务需求
                switch (res.data.ret) {
                    case 200:
                        return res.data.data;
                    case 401:
                        user.unLogin()
                        wx.redirectTo({
                            url: '/login'
                        });
                        return false;
                    case 302:
                        user.unLogin()
                        wx.redirectTo({
                            url: '/login'
                        });
                        return false;
                    default:
                        if (res.data.ret) {
                            Tip.errorToast(res.data.msg);
                            return false;
                        }
                        return res.data;
                }
            },
            fail(p) {
                Tip.errorToast('系统错误');
                return false;
            }
        });
        this.intercept('uploadFile', {
            config(p) {
                p.name = 'file';
                if (!p.formData) {
                    p.formData = {};
                }
                p.formData['token'] = user.token;
                return p;
            },
            success(p) {
                try {
                    p.data = JSON.parse(p.data);
                } catch (e) {
                    Tip.errorToast('数据格式错误' + p.data);
                    return false;
                }
                if (p.data.ret == 200 && p.data.data.url) {
                    return p.data.data.url;
                } else {
                    Tip.errorToast('上传失败' + p.data.msg);
                    return false;
                }
            },
            fail(p) {
                Tip.errorToast('系统错误');
                return false;
            }
        });
        wx.getSystemInfo({
            success: function(res) {
                G.systemInfo = res;
            }
        });
        this.mounted(options)
    }

    onError(msg) {
        console.log(msg)
    }
}