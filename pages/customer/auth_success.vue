<template>
    <view class="container">
        <view class="m_top">
            <view class="m_top_main">
                <icon type="success" size="70"/>
                <text>提交成功</text>
            </view>
        </view>
        <view class="zan-btns">
            <button class="zan-btn zan-btn--primary" @tap="contract">合同进度查询</button>
        </view>
    </view>
</template>
<script>
import page from 'page';
export default class Success extends page {
   config = {
       "navigationBarTitleText": "实名认证成功"
   };
    methods = {
        contract () {
            this.$redirect({
                url: 'contract'
            })
        }
    };
}
</script>
<style scoped>
@import '/zanui/btn';
.m_top{
    height: 400rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.m_top_main{
    display: flex;
    flex-direction:column;
}
.m_top_main text{
    margin-top: 35rpx;
}
</style>
