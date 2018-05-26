<template>
  <view class="wepy-view">
      <view class="wepy-flexview">
        <slot name="navbar"></slot>
        <view class="wepy-scrollview" ref="scrollView" id="scrollView">
            <slot></slot>
        </view>
        <slot name="tabbar"></slot>
      </view>
  </view>
</template>

<script>
import wepy from 'wepy'
export default class Layout extends wepy.component {
};
</script>

<style lang="scss" scoped>
@import '../zanui/common.scss';
view{
  display:unset;
}
.wepy {
  &-view {
    margin: 0 auto;
    &:before {
      content: '';
      display: block;
      width: 100%;
    }
    &:after {
      content: '';
      display: block;
      width: 100%;
    }
  }

  &-flexview {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  &-scrollview {
    width: 100%;
    height: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
    margin-bottom: -1px;
    &:after {
      content: '';
      display: block;
      width: 100%;
    }
  }
}
</style>