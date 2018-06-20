import wepy from 'wepy'
export default class page extends wepy.page {
  constructor() {
    super();
  }

  mounted(options) {

  }

  render(options) {
    this.setData('G', wepy.G)
    this.G = wepy.G
    this.mounted(options)
  }

  onLoad(options) {
    if (this.config && this.config.requireTabbar) {
      wx.showTabBar()
    } else{
      wx.hideTabBar()
    }
    if (this.config && this.config.requireLogin) {
      let self = this
      this.$parent.autoLogin(function () {
        self.render(options)
      })
    } else {
      this.render(options)
    }
  }
}
