<template>
  <view class="container">
    <layout>
      <view class="banner">
        <swiper indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
          <block wx:for="{{imgUrls}}">
            <swiper-item>
              <image mode='scaleToFill' src="{{item}}" class="slide-image"/>
            </swiper-item>
          </block>
        </swiper>
      </view>

      <view class="content">
        <view class="mb10">{{goods.name}}</view>
        <view class="priceinfo">
          <view class="zan-capsule zan-capsule--danger">
            <view class="zan-capsule__right">特权折扣价</view>
          </view>
          <view class="color-red">￥{{goods.price}}</view>
          <view class="disable_text ml10">￥{{goods.costPrice}}</view>
        </view>
      </view>
      <view class="title-text">商品详情</view>
      <image mode='widthFix' src='../../assets/images/shop/1.png'></image>

      <view slot="tabbar" class="footer">
          <view class="iconflex">
            <view class="zan-icon zan-icon-gift iconStyle"></view>
            <view class="iconText">商城首页</view>
          </view>
          <view class="iconflex">
            <view class="zan-icon zan-icon-phone iconStyle"></view>
            <view class="iconText">咨询</view>
          </view>
          <view class="row">
            <view @tap='order(1)' class="payText color-car">加入购物车</view>
            <view @tap='order(2)' class="payText color-buy">立即购买</view>
          </view>
      </view>
    </layout>
    <popup :show.sync='show'>
      <view class="popBox">
        <view @tap='popHide' class="zan-icon zan-icon-close iconClose"></view>
        <view class="popTop">
          <image src='{{imgUrls[0]}}'></image>
          <view>
            <text class="color-red">￥1760</text>
            <text class="disable_text">￥2000</text>
          </view>
          <!-- <view>已选择“默认”</view> -->
        </view>
        <view class="popMain">
          <view class="popMain-t">
            <view>商品规格</view>
            <view class="zan-capsule zan-capsule--danger">
              <view class="zan-capsule__left">默认</view>
            </view>
          </view>

          <view class="zan-cell">
            <view class="zan-cell__bd">
              <view class="zan-cell__text">购买数量</view>
              <view class="zan-cell__desc">库存:98件</view>
            </view>
            <view class="zan-cell__ft">
              <zanStepper :stepper.sync="stepper" :min="min" :max="max" componentId="stepper" size="small"> </zanStepper>
            </view>
          </view>

        </view>
        <view class="popBottom">
          确定
        </view>
      </view>
    </popup>
  </view>
</template>

<script>
import page from 'page';
import Layout from '@/components/layout';
import popup from '@/components/zan-popup';
import stepper from '@/components/zan-stepper';
export default class Detail extends page {
  components = {
    layout:Layout,
    zanStepper:stepper,
    popup:popup
  };
  data = {
    stepper: 10,
    min: 1,
    max: 20,
    show:false,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    goods:{
      name:'人工智能名片  20人商务版  （系统搭建费定金）',
      price:1760,
      costPrice:2000
    },
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  };
  popShow(){
    this.show=true;
  }
  popHide(){
    this.show=false;
  }
  events = {
    zanStepperChange({ componentId, stepper }, event) {
      // console.log(componentId, stepper, event)
      this[componentId] = stepper
      this.$apply()
    }
  }
  methods = {
    // 1购物车   2购买
    order(type){
      this.popShow();
    }
  }
}
</script>
<style scoped>
@import '/zanui/icon';
@import '/components/zan-capsule';
@import '/zanui/cell';
.banner{
  padding: 20rpx;
}
swiper{
  height: 655rpx;
}
.content{
  padding: 20rpx;
}
.banner image{
  border-radius: 10rpx;
  width: 100%;
  height: 100%;
}
.priceinfo{
  display: flex;
}
.footer{
    padding-left:20rpx;
    width: 100%;
    height: 88rpx;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
}
.payText{
    color: #fff;
    height: 100%;
    line-height: 88rpx;
    width: 250rpx;
    text-align: center;
    
}
.color-buy{
  background: red;
}
.color-car{
  background: #FEA509;
}
.iconflex{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.iconStyle{
  font-size: 30rpx;
  color: #959595;
}
.iconText{
  color: #959595;
  font-size: 26rpx;
}
.title-text{
  height: 100rpx;
  border-top: 1rpx solid #E6E6E6;
  text-align: center;
  line-height: 100rpx;
}
.popBox{
  border-radius: 20rpx;
  width:700rpx;
  height:1100rpx;
  background: #fff;
}
.popTop{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popBox image{
  margin: 40rpx 0;
  width: 450rpx;
}
.iconClose{
  position: absolute;
  top: 10rpx;
  right: 20rpx;
  color: #ccc;
  font-size: 45rpx;
}
.popMain-t{
  padding: 0 15px;
  padding-bottom: 15px;
  border-bottom:  1rpx solid #E6E6E6;
}
.popBottom{
  width: 100%;
  padding: 25rpx 0;
  background: red;
  text-align: center;
  font-size: 33rpx;
  color: #fff;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
}
</style>
