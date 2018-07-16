<template>
    <view>
      <!-- <authorization @success.user="" @error.user="" @getUserInfo.user=""></authorization> -->
      <authorization ></authorization> 
      <view class="icon">
        <view @tap="goPage('shopCart')" class="zan-icon zan-icon-cart mr20 font-ico"></view>
          <view @tap="goPage('orderList')" class="zan-icon zan-icon-pending-orders mr20 font-ico"></view>
        <button open-type="share" class="zan-icon zan-icon-wap-nav mr20 font-ico" style="margin-right:20rpx">
        <!-- <view @tap='onShareAppMessage' class="zan-icon zan-icon-wap-nav mr20 font-ico"></view> -->
        </button>
      </view>
      <view class="title">
        <image src='{{banner}}'></image>
      </view>
      <view>
        <view class="zan-panel-title">
          
        </view>
        <view class="list zan-panel" style="background: #f5f5f5;">
          <repeat for='{{pageData}}' key="index" index='index' item='item'>
            <view class="list-child" @tap="goPage('detail',{{ item.id }})">
                <view class="list_banner">
                  <image src='{{G.apiHost}}{{item.thumb}}'></image>
                </view>
                <view class="list_content">
                  <view class="goodstitle">{{item.title}}</view>
                  <view class="disable_text mt10">￥{{item.sell_price}}</view>
                  <view class="goodstitle">￥{{item.sell_price}}</view>
                  <view class="goodstitle">{{item.content}}</view>
                </view>
            </view>
          </repeat>
       
        </view>
      </view>
        <!-- <repeat for="{{goods}}" key="index" index="index" item="item">
          <GoodsItem :goods.sync="item"/>
        </repeat> -->

    </view>
</template>
<script>
import page from 'page';
import authorization from '@/components/authorization'
// import api from '@/api';
// import GoodsItem from './good-item';
import pagination from '@/mixin/pagination'
export default class Index extends page {
  config = {
    navigationBarTitleText: '商城'
  };
  components = {
    authorization
    // GoodsItem
  };
  data = {
    banner:'https://webwx.aijiatui.com/website-new/img/section1-left.jpg'
  };
  onShareAppMessage(){
    console.log('已转发')
  }
  methods = {
    goPage(page,id) {
      console.log(id);
      wx.navigateTo({
        url: './'+page+'?id=' + id
      })
    },
    shareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
    }
  };

  getData(params) {
    // return api.goodsList(params)
  }
  async onShow() {
    if (this.isMounted) {
      this.reload()
    }
  }

  mixins = [pagination];
}
</script>

<style lang="scss"  scoped>
@import '../zanui/icon.scss';
@import '../zanui/panel.scss';
button{
  margin: 0;
  padding: 0;
}
.font-ico{
  color:#fff;
  font-size:35rpx;
  border-radius:50%;
  background:#636363;
  width:55rpx;
  height:55rpx;
  text-align:center;
  line-height:55rpx;

}
.icon{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position:fixed;
  top:20rpx;
  z-index: 100;
}
.title {
  width: 100%;
  height: 300rpx;
}

.title image {
  width: 100%;
  height: 100%;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.list-child {
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
  width: 47.1%;
  margin: 10rpx;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
  background: #fff;
}
.list_banner {
  width: 100%;
  height: 330rpx;
}
.list_banner image {
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
  width: 100%;
  height: 100%;
}
.list_content {
  padding: 15rpx;
}
.goodstitle {
  font-size: 26rpx;
}

</style>
