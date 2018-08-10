import wepy from 'wepy'
export default {
  errorToast(msg) {
    wepy.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  successToast (msg) {
    wepy.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  },

  toast (msg, icon = 'none', duration = 2000) {
    wepy.showToast({
      title: msg,
      icon: icon,
      duration: duration
    })
  },

  showLoading (title = '加载中') {
    wepy.showLoading({
      title: title,
    })
  },

  hideLoading () {
    wepy.hideLoading()
  },

    /**
   * 弹出确认窗口
   */
  modal (text, title = '提示') {
    return new Promise((resolve, reject) => {
      wepy.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          resolve(false)
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
  confirm (text, title = '提示') {
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