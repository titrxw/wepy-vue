<template>
  <panel>
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
          <button class="zan-btn zan-btn--mini zan-btn--primary" disabled="{{hasSend}}" @tap="sendMsg">{{ sendMsgBtnText }}</button>
        </view>
      </view>
      <view class="zan-btns">
        <button @tap="submit">登录</button>
      </view>
    </panel>
</template>
<script>
import page from 'page';
import Panel from '../../components/panel';
import api from '../../api';
import Validate from '@/libs/validate'
export default class Login extends page {
  components = {
    panel: Panel
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
      let msg = '';
      if (!Validate.isMobile(this.form.mobile)) {
        msg = '请输入正确的手机号码';
      }
      if (msg) {
        this.errorToast(msg);
        return false;
      }

      this.hasSend = true;
      let result = await api.sendMsg({
        mobile: this.form.mobile
      });
      if (result) {
        let sec = 59;
        let _self = this;
        var timer = setInterval(function() {
          if (sec == 0) {
            _self.hasSend = false;
            _self.sendMsgBtnText = '获取验证码';
            clearInterval(timer);
          } else {
            _self.sendMsgBtnText = sec + '后重新获取';
          }
          --sec;
          _self.$apply();
        }, 1000);
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
      if (!/^1[3456789]\d{9}$/.test(this.form.mobile)) {
        msg = '请输入正确的手机号码';
      } else if (!this.form.code) {
        msg = '请输入手机验证码';
      }
      if (msg) {
        this.errorToast(msg);
        return false;
      }

      if (!this.form.code) {
        return false;
      }
      this.form.openid = this.G.openId;
      let result = await api.register(this.form);
      if (result) {
        this.G.token = result.token
        this.G.approveStatus = result.approveStatus
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
</style>

