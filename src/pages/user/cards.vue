<template>
  <view>
    <repeat for="{{cards}}" key="index" index="index" item="item">
      <view @tap="detail({{ item.id }})" class="card padding-30 border-radius-10 pb20">
        <view style="flex:1;">
          <view class=" mb30"><text class="xs muted">{{ item.company }}</text></view>
          <view><text class="xxl">{{ item.name }}</text></view>
          <view class=" mb30"><text class="xxs">{{ item.job }}</text></view>
          <view><text class="xxs muted">{{ item.mobile }}</text></view>
          <view><text class="xxs muted">{{ item.email }}</text></view>
        </view>
        <view>
          <image style="width:120rpx;height:120rpx;" class="border-radius-10" src="{{ item.pic }}"></image>
        </view>
      </view>
    </repeat>
  </view>
</template>
<script>
import page from 'page'
export default class Card extends page{
  data = {
    cards: [
      {
        id: 1,
        pic: 'https://webwx.aijiatui.com/website/cover/2018/5/5/31fe687ab271032f6fdb5e885c5bf6b7.jpg',
        name: '任雄伟',
        job: 'php程序员',
        company: '太原相寓',
        mobile: '15903466276',
        email: '1120309488@qq.com'
      },
      {
        id: 2,
        pic: 'https://webwx.aijiatui.com/website/cover/2018/5/5/31fe687ab271032f6fdb5e885c5bf6b7.jpg',
        name: '任雄伟',
        job: 'php程序员',
        company: '太原相寓',
        mobile: '15903466276',
        email: '1120309488@qq.com'
      }
    ]
  }
  methods = {
    detail (id) {
      wx.switchTab({
        url: 'index?id=' + id
      })
    }
  }
}
</script>
<style scoped lang="css">
.card{
  display:flex;
  background:#fff;
  margin: 30rpx;
}
</style>


