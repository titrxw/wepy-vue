import wepy from 'wepy';

export default class Axios {
    static post(url, data, header = {}) {
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
                    resolve(res)
                },
                fail: function(error) {
                    reject(reject)
                }
            })
        });
    }
    static get(url, data, header = {}) {
        return new Promise((resolve, reject) => {
            wepy.request({
                url: url,
                data: data,
                method: 'GET',
                header: header,
                success: function(res) {
                    resolve(res)
                },
                fail: function(error) {
                    reject(reject)
                }
            })
        });
    }
}