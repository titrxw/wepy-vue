<template>
    <view class="page">
      <zanTab :tab.sync="tab" componentId="tab"></zanTab>
      <repeat for='{{orderList}}' key="index" index='index' item='item'>
        <view class="mb20 list" @tap='goPage({{item.id}})'>
            <view class="zan-cell">
                <view class="zan-cell__bd">订单号</view>
                <view class="zan-cell__ft">12154565646</view>
            </view>
            <view class="zan-cell">
                <view class="zan-cell__bd">
                    <view>状 态:已签收</view>
                    <view>总  价:￥<text class="color-red" style="font-size:24rpx">178.00</text></view>
                </view>
                <view class="zan-cell__ft btn">再次购买</view>
            </view>
            <view class="zan-cell">
                <image src='{{item.pic}}'></image>
                <view>
                    <view>人工智能名片  20人商务版  （系统搭建费定金）</view>
                    <view class="mt20">1件</view>
                </view>
            </view>
        </view>
      </repeat>
    </view>
</template>
<script>
import page from 'page';
import zanTab from '@/components/zan-tab';
export default class orderList extends page {
    components = {
        zanTab: zanTab,
    };
    data = {
        tab: {
            list: [
                {id: 'all',title: '全部'},
                {id: 'topay',title: '待付款'},
                {id: 'tosend',title: '待发货'},
                {id: 'send',title: '待收货'},
                {id: 'sign',title: '已完成'}
            ],
            selectedId: 'all',
            scroll: false
        },
        orderList: [
        {
            id: 1,
            pic:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '人工智能名片20人尚无帮（系统搭建费定金）',
            price: 1700,
            costPrice: 2000,
            agio: 'XXX的8.8折特权'
        },
        {
            id: 2,
            pic:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '人工智能名片20人尚无帮（系统搭建费定金）',
            price: 1700,
            costPrice: 2000,
            agio: 'XXX的8.8折特权'
        },
        {
            id: 3,
            pic:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '人工智能名片20人尚无帮（系统搭建费定金）',
            price: 1700,
            costPrice: 2000,
            agio: 'XXX的8.8折特权'
        }
        ]
    };
    events = {
        zanTabChange(selectedId, event) {
        let { componentId } = event.source
        this[componentId].selectedId = selectedId
        this.$apply()
        }
    };
    methods={
        goPage(id){
            wx.navigateTo({
                url:`./orderDetial?id=${id}`
            })
        }
    }
}
</script>
<style scoped>
@import '/zanui/cell';
.page{
    overflow-x: hidden;
}
.zan-cell{
    padding: 10rpx 30rpx!important;
}
.zan-cell image{
    width:300rpx;
    height:200rpx;
    margin-right: 16rpx;
}
.zan-cell view{
font-size: 26rpx!important;
}
.list{
    padding: 20rpx 0;
    background: #fff;
}
.btn{
    color: #fff;
    background: #F19325;
    padding: 10rpx ;
}
</style>


