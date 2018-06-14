<template>
        <view class="container" style="background:#EDEEF2!important">
            <layout>
                <view class="bg">
                    <view slot="navbar" class="barText bg ml20 mr20">编辑商品</view>
                </view>
                <repeat for='{{goodsList}}' key='index' index='index' item='item'>
                    <view  class="content bg">
                        <view @tap='checkGoods(1,{{index}})' wx:if="{{!item.status}}" class="zan-icon zan-icon-check icon" style="color: #ff4343;"></view>
                        <view @tap='checkGoods(1,{{index}})' wx:if="{{item.status}}" class="zan-icon zan-icon-checked icon" style="color: #ff4343;"></view>
            
                        <view class="list_banner">
                            <image src='{{item.banner}}'></image>
                        </view>
                        
                        <view>
                            <view>{{item.title}}</view>
                            <view class="disable_text">￥{{item.costPrice}}</view>
                            <view class="content_botton">
                                <text>￥{{item.price*item.num}}</text>
                                <view class="inputNum">
                                    <view class="numBtn" @tap='numSub(1,{{index}})'>-</view>
                                    <view><input type="number" value="{{item.num}}"></view>
                                    <view class="numBtn" @tap='numSub(2,{{index}})'>+</view>
                                </view>
                                <!-- <zanStepper :stepper.sync="item.num" :min="min" :max="max" componentId="stepper"> </zanStepper> -->
                                <!-- <zanStepper :stepper.sync="stepper" :min="min" :max="max" componentId="stepper"> </zanStepper> -->
                            </view>
                        </view>

                    </view>
                </repeat>
                <view slot="tabbar" class="footer">
                    <view @tap='checkGoods(2)' wx:if="{{!iconStatus}}" class="zan-icon zan-icon-check icon" style="color: #ff4343;"></view>
                    <view @tap='checkGoods(2)' wx:if="{{iconStatus}}" class="zan-icon zan-icon-checked icon" style="color: #ff4343;"></view>
                    <view>总计： <text>￥3520</text></view>
                    <view class="payText">
                        结算
                    </view>
                </view>
            </layout>
        </view>
</template>

<script>
import page from 'page';
import Layout from '@/components/layout';
import zanStepper from '@/components/zan-stepper';
export default class ShopCart extends page{
    data={
        stepper: 10,
        min: 1,
        max: 20,
        goodsList:[
            {
                id:11,
                title:'人工智能名片  20人商务版 （系统搭建费定金）',
                price: 1700,
                costPrice: 2000,
                num:3,
                banner:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                status:false
            },
            {
                id:12,
                title:'人工智能名片  20人商务版 （系统搭建费定金）',
                price: 1700,
                costPrice: 2000,
                num:4,
                banner:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                status:false
            },
            {
                id:13,
                title:'人工智能名片  20人商务版 （系统搭建费定金）',
                price: 1700,
                costPrice: 2000,
                num:5,
                banner:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                status:false
            },
            {
                id:14,
                title:'人工智能名片  20人商务版 （系统搭建费定金）',
                price: 1700,
                costPrice: 2000,
                num:2,
                banner:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                status:false
            },
        ],
        banner:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        iconStatus:false
    };
    components={
        zanStepper: zanStepper,
        layout:Layout
    };
    events = {
    zanStepperChange({ componentId, stepper }, event) {
      console.log(componentId, stepper, event)
      this[componentId] = stepper
      this.$apply()
    }
  }
    methods={
        checkGoods(type,i){
            //  1 单商品选择     2 全选or反选
            console.log(type)
            switch (type){
                case '1':
                this.goodsList[i].status = !this.goodsList[i].status;
                
                break;
                case '2':
                this.iconStatus = !this.iconStatus;
                for(var key in this.goodsList){
                    this.goodsList[key].status = this.iconStatus;
                }
                break
            } 
        },
        numSub(type,i){
            // 1减法  2加法
            if(type==1){    
                this.goodsList[i].num-=1;
                console.log(type+'这是个减法')
            }else if(type=2){
                this.goodsList[i].num+=1;
                console.log(type+'这是个加法')
            }
            
        }
    }
}
</script>

<style scoped>
@import '/zanui/icon';
.bg{
    background: #fff;
}
.barText{
    color: #4D4D4D;
    text-align: end;
    font-size: 28rpx;
    border-bottom: 1rpx solid #E7E7E7;
    padding: 20rpx 0;
}
.content{
    display: flex;
    align-items: center;
    padding: 20rpx;
    height: 280rpx;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1rpx solid #E7E7E7;
}
.icon{
    font-size: 45rpx;
    margin-right:20rpx;
    margin-bottom:20rpx
}
.list_banner {
  width: 230rpx;
  height: 230rpx;
  margin-right:20rpx;
}
.list_banner image {
  border-radius: 10rpx;
  width: 230rpx;
  height: 230rpx;
}
.content_botton{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.footer{
    padding-left:20rpx;
    width: 100%;
    height: 120rpx;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
}
.payText{
    color: #fff;
    height: 100%;
    line-height: 120rpx;
    width: 170rpx;
    text-align: center;
    background: red;
}
text{
    color:red;
}
.inputNum{
    display: flex;
}
.numBtn{
    border: 1rpx solid #ddd;
    width: 55rpx;
    height: 55rpx;
    text-align: center;
    line-height: 55rpx;
}
input{
    width: 55rpx;
    height: 55rpx;
    text-align: center;
    line-height: 55rpx;
    border-top:  1rpx solid #ddd;
    border-bottom:  1rpx solid #ddd;
}
</style>
