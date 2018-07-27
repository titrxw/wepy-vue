import wepy from 'wepy';
import 'wepy-async-function';
import G from './conf';
import qs from 'qs';
import Tip from 'tip';
import user from './api/user';
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
                res.data = qs.stringify(res.data);

                if (!Validate.isUrl(res.url)) {
                    res.url = G.apiHost + res.url;
                }
                if (res.method == 'GET') {
                    res.url = res.url + '?' + res.data;
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
                            url: '/pages/login'
                        });
                        return false;
                    case 302:
                        user.unLogin()
                        wx.redirectTo({
                            url: '/pages/login'
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
            config(params) {
                params.name = 'file';
                if (!params.formData) {
                    params.formData = {};
                }
                params.formData['token'] = user.token;
                return params;
            },
            success(res) {
                try {
                    res.data = JSON.parse(res.data);
                } catch (e) {
                    Tip.errorToast('数据格式错误' + res.data);
                    return false;
                }
                if (res.data.ret == 200 && res.data.data.url) {
                    return res.data.data.url;
                } else {
                    Tip.errorToast('上传失败' + res.data.msg);
                    return false;
                }
            },
            fail(res) {
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