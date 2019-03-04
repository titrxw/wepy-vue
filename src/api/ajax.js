import wepy from 'wepy';

export default {
    post(url, data, header = {}) {
        return this.request(url, data, 'POST', header)
    },
    get(url, data, header = {}) {
        return this.request(url, data, 'GET', header)
    },
    request(url, data, method = 'GET', header = {}) {
        return new Promise((resolve, reject) => {
            wepy.request({
                url: url,
                data: data,
                method: method,
                header: header,
                success: function(res) {
                    resolve(res)
                },
                fail: function(error) {
                    reject(error)
                }
            })
        });
    }
}