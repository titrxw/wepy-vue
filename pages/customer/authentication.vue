
<template>
  <view class="container">
    <view class="zan-cell cell--without-border background-fff">
      <view class="zan-cell__bd">认证通过</view>
    </view>
    <view @tap="takePhoto">
        <image style="width: 100%; height: 200px; background-color: #eeeeee;"  src="{{pic == '' ? '' : G.imgHost + pic}}"></image>
    </view>
    <view class="zan-panel">
      <view class="zan-cell">
        <view class="zan-cell__bd">姓名</view>
        <view class="zan-cell__ft">{{form.real_name}}</view>
      </view>
      <view class="zan-cell">
        <view class="zan-cell__bd">证件类型</view>
        <view class="zan-cell__ft">身份证</view>
      </view>
      <view class="zan-cell">
        <view class="zan-cell__bd">身份证号</view>
        <view class="zan-cell__ft">{{form.id_number}}</view>
      </view>
    </view>
    <view class="zan-btns">
        <button class="zan-btn zan-btn--primary" @tap="submit">提交</button> 
    </view>
  </view>
</template>

<script>
import page from 'page';
import api from '../../api';
import Validate from '../../libs/validate'
export default class Auth extends page {
  config = {
    navigationBarTitleText: '实名认证'
  };
  data = {
    pic: '',
    form: {
      real_name: '',
      id_number: ''
    }
  };
  methods = {
    takePhoto() {
      let _self = this
      wx.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          _self.showLoading()
          wx.uploadFile({
            url: _self.G.uploadHost,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              token: _self.G.token
            },
            success: async function(res) {
                try{
                    res = JSON.parse(res.data)
                    _self.pic = res.data.url
                    _self.$apply()
                } catch (e) {
                    res = ''
                }
                
                if (res.data.url) {
                  let result = await api.faceAuthCard({image_url: _self.G.imgHost + res.data.url})
                  _self.closeLoading()
                  if (result.cards[0] && result.cards[0].id_card_number) {
                    _self.form.real_name = result.cards[0].name;
                    _self.form.id_number = result.cards[0].id_card_number;
                    _self.$apply()
                  } else {
                    _self.errorToast('请上传正确的身份证正面照')
                  }
                }
              
            },
            fail: function(err) {
              console.log(err);
            }
          });
        }
      });
    },
    async submit () {
      let msg = ''
      if (!this.form.id_number || !this.form.real_name) {
        msg = '请上传身份证正面照'
      } else if (!Validate.isIdCard(this.form.id_number)) {
        msg = '身份证号错误'
      }
      if (msg) { 
        this.errorToast(msg)
        return false;
      }
      let result = await api.personAuth(this.form)
      if (result) {
        this.G.approveStatus = 3
        this.successToast('实名认证成功')
        this.$redirect({
          url: 'auth_success'
        })
      }
    }
  };
}
</script>
<style lang="css">
@import '/zanui/btn';
@import '/zanui/cell';
@import '/zanui/panel';
</style>
