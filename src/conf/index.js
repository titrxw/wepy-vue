
import wepy from 'wepy'
import devConf from './dev'
// import producationConf from './producation'


wepy.G = devConf;
wepy.G.isApprove = function () {
  if (wepy.G.approveStatus == 3) {
    return true
  } 
  return false
}

export default devConf;