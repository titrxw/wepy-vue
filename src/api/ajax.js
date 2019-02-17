import wepy from 'wepy';

export default {
  post(url, data, header = {}) {
    return new Promise((resolve, reject) => {
      wepy.request({
        url: url,
        data: data,
        method: 'POST',
        header: {
          ...header
        },
        success: function (res) {
          resolve(res)
        },
        fail: function (error) {
          reject(reject)
        }
      })
    });
  },
  get(url, data, header = {}) {
    return new Promise((resolve, reject) => {
      wepy.request({
        url: url,
        data: data,
        method: 'GET',
        header: header,
        success: function (res) {
          resolve(res)
        },
        fail: function (error) {
          reject(reject)
        }
      })
    });
  }
}
