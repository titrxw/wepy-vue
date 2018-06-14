<template>
<view>
  <block wx:for="{{stars}}">
    <image class="star-image" style="left: {{item*size}}rpx;width:{{size}}rpx;height:{{size}}rpx;" src="{{value > item ?((value - item) == 0.5?halfSrc:selectedSrc) : normalSrc}}">
      <view class="item" style="left:0rpx"  @tap="selectLeft({{item+0.5}})"></view>
      <view class="item" style="left:50rpx"  @tap="selectRight({{item+1}})"></view>
    </image>
  </block>
</view>
</template>
<script>
import wepy from 'wepy';
export default class Stars extends wepy.component {
  props = {
    stars: {
      type: Array,
      default: function() {
        return [0, 1, 2, 3, 4];
      }
    },
    value: {
      type: [Number, String],
      default: 0,
      twoWay: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 100
    }
  };

  data = {
    normalSrc: '/components/stars/images/no-star.png',
    selectedSrc: '/components/stars/images/full-star.png',
    halfSrc: '/components/stars/images/half-star.png'
  };

  methods = {
    selectLeft: function(key) {
      if (this.readonly) {
        return false;
      }
      if (this.value == 0.5 && key == 0.5) {
        //只有一颗星的时候,再次点击,变为0颗
        key = 0;
      }
      this.value = key
    },
    //点击右边,整颗星
    selectRight: function(key) {
      if (this.readonly) {
        return false;
      }
      this.value = key
    }
  };
}
</script>

<style>
.star-image{
  position: absolute;
  top: 50rpx;
  margin-left: 100rpx;
  width: 100rpx;
  height: 100rpx;
  src: "../../images/no-star.png";
}
.item{
  position: absolute;
  top: 50rpx;
  width: 100rpx;
  height: 100rpx;
}
</style>
