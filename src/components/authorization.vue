<template>
<view wx-if='{{show}}' class="blackBg">
  <view class="box">
    <view class="font_30 marginT_38">登录并授权</view>
    <view class="marginT_40 color-136">申请获取以下权限</view>
    <view class="marginT_20 color-136">获得你的公开信息（昵称，头像）</view>
    <button plain class="btn"  open-type="getUserInfo" bindgetuserinfo="authorization">允许</button>
  </view>
</view>
</template>

<script>
import G from '@/conf'
import wepy from 'wepy';
export default class Authorization extends wepy.component {
  data = {
    show: false
  }
  methods= {
    authorization(e){
      if(e.detail.userInfo){
        this.show = false;
        G.userInfo = e.detail.userInfo
        this.$emit('success')
      }else{
        this.$emit('error')
      }
    }
  }
  onLoad () {
      this.show = false
      if (G.userInfo) {
        return true
      }

      let self = this
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                G.userInfo = res.getUserInfo
                self.$emit('getUserInfo')
              },
              fail () {
                self.show = true
                self.$apply()
              }
            });
          } else {
            self.show = true
            self.$apply()
          }
        },
        fail () {
          self.show = true
          self.$apply()
        }
      });
  }
}
</script>
<style scoped>
.blackBg{
  font-size: 26rpx;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0,.4);
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100%;
  overflow: hidden;
}
.box{
  width: 500rpx;
  position: relative;
  height: 355rpx;
  background:#fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn{
  position: absolute;
  height: 75rpx;
  line-height: 75rpx;
  width: 100%;
  font-size: 30rpx;
  background: #ccc;
  color: #1AAD16;
  text-align: center;
  border-radius: 0;
  bottom: 0;
  border: none;
}
</style>