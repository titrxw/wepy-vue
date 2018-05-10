
import wepy from 'wepy'
import store from './store'
// import router from './router'
export default class page extends wepy.page {

  constructor() {
    super();
    this.$store = store;
    // this.$router = router;
  }

  mounted () {

  }

  onLoad (options) {
    this.G = wepy.G
    this.setData('G' , wepy.G)
    this.mounted(options)
  }

  errorToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  }

  successToast (msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  }

  showLoading () {
    wx.showLoading({
      title: '加载中',
    })
  }

  closeLoading () {
    wx.hideLoading()
  }
}
