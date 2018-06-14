export default {
  errorToast(msg, icon = 'none', duration = 2000) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: duration
    })
  },

  successToast (msg, duration = 2000) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: duration
    })
  },

  showLoading () {
    wx.showLoading({
      title: '加载中',
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
  }
}