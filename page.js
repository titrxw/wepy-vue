
import wepy from 'wepy'
import store from './store'
// import router from './router'
export default class page extends wepy.page {

  constructor() {
    super();
    this.$store = store;
    // this.$router = router;
  }

  mounted (options) {

  }

  onLoad (options) {
    this.setData('G' , wepy.G)
    this.G = wepy.G
    this.mounted(options)
  }
}
