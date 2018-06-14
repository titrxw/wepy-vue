<template>
  <view>
      <view class="card container border-radius-10 pb20 card-shadow">
        <view class="card-pic">
          <image mode="widthFix" src="{{ userInfo.pic }}"></image>
          <view class="card-edit ab-icon" @tap="edit">编辑</view>
          <view class="fold ab-icon" @tap="cards">名片夹</view>
        </view>
        <view class="card-desc pb10">
          <view class="card-name"><text class="xxl ">{{ userInfo.name }}</text></view>
          <view class="card-job "><text class="muted sm">{{ userInfo.job }}</text></view>
          <view class="card-company "><text class="sm">{{ userInfo.company }}</text></view>
        </view>
        <view class="card-operate col mt20 mb20">
          <view class="card-views col-4 text-center">
            <view class="zan-icon zan-icon-browsing-history o-icon"></view>
            <view>人气：1847</view>
          </view>
          <view class="card-stars col-4 text-center">
            <view class="zan-icon zan-icon-like-o o-icon"></view>
            <view>靠谱：1847</view>
          </view>
          <view class="card-share col-4 text-center" @tap="share">
            <view class="zan-icon zan-icon-browsing-history o-icon"></view>
            <view>转发：1847</view>
          </view>
        </view>
      </view>
      <view class="user-info mb20">
        <text class="zan-panel-title">个人信息</text>
        <view class="zan-panel">
          <view class="zan-cell">
            <text class="zan-cell__bd">手机</text>
            <text class="zan-cell__ft" @tap="call">{{ userInfo.mobile }}</text>
            <text class="zan-icon zan-cell__ft zan-icon-phone info-icon"></text>
          </view>
          <view class="zan-cell">
            <text class="zan-cell__bd">微信</text>
            <text class="zan-cell__ft" @tap="copy({{ userInfo.wechat }})">{{ userInfo.wechat }}</text>
            <text class="zan-icon zan-cell__ft zan-icon-wechat info-icon"></text>
          </view>
          <view class="zan-cell">
            <text class="zan-cell__bd">邮箱</text>
            <text class="zan-cell__ft" @tap="copy({{ userInfo.email }})">{{ userInfo.email }}</text>
            <text class="zan-icon zan-cell__ft zan-icon-phone info-icon"></text>
          </view>
          <view class="zan-cell">
            <text class="zan-cell__bd">公司</text>
            <text class="zan-cell__ft" @tap="copy({{ userInfo.company }})">{{ userInfo.company }}</text>
            <text class="zan-icon zan-cell__ft zan-icon-phone info-icon"></text>
          </view>
          <view class="zan-cell">
            <text class="zan-cell__bd">地址</text>
            <text class="zan-cell__ft" @tap="copy({{ userInfo.address }})">{{ userInfo.address }}</text>
            <text class="zan-icon zan-cell__ft zan-icon-location info-icon"></text>
          </view>
          <view class="zan-btns">
            <button class="zan-btn--primary" @tap="addPhoneContact">同步到通讯录</button>
          </view>
        </view>
      </view>
      <view class="user-sign mb20">
        <text class="zan-panel-title">个性签名</text>
        <view class="zan-panel">
          <view class="zan-cell">
            <text class="zan-cell__bd">手机</text>
            <text class="zan-cell__ft">{{ userInfo.mobile }}</text>
          </view>
        </view>
      </view>
      <view class="user-desc">
        <text class="zan-panel-title">图片展示</text>
        <view  class="zan-panel">
          <repeat for="{{userInfo.descs}}" key="index" index="index" item="item">
            <image mode="widthFix" src="{{item }}"></image>
          </repeat>
        </view>
      </view>
      <PopView :show.sync="showPop" direction="bottom">
        <view class="card-operate col mt20 mb20">
          <button open-type="share" style="border:none;" plain class="card-views col-6 text-center">
              <view class="zan-icon zan-icon-browsing-history o-icon"></view>
            <view>转发到朋友或群聊</view>
          </button>
          <button @tap="shareCard" style="border:none;" plain class="card-views col-6 text-center">
            <view class="zan-icon zan-icon-like-o o-icon"></view>
            <view>生成名片海报</view>
          </button>
        </view>
      </PopView>
  </view>
</template>
<script>
import page from 'page';
import api from '@/api';
import Tip from 'tip';
import PopView from '@/components/zan-popup'
export default class Index extends page {
  config = {
    navigationBarTitleText: '我的名片',
    // requireLogin: true    如果需要登录的话在这里配置该参数
  };
  components = {
    PopView
  }
  data = {
    showPop: false,
    userInfo: {
      pic: 'https://webwx.aijiatui.com/website/cover/2018/5/5/31fe687ab271032f6fdb5e885c5bf6b7.jpg',
      name: '任雄伟',
      job: 'php程序员',
      company: '太原相寓',
      views: 1,
      stars: 1,
      mobile: '15903466276',
      wechat: '',
      email: '1120309488@qq.com',
      address: '山西省太原市',
      descs: [
        'https://webwx.aijiatui.com/website/cover/2018/5/5/31fe687ab271032f6fdb5e885c5bf6b7.jpg',
        'https://16625660.s21i.faiusr.com/2/ABUIABACGAAg_PPY2AUooNbMuQIwqwI4wAM!400x400.jpg'
      ]
    }
  };

  onShareAppMessage (res) {
    // if (res.from === 'button') {
 
    // }
    return {
      title: this.data.userInfo.name + ' ' + this.data.userInfo.company + '-' + this.data.userInfo.job,
      path: '/page/user/index?id=123',
      imageUrl: this.data.userInfo.pic
    }
  }

  methods =  {
    addPhoneContact () {
      wx.addPhoneContact({
        firstName: this.userInfo.name,
        mobilePhoneNumber: this.userInfo.mobile,
        weChatNumber: this.userInfo.wechat,
        organization: this.userInfo.company,
        title: this.userInfo.job,
        email: this.userInfo.email,
        addressStreet: this.userInfo.address,
        remark: this.userInfo.company + ' - ' + this.userInfo.job,
        success: function () {
          Tip.successToast('联系人添加成功')
        },
        fail: function () {
          Tip.errorToast('联系人添加失败')
        }
      })
    },
    call () {
      wx.makePhoneCall({
        phoneNumber: this.userInfo.mobile
      })
    },
    copy (data) {
      wx.setClipboardData({
        data: data,
        success: function(res) {
          Tip.successToast('复制成功')
        }
      })
    },
    edit () {
      this.$navigate({
        url: 'edit'
      })
    },
    cards () {
      this.$navigate({
        url: 'cards'
      })
    },
    share () {
      this.showPop = true
    },
    shareCard () {
      this.showPop = false
      this.$navigate({
        url: 'shareCard'
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../zanui/icon.scss';
@import '../../zanui/flex.wxss';
@import '../../zanui/panel.scss';
@import '../../zanui/cell.scss';
@import '../../zanui/btn.scss';
.card{
  margin: 30rpx;
  .card-pic{
    .ab-icon{
      position:absolute;
      top:50rpx;
      right:50rpx;
    }
    .fold{
      top:120rpx;
    }
  }
  .card-desc{
    text-align:center;
    .card-name, .card-job, .card-company{
      height:50rpx;
      line-height:50rpx;
    }
  }
}
.card-shadow{
  box-shadow:0px 10px 15px #ccc;
}
.card-operate{
  .o-icon{
    height:65rpx;
    font-size:45rpx;
  }
}
.user-info{
  .info-icon{
    margin-left:15rpx;
  }
}

</style>
