<style lang="less" scoped>
.panel {
  position: relative;
  overflow: hidden;

  &::after {
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
}
.panel-title {
  font-size: 14px;
  line-height: 1;
  color: #999;
  padding: 20px 15px 10px 15px;
}
.panel-content{
  background:#fff;
}
.panel--without-margin-top {
  margin-top: 0;
}

.panel--without-border {
  &::after {
    border: 0 none;
  }
}
</style>
<template>
  <view class="panel">
    <view class="panel-title">
      <slot name="title"></slot>
    </view>
    <view class="panel-content">
      <slot ></slot>
    </view>
  </view>
</template>
<script>
  import wepy from 'wepy'
  export default class Panel extends wepy.component {
    onLoad = function () {
      console.log(this)
    }
  }
</script>
