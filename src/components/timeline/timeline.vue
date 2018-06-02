<template>
    <view class="stars-timeline">
        <view class="stars-timeline-content">
            <slot></slot>
        </view>
    </view>
</template>
<script>
import wepy from 'wepy';
export default class TimeLine extends wepy.component {}
</script>

<style lang="less">
@css-prefix: stars;
@line-left: 35px;
@line-color: #ccc;
.bottom-line(@color, @zindex: 0) {
  content: '';
  position: absolute;
  z-index: @zindex;
  bottom: 0;
  left: @line-left;
  width: 100%;
  border-bottom: 1px solid @color;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.top-line(@color, @zindex: 0) {
  content: '';
  position: absolute;
  z-index: @zindex;
  top: 0;
  left: @line-left;
  width: 100%;
  border-top: 1px solid @color;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.@{css-prefix} {
  &-timeline {
    background-color: #fff;
    font-size: 13px;
    color: #6e6e6e;
    overflow: hidden;
    position: relative;
    z-index: 1;
    &:after {
      .top-line(@line-color);
    }

    &-content {
      margin-left: 21px;
      border-left: 1px solid #e4e5e9;
    }

    &-item,
    &-custom-item {
      padding: 16px 12px 16px 0;
      margin-left: -20.5px;
      position: relative;
      padding-left: @line-left;

      &:after {
        .bottom-line(@line-color);
      }

      .@{css-prefix}-timeline-icon {
        content: '';
        position: absolute;
        z-index: 1;
        left: 20px;
        display: block;
        top: 19px;
        transform: translate(-50%, 0);
      }

      &:first-child {
        padding-top: 0;
        color: #000;
        > .@{css-prefix}-timeline-icon {
          top: 3px;
        }
      }

      &:last-child:before {
        content: '';
        width: 1px;
        height: 100%;
        background-color: #fff;
        position: absolute;
        left: -17px;
        top: 19px;
      }
    }

    &-item {
      .@{css-prefix}-timeline-icon {
        width: 8px;
        height: 8px;
        border-radius: 99px;
        background-color: #e4e5e9;
      }
      &:first-child {
        > .@{css-prefix}-timeline-icon {
          background-color: #f23030;
          width: 10px;
          height: 10px;
        }
        &:before {
          content: '';
          width: 16px;
          height: 16px;
          position: absolute;
          z-index: 0;
          top: 0;
          left: -24px;
          background-color: #fbbfbf;
          border-radius: 99px;
        }
      }
    }

    &-custom-item {
      &:first-child > .@{css-prefix}-timeline-icon {
        top: 0;
      }
    }
  }
}
</style>
