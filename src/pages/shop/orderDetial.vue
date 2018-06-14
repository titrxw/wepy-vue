<template>
    <view>
        <view class="info mb30">
            <view class="padding-10">
                <text class="color-999">订单状态：</text>
                <text>已签收</text>
            </view>
            <view class="padding-10">
                <text class="color-999">订单编号：</text>
                <text>42955174878</text>
            </view>
            <view class="padding-10">
                <text class="color-999">下单时间：</text>
                <text>2016-10-30 20:11:59</text>
            </view>
        </view>

        <view class="info mb30">
            <view class="info-title padding-10">
                <view>我爱我家</view>
                <view class="color-999">共计1件商品</view>
            </view>
            <view class="info-title padding-10">
                <view class="imgText">
                    <image src='{{pic}}'></image>
                    <text>sdfsdfsdfsdfdsf</text>
                </view>
                <view>
                    <view class="padding-10">￥2499.00</view>
                    <view class="padding-10" style="text-align:right">X 1</view>
                </view>
            </view>
            <view class="info-title padding-10">
                <view>商品总额</view>
                <view class="color-red">￥2499.00</view>
            </view>
            <view class="info-end padding-10">
                <text>应付金额：</text><view class="color-red">￥2499.00</view>
            </view>
        </view>
        <view class="pos">
            <button class="zan-btn zan-btn--warn">取消订单</button>
        </view>
    </view>
</template>
<script>
import page from 'page';
export default class OrderDetail extends page{
    data = {
        pic:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    }
}
</script>
<style scoped>
@import '/zanui/cell';
@import '/zanui/btn';
.info{
    padding: 24rpx 30rpx;
    background: #fff;
}
.color-999{
    color: #999;
}
.info-title{
    display: flex;
    justify-content: space-between;
}
image{
    width:200rpx;
    height:150rpx;
    margin-right: 16rpx;
}
.imgText{
    display: flex;
    align-items: center;
}
.info-end{
    display: flex;
    justify-content: flex-end;
}
.padding-10{
    padding:10rpx 0;
}
.pos{
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
