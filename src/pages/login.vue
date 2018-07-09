<template>
  <view class="background-fff full-height" style=" overflow-x: hidden">
      <view class="zan-cell cell--without-border::after zan-field title">
        <text>登录</text>
      </view>
      <view class="zan-cell zan-field">
        <input
          type="number"
          placeholder="请输入账号"
          bindinput="bindMobileInput"
          class="zan-field__input zan-cell__bd"/>
      </view>
      <view class="zan-cell zan-field">
        <input
          type="text"
          placeholder="请输入短信验证码"
            bindinput="bindCodeInput"
          class="zan-field__input zan-cell__bd"/>
        <view class="zan-cell__ft">
          <text  disabled="{{hasSend}}" @tap="sendMsg">{{ sendMsgBtnText }}</text>
        </view>
      </view>
      <view class="zan-btns">
        <button class="loginBtn" @tap="submit">登录</button>
      </view>
    </view>
</template>
<script>
import page from 'page';
import api from '@/api/auth';
import Validate from '@/libs/validate'
import Tip from 'tip'
export default class Login extends page {
  config = {
    navigationBarTitleText: '登录',
    requireLogin: false
  };
  data = {
    hasSend: false,
    sendMsgBtnText: '获取验证码',
    form: {
      mobile: '',
      code: '',
      openid: ''
    }
  };
  methods = {
    async sendMsg() {
      if (this.hasSend) {
        return false;
      }
      let msg = '';
      if (!Validate.isMobile(this.form.mobile)) {
        msg = '请输入正确的手机号码';
      }
      if (msg) {
        Tip.errorToast(msg);
        return false;
      }

      Tip.showLoading()
      this.hasSend = true;
      let result = await api.sendMsg(this.form.mobile);
      Tip.hideLoading()
      if (result) {
        var sec = 60;
        this.sendMsgBtnText = sec + 's后重新获取';
        this.$apply();
        --sec;
        var _self = this;
        var timer = setInterval(function() {
          if (sec == 0) {
            _self.hasSend = false;
            _self.sendMsgBtnText = '获取验证码';
            clearInterval(timer);
          } else {
            _self.sendMsgBtnText = sec + 's后重新获取';
          }
          --sec;
          _self.$apply();
        }, 1000);
      } else {
        this.hasSend = false
      }
    },
    bindMobileInput (e) {
      this.form.mobile = e.detail.value;
    },
    bindCodeInput(e) {
      this.form.code = e.detail.value;
    },
    async submit() {
      let msg = '';
      if (!Validate.isMobile(this.form.mobile)) {
        msg = '请输入正确的手机号码';
      } else if (!this.form.code) {
        msg = '请输入手机验证码';
      }
      if (msg) {
        Tip.errorToast(msg);
        return false;
      }

      if (!this.form.code) {
        return false;
      }
      let result = await api.register(this.form);
      if (result) {
        this.$redirect({
          url: 'index'
        })
      }
    }
  };
}
</script>
<style scoped>
@import '/zanui/btn';
@import '/zanui/cell';
.title{
  margin-top: 190rpx;
  font-size: 65rpx;
 
}
.loginBtn{
  background: #444444;
  color: #fff;
}
</style>

