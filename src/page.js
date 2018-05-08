import wepy from 'wepy'
import store from './store'
import router from './router'
class page extends wepy.page {
  constructor() {
    super();
    this.$store = store;
    this.$router = router;
    this.G = wepy.G
  }
}
export default page
