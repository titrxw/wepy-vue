<template>
  <view class="house-item border-bottom-1px">
    <view class="item-img lazy-load-box">
    <image wx-if="{{pic}}" src="{{pic}}"></image>
    </view>
    <view class="item-detail">
      <text class="item-title lg">{{ title }}</text>
      <view class="item-else">
        <text class="desc" wx-if="{{desc}}">{{ desc }}</text>
        <view class="price"><text class="price-num">{{ price }}</text><text wx-if="{{price !== ''}}">元/月</text></view>
      </view>
      <view class="address" wx-if="{{address}}">
        {{ address }}
      </view>
      <view class="item-tags" wx-if="{{tags.length > 0}}">
        <repeat for="{{tags}}" key="index" index="index" item="item">
          <view class="item-tag margin-left-10" wx-if="{{item && index < 4}}" >{{ item }}</view>
        </repeat>
      </view>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
export default class GoodItem extends wepy.component {
  props= {
    pic: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: ''
    },
    price_style: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/style/theme.scss';
.house-item{
display:flex;
height:200rpx;
width:100%;
padding-bottom:20rpx;
line-height:60rpx;


  .item-img{
    height: 100%;
    flex: 0.7;
    display: flex;
    image{
      width: 100%;
      display: block;
      height: 100%;
    }
  }
  .item-detail{
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1.3;
    padding-left: .24rem;
    overflow: hidden;
    .item-title{
      flex:1;
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .item-else{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex:1;
      display: flex;
      height: 21px;
      .desc{
      flex:1;
        color: #a0a0a0;
      }
      .price{
        color: $theme-color;
        .price-num{
          font-size: 18px;
        }
      }
    }
    .address{
      flex:1;
      display: block;
      color: #a0a0a0;
      overflow: hidden;
      height: 21px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-tags{
      display: flex;
      margin-top:0px;
      .item-tag{
        border: 1px solid $theme-color;
        color:$theme-color;
        padding: 5px;
        padding-top:0px;
        padding-bottom: 0px;
      }
      .item-tag:first-child{
        margin-left:0px;
      }
      .margin-left-10{
        margin-left:10px;
      }
    }
  }
}
.house-item:last-child{
  padding-bottom:0px;
}
</style>

