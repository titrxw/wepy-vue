<template>
    <view class="{{customer ? 'stars-timeline-custom-item' : 'stars-timeline-item'}}">
            <view class="stars-timeline-icon">
            <slot wx:if="{{!!$slots.icon}}" name="icon"></slot>
            </view>
        <slot></slot>
    </view>
</template>

<script>
import wepy from 'wepy';
export default class TimeLineItem extends wepy.component {
    props = {
        customer: {
            type: Boolean,
            default: false
        }
    }
};
</script>
