<template>
  <view class="foot">
    <navigator target="miniProgram" class="zan-center" open-type="navigate" app-id="wxef93993addb61003" path="" extra-data="" version="release">
        <view class="zan-center a-text" >常见问题</view>
    </navigator>
    <view class="zan-center">Copyright © 2017-2018 太原我爱我家</view>
  </view>
</template>
<script>
import wepy from 'wepy'
export default class Foot extends wepy.component {
  
}
</script>
<style scoped>
.a-text{
  color:#586C94;
  margin-bottom:5px;
}
.foot{
  width:100%;
  position:absolute;
  bottom:15px;
  top:auto;
  right:0px;

}
</style>


