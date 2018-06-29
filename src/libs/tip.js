export default {
  errorToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  successToast (msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  },

  toast (msg, icon = 'none', duration = 2000) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: duration
    })
  },

  showLoading (title = '加载中') {
    wx.showLoading({
      title: title,
    })
  },

  hideLoading () {
    wx.hideLoading()
  },

    /**
   * 弹出确认窗口
   */
  modal (text, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },

  /**
   * 弹出确认窗口
   */
  confirm (text, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res);
        }
      })
    })
  }
}