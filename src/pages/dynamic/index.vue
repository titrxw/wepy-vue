

<template>
    <view class="container zan-font-14">
        <image src='{{bannerImg}}'></image>
        <view class="col">
          <repeat for="{{dataList}}" key="index" index="index" item="item">
              <view class="col-4 zan-center" @tap="goPage({{item.path}})">
                  <view class="margin-auto col-img">
                      <image src='{{item.pics}}'></image>
                  </view>
                  <text>{{item.title}}</text>
              </view>
          </repeat>
        </view>
    </view>
</template>
<script>
import page from 'page';
import api from '@/api';
import Tip from 'tip'
export default class Index extends page {
  config = {
    navigationBarTitleText: '我爱我家透明交易'
  };

  data = {
    hasLoad : false,
    bannerImg:'',
    dataList: [
      {
        title: '买卖合同进度查询',
        path: 'contract',
        pics:''
      }
    ]
  };
  methods = {
    goPage(path) {
      if (!this.hasLoad) {
        return false;
      }
      if (!this.G.isApprove()) {
        path = 'authentication';
      }
      this.$navigate({
        url: path
      });
    }
  };

  async mounted() {
    if (!this.G.token) {
      Tip.showLoading();
      let _self = this;
      this.$parent.login(async function(result) {
        result = await api.autoLogin({ openid: _self.G.openId });
        if (result) {
          Tip.hideLoading();
          _self.G.token = result.token;
          _self.G.approveStatus = result.approveStatus;
          _self.hasLoad = true;
          _self.$apply();
        }
      });
    } else {
      this.hasLoad = true;
    }
  }
}
</script>

<style scoped>
@import '/zanui/flex';
.col{
  font-size: 24rpx;
}
image{
  width: 100%;
  height: 365rpx;
  margin-bottom: 10rpx;
}
.col-img image{
  width: 100%;
  height: 100%;
}
.col-img {
  margin-bottom: 10px;
  width: 100rpx;
  height: 100rpx;
}

</style>
