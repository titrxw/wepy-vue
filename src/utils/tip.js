import wepy from 'wepy'
export default {
  errorToast(msg, duration = 2000) {
    return this.toast(msg,'none', duration)
  },

  successToast(msg, duration = 2000) {
    return this.toast(msg,'success', duration)
  },

  toast(msg, icon = 'none', duration = 2000) {
    return new Promise(function (resolve, reject) {
      wepy.showToast({
        title: msg,
        icon: icon,
        duration: duration,
        success () {
          setTimeout(function () {
            resolve(true)
          }, duration)
        },
        fail () {
          resolve(false)
        }
      })
    })
  },

  showLoading(title = '加载中') {
    wepy.showLoading({
      title: title,
    })
  },

  hideLoading() {
    wepy.hideLoading()
  },

  /**
   * 弹出确认窗口
   */
  modal(text, title = '提示') {
    return new Promise((resolve, reject) => {
      wepy.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          if (!res.cancel) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail: res => {
          resolve(false)
        }
      })
    })
  },

  /**
   * 弹出确认窗口
   */
  confirm(text, title = '提示') {
    return new Promise((resolve, reject) => {
      wepy.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (!res.cancel) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail: res => {
          resolve(false)
        }
      })
    })
  }
}
