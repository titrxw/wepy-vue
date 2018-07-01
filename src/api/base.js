import G from '@/conf';
import wepy from 'wepy';
import md5 from 'md5'

export default class base {
    static single = {}
    static G = G

    static post(url, data, header = {}, isSingle = true) {
        let key = url;
        if (isSingle) {
            if (data) {
                if (typeof(data) == 'array' || typeof(data) == 'object')
                    key += JSON.stringify(data)
                else
                    key += data
            }
            if (header != {}) {
                key += JSON.stringify(header)
            }
            key = md5(key);
            if (this.single[key] === true) {
                return false;
            }
            this.single[key] = true
        }
        let self = this
        return new Promise((resolve, reject) => {
            wepy.request({
                url: url,
                data: data,
                method: 'POST',
                header: {
                    ...header,
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function(res) {
                    if (isSingle) {
                        delete self.single[key]
                    }
                    resolve(res)
                },
                fail: function(error) {
                    if (isSingle) {
                        delete self.single[key]
                    }
                    reject(reject)
                }
            })
        });
    }
    static get(url, data, header = {}, isSingle = true) {
        let key = url;
        if (isSingle) {
            if (data) {
                if (typeof(data) == 'array' || typeof(data) == 'object')
                    key += JSON.stringify(data)
                else
                    key += data
            }
            if (header != {}) {
                key += JSON.stringify(header)
            }
            key = md5(key);
            if (this.single[key] === true) {
                return false;
            }
            this.single[key] = true
        }
        let self = this
        return new Promise((resolve, reject) => {
            wepy.request({
                url: url,
                data: data,
                method: 'GET',
                header: header,
                success: function(res) {
                    if (isSingle) {
                        delete self.single[key]
                    }
                    resolve(res)
                },
                fail: function(error) {
                    if (isSingle) {
                        delete self.single[key]
                    }
                    reject(reject)
                }
            })
        });
    }
}