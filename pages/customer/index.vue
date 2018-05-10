<template>
    <view class="container padding-15 zan-font-14">
        <view class="col">
            <repeat for="{{dataList}}" key="index" index="index" item="item">
                <view class="col-4 zan-center" @tap="goPage({{item.path}})">
                    <view class="margin-auto col-img">
                        <image src=''></image>
                    </view>
                    <text>{{item.title}}</text>
                </view>
            </repeat>
        </view>
        <Foot></Foot>
    </view>
</template>
<script>
import page from 'page';
import Foot from '../foot';
import api from '@/api';
export default class Index extends page {
  components = {
    Foot
  };
  config = {
    navigationBarTitleText: '工作台'
  };

  data = {
    dataList: [
      {
        title: '买卖合同进度查询',
        path: 'contract'
      }
    ]
  };
  methods = {
    goPage(path) {
      if (!this.G.isApprove()) {
        path = 'authentication';
      }
      this.$navigate({
        url: path
      });
    }
  };

  async mounted() {
      console.log(this.G)
    if (!this.G.token) {
      wx.showLoading();
      let _self = this;
      this.$parent.login(async function() {
        let result = await api.autoLogin({ openid: _self.G.openId });
        if (result) {
          wx.hideLoading();
          _self.G.token = result.token;
          _self.G.approveStatus = result.approveStatus;
        }
      });
    }
  }
}
</script>

<style scoped>
@import '/zanui/flex';
.col-img {
  margin-bottom: 10px;
  border: 1rpx solid #ccc;
  width: 55rpx;
  height: 55rpx;
}
</style>
