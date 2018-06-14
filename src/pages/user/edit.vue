<template>
  <view>
    <view class="zan-panel">
      <view class="zan-cell">
        <text class="zan-cell__bd">头像</text>
        <view class="zan-cell__ft" @tap="editHeadPic">
          <image class="user-head-thumb" src="{{ G.imgHost + userInfo.pic }}"></image>
        </view>
        <view class="zan-cell__ft zan-arrow">
        </view>
      </view>
    </view>
    <view class="zan-panel">
      <view class="zan-cell">
        <view class="zan-icon zan-cell__icon zan-icon-phone"></view>
        <text class="zan-cell__bd">{{ userInfo.mobile }}</text>
      </view>
      <view class="zan-cell">
        <view class="zan-icon zan-cell__icon zan-icon-phone"></view>
        <text class="zan-cell__bd">{{ userInfo.email }}</text>
        <view class="zan-cell__ft zan-arrow">
        </view>
      </view>
    </view>
    <view class="zan-panel mb20">
      <view class="zan-cell">
        <text class="zan-cell__bd">昵称</text>
        <text class="zan-cell__ft ">{{ userInfo.nick_name }}</text>
        <text class="zan-cell__ft zan-arrow"></text>
      </view>
      <view class="zan-cell">
        <text class="zan-cell__bd">性别</text>
        <text class="zan-cell__ft">{{ userInfo.sex }}</text>
        <text class="zan-cell__ft zan-arrow"></text>
      </view>
      <view class="zan-cell">
        <text class="zan-cell__bd">微信号</text>
        <text class="zan-cell__ft">{{ userInfo.wechat }}</text>
        <text class="zan-cell__ft zan-arrow"></text>
      </view>
      <view class="zan-cell">
        <text class="zan-cell__bd">地区</text>
        <text class="zan-cell__ft ">{{ userInfo.county }}</text>
        <text class="zan-cell__ft zan-arrow"></text>
      </view>
      <view class="zan-cell">
        <text class="zan-cell__bd">公司</text>
        <text class="zan-cell__ft ">{{ userInfo.company }}</text>
        <text class="zan-cell__ft zan-arrow"></text>
      </view>
      <view class="zan-cell">
        <text class="zan-cell__bd">职位</text>
        <text class="zan-cell__ft ">{{ userInfo.job }}</text>
        <text class="zan-cell__ft zan-arrow"></text>
      </view>
      <view class="zan-cell">
        <text class="zan-cell__bd">公司地址</text>
        <text class="zan-cell__ft ">{{ userInfo.address }}</text>
        <text class="zan-cell__ft zan-arrow"></text>
      </view>
    </view>
    <view class="user-sign mb20">
      <text class="zan-panel-title">个性签名</text>
      <view class="zan-panel">
        <textarea class="padding-30" placeholder="请输入您的个性签名" />
      </view>
    </view>
    <view class="user-sign mb20">
      <text class="zan-panel-title">照片展示</text>
      <view class="zan-panel">
        <repeat for="{{userInfo.descs}}" key="index" index="index" item="item">
          <image bindlongtap="delPic({{ index }})" mode="widthFix" src="{{ G.imgHost + item }}"></image>
        </repeat>
        <view class="zan-btns">
          <button class="zan-btn--primary" @tap="addpics">添加照片</button>
          <button class="zan-btn--primary" @touchstart="startRadio" @touchend ="endRadio">录音</button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import Tip from 'tip'
import wepy from 'wepy'
import page from 'page'
export default class Edit extends page {
  data = {
    userInfo: {
      pic: 'contractB/20180614/6dad3e5512b6e10d82e22dbc79faba68.jpg',
      name: '任雄伟',
      job: 'php程序员',
      company: '太原相寓',
      views: 1,
      stars: 1,
      mobile: '15903466276',
      wechat: '',
      email: '1120309488@qq.com',
      address: '山西省太原市',
      descs: []
    }
  };
  methods = {
    addpics () {
      let self = this
      wx.chooseImage({
        success: function(res) {
          res.tempFiles.forEach(element => {
            if (self.G.uploadFileSize * 1024 < element.size) {
              Tip.errorToast('文件太大, 不能超过 ' + (self.G.uploadFileSize / 1024) + 'M.')
              return false;
            }
            Tip.showLoading()
            wepy.uploadFile({
              url: self.G.uploadHost,
              filePath: element.path,
              success: function(res) {
                if (res) {
                  self.userInfo.descs.push(res);
                  self.$apply();
                }
              },
              complete: function () {
                Tip.hideLoading()
              }
            });
          });
        }
      });
    },
    editHeadPic () {
      let self = this
      wx.chooseImage({
        count: 1,
        success: function(res) {
          let element = res.tempFiles[0]
          if (self.G.uploadFileSize * 1024 < element.size) {
            Tip.errorToast('文件太大, 不能超过 ' + (self.G.uploadFileSize / 1024) + 'M.')
            return false;
          }
          Tip.showLoading()
          wepy.uploadFile({
            url: self.G.uploadHost,
            filePath: element.path,
            success: function(res) {
              if (res) {
                self.userInfo.pic=res;
                self.$apply();
              }
            },
            complete: function () {
              Tip.hideLoading()
            }
          });
        }
      });
    },
    delPic (index) {
      let self = this
      wx.showModal({
          title: '提示',
          content: '确认删除该图片？',
          success:async function (res) {
            if (res.confirm) {
                self.userInfo.descs = self.userInfo.descs
                .slice(0, index)
                .concat(self.userInfo.descs.slice(index + 1, self.userInfo.descs.length));
                self.$apply()
            }
          }
      })
    },
    startRadio () {
      wx.startRecord({
        success: function(res) {
          var tempFilePath = res.tempFilePath 
          console.log(tempFilePath)
          wx.playVoice({
            filePath: tempFilePath,
            complete: function(){
            }
          })
        },
        fail: function(res) {
          //录音失败
        }
      })
    },
    endRadio () {
       wx.stopRecord()
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../zanui/panel.scss';
@import '../../zanui/cell.scss';
@import '../../zanui/btn.scss';
@import '../../zanui/icon.scss';
.user-head-thumb{
  width:150rpx;
  height:150rpx;
  border-radius:100%;
}
</style>