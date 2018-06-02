
import wepy from 'wepy'
// import devConf from './dev'
import conf from './producation'

wepy.G = conf;
wepy.G.isApprove = function () {
  if (wepy.G.approveStatus == 3) {
    return true
  } 
  return false
}

export default conf;