<template>
<view  class="blackBg">
  <view class="box">
    <view class="font_30 marginT_38">登录并授权</view>
    <view class="marginT_40 color-136">申请获取以下权限</view>
    <view class="marginT_20 color-136">获得你的公开信息（昵称，头像）</view>
    <button plain class="btn"  open-type="getUserInfo" bindgetuserinfo="authorization">允许</button>
  </view>
</view>
</template>

<script>
import page from 'page'
import user from '@/api/user';
export default class Authorization extends page {
  methods= {
    async authorization(e){
      if(e.detail.userInfo){
        let result = await user.userSureAuth(e.detail);
        if (result) {
          user.login(result)
          // 获取之前的保存的地址
          // this.$redirect()
        }
      }else{
        return false;
      }
    }
  }
}
</script>
<style scoped>
.blackBg{
  z-index: 100;
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