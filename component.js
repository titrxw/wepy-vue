import wepy from 'wepy'
import store from './store'
// import router from './router'
class page extends wepy.component {
  constructor() {
    super();
    this.$store = store;
    // this.$router = router;
  }
  
  mounted (options) {
    
  }

  onLoad (options) {
    // 这两行的顺序不能反  暂时不清楚
    this.setData('G' , wepy.G)
    this.G = wepy.G
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
export default page
