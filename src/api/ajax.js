import wepy from 'wepy';

var throttle = {}

export default {
  post(url, data, header = {}) {
    return this.request(url, data, 'POST', header)
  },
  get(url, data, header = {}) {
    return this.request(url, data, 'GET', header)
  },
  request(url, data,method = 'GET', header = {}) {
    // 防止重复提交 暂时这样处理
    let flag = url + '&' + method
    if (throttle[flag]) {
      return false;
    }
    throttle[flag] = true
    return new Promise((resolve, reject) => {
      wepy.request({
        url: url,
        data: data,
        method: method,
        header: header,
        success: function (res) {
          resolve(res)
        },
        fail: function (error) {
          reject(error)
        },
        complete: function () {
          let throttleTime = setTimeout(function () {
            delete throttle[flag]
            clearTimeout(throttleTime)
          }, 1000)
        }
      })
    });
  }
}
