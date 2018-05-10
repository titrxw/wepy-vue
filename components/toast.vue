<template>
    <view><toast/></view>
</template>
<script>
import wepy from 'wepy'
import ZToast from './zan-toast';
import store from '../store'
import { connect } from 'wepy-redux'
@connect({
  msg(state) {
    return state.sys.msg
  }
})
export default class MToast extends wepy.component {
  components = {
      toast: ZToast
  };
  watch = {
    msg (newVal) {
      if (newVal) {
        this.$invoke('toast', 'showZanToast', {
            title: newVal,
            timeout: 2000
        })
        var timer = setTimeout(function () {
            store.actions.msg('')
            clearTimeout(timer)
        }, 2000);
      }
    }
  }
}
</script>
<style lang="less">
.zan-toast {
  position: fixed;
  top: 35%;
  left: 20%;
  transform: translateZ(0) translateY(-100%);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 14px;
  width: 60%;
  line-height: 1.5em;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  z-index: 100;
}
</style>