<template>
  <view class="row buy-bar-box">
    <view class="column-center  btn-fav" @tap="fav">
      <icon class="like{{!isFav ? '' : '-fill'}}" style="color: {{!isFav ? 'gray' : 'red'}}" />
      <text>收藏</text>
    </view>
    <!-- <view class="column-center btn-goto-cart">
      <view class="weui-badge" style="position: absolute;top: -5px;right: 5px;"></view>
      <icon class="cart" color="gray"/>
      <text>购物车</text>
    </view>
   <view class="column-center btn-cart" >
      <text>加入购物车</text>
    </view> -->
    <view @tap="buy" class="column-center btn-buy" >
      <text>立即购买</text>
    </view>
  </view>
</template>

<script>
import wepy from 'wepy';
import Tips from 'tip';

export default class BuyBar extends wepy.component {
  props = {
    goods: {
      default: null
    }
  };
  data = {
    isFav: false
  };
  methods = {
    buy () {
      this.$emit('buy')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/common.scss';

$btn-width: 250rpx;
$btn-sm-width: (750rpx - $btn-width * 2) / 2;
.buy-bar-box {
  height: 105rpx;
  width: 100%;
  background-color: white;
  border: $border;
  .btn-goto-cart {
    border-left: $border;
    position: relative;
  }
  .btn-fav,
  .btn-goto-cart {
    width: $btn-sm-width;
    text {
      font-size: $text-xs;
    }
  }
  .btn-cart,
  .btn-buy {
    flex:1;
    height: 100%;
    width: $btn-width;
    background-color: lighten($color-primary, 3%);
    text {
      color: white;
      font-size: $text-xl;
    }
  }
  .btn-buy {
    background-color: darken($color-primary, 3%);
  }
}
.buy-bar-placeholder {
  height: 105rpx;
  width: 100%;
}
</style>
