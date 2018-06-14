<template>
  <view class="row goods-row-box" @tap="detail({{ goods.id }})" >
    <view>
      <image class="goods-image"  lazy-load src="{{goods.pic}}" ></image>
    </view>

    <view class="main-box column">
      <!--标题-->
      <view>
        <text class="xl">{{goods.name}}</text>
      </view>
      <!--销量展示-->
      <view class="row" wx:if="{{goods.isSales || goods.isSales == null}}">
        <text class="xs muted">已售{{goods.salesVolume}}件</text>
      </view>
      <!--价格-->
      <view class="row-between" wx:if="{{(goods.isPrice || goods.isPrice == null)}}">
        <view class="price-box" wx:if="{{goods.isPrice || goods.isPrice == null}}">
          <view class="goods-unit">￥</view>
          <text class="goods-price">{{goods.priceLable}}</text>
          <text class="original-price" wx:if="{{goods.discount}}">￥{{goods.originalPrice}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  export default class GoodRowItem extends wepy.component {
    props = {
      goods: {}
    };
    methods = {
      detail (id) {
        console.log(id)
        wx.navigateTo({
          url: 'detail?id' + id
        })
      }
    };
  }
</script>

<style lang="scss" scoped>
@import '../../assets/style/theme.scss';
.goods-row-box{
  background-color: white;
  border-top: $border;
  align-items: center;
  padding: 10rpx;
  .goods-image {
    height:180rpx;
    width:180rpx;
  }
  .main-box{
    margin-left: 20rpx;
    flex: 1;
  }
  .price-box{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    .goods-unit{
      color: $color-major;
      font-size: $text-sm;
    }
    .goods-price{
      color: $color-major;
      font-size: $text-xl;
    }
    .original-price{
      color: $color-muted;
      font-size: $text-xs;
      text-decoration: line-through;
    }
  }
}
</style>
