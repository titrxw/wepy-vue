<template>
  <view>
    <swiper autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
      <repeat for="{{banners}}" key="index" index="index" item="item">
        <swiper-item>
          <image mode="widthFix" src="{{item}}" class="slide-image" />
        </swiper-item>
      </repeat>
    </swiper>
    <repeat for="{{info}}" key="index" index="index" item="item">
      <view class="mt30">
        <text wx-if="{{ item.title }}" class="zan-panel-title" >{{ item.title }}</text>
        <view class="zan-panel pd25">
          <view class="mb10"  wx-if="{{ item.content }}">
            <view class="zan-icon zan-icon-location mr20" wx-if="{{ item.type == 'address' }}"></view>
            <text class="weak sm" @tap="title({{ item }})">{{ item.content }}</text>
          </view>
          <repeat for="{{item.pic}}" key="index1" index="index1" item="item1">
            <image class="mb10"   model="widthFix" wx-if="{{ item1 }}" src="{{ item1 }}"></image>
          </repeat>
          <view class="mb10"  wx-if="{{ item.video }}">
            <video style="width:100%;" src="{{ item.video }}" poster="{{ item.poster }}" controls></video>
          </view>
           <repeat for="{{item.list}}" key="index2" index="index2" item="item2">
            <Item wx-if="{{item2.style == 1}}" :pic.sync="item2.pic" :title.sync="item2.title" :address.sync="item2.time"></Item>
          </repeat>
        </view>
      </view>
    </repeat>
  </view>
</template>
<script>
import page from 'page'
import Item from '@/components/good-item'
export default class Website extends page{
  components = {
    Item
  }
  data = {
    banners: [
      'http://wx.zh5j.com/uploads/20170605/455a19928bcf8414c525c4067bcf7795.png',
      'https://webwx.aijiatui.com/website/cover/2018/5/6/445bb1c5059f0509e57003f6bcde72f4.jpg',
      'https://webwx.aijiatui.com/website/cover/2018/5/6/5391c09c9b5944ca80246370480bae18.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    info: [
      {
        title: '公司简介',
        content: '加推人工智能名片，基于微信与AI技术开发，颠覆传统名片和企业官网，彻底打通企业管理者、销售与客户之间的关系，全方位提升企业销售及销售管理能力。',
        pic: '',
        poster: 'http://wx.zh5j.com/uploads/20170605/455a19928bcf8414c525c4067bcf7795.png',
        video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
      },
      {
        title: '公司咨询',
        content: '',
        list: [
          {
            id: 1,
            pic: 'https://webwx.aijiatui.com/website/cover/2018/5/6/4d04d60781f38fd255b125cb54ff3235.jpg',
            title: '全球首款人工智能名片赋予企业销售力',
            time: '2018-12-12',
            style: 1
          },
          {
            id: 2,
            pic: 'https://webwx.aijiatui.com/website/cover/2018/5/6/4d04d60781f38fd255b125cb54ff3235.jpg',
            title: '全球首款人工智能名片赋予企业销售力',
            time: '2018-12-12',
            style: 1
          }
        ],
        pic: '',
      },
      {
        title: '关于我们',
        pic: ['https://webwx.aijiatui.com/website-new/img/section1-left.jpg'],
      },
      {
        title: '分布',
        src: '',
        pic: ['https://webwx.aijiatui.com/website-new/img/map.jpg','https://webwx.aijiatui.com/website-new/img/hzhb.jpg','https://webwx.aijiatui.com/website-new/img/search-se.jpg'],
      },
      {
        title: '招聘',
        content: '',
        type: 'list',
        pic: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'],
        list: [
          {
            id: 1,
            pic: 'https://webwx.aijiatui.com/website/cover/2018/5/6/4d04d60781f38fd255b125cb54ff3235.jpg',
            title: '全球首款人工智能名片赋予企业销售力',
            time: '',
            style: 1
          },
          {
            id: 2,
            pic: 'https://webwx.aijiatui.com/website/cover/2018/5/6/4d04d60781f38fd255b125cb54ff3235.jpg',
            title: '全球首款人工智能名片赋予企业销售力',
            time: '',
            style: 1
          }
        ],
      },
      {
        title: '地址',
        content: '山西省太原市华宇国际大厦',
        type: 'address',
        latitude: 37.907367,
        longitude: 112.532959
      }
    ]
  }
  methods = {
    title (item) {
      if (item.type == 'address') {
        wx.openLocation({
          latitude: item.latitude,
          longitude: item.longitude,
          name: item.title,
          scale: 28
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../zanui/panel.scss';
@import '../../zanui/icon.scss';
image:last-child{
  margin-bottom:0px;
}
</style>

