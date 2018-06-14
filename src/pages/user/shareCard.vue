<template>
<view>
    <view class="card  pb20">
      <canvas canvas-id="myCanvas" class="background-fff pb10 card-shadow border-radius-10" style="{{'height:' + height  + 'px;width:' + width + 'px;'}}">
      </canvas>
    </view>
     <view class="zan-btns">
    <button class="zan-btn--primary" @tap="save">保存名片海报</button>
    </view>
</view>
</template>
<script>
import page from 'page'
import api from '@/api'
import Tip from 'tip'
export default class ShareCard extends page{
  data = {
    width: 0,
    height: 0,
    headPic: {},
    qrcode:{},
    userInfo: {
      pic: 'contractB/20180614/6dad3e5512b6e10d82e22dbc79faba68.jpg',
      name: '任雄伟',
      job: 'php程序员',
      company: '太原相寓',
      views: 1,
      stars: 1,
      mobile: '15903466276',
      wechat: '',
      email: '1120309488@qq.com',
      address: '山西省太原市',
    },
    tempFilePath: ''
  }
  makeCard () {
    let width = this.G.systemInfo.windowWidth - 60
    let height = width * 1.4
    let fix = (height - (height /2 + 170)) / 2
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, width, height)

    let picHeight = height /2 + 40
    let picWidth = width - 40;
    let picLeft = 20
    let picTop = 20
    
    if (this.headPic.height < picHeight && this.headPic.width < picWidth) {
      picLeft += (picWidth - this.headPic.width) / 2
      picTop += (picHeight - this.headPic.height) / 2
    }
    if (this.headPic.height > picHeight) {
      this.headPic.width = this.headPic.width *  parseFloat( picHeight/ this.headPic.height)
      this.headPic.height = picHeight
      picLeft += (picWidth - this.headPic.width) / 2
    }
    if (this.headPic.width > picWidth) {
      this.headPic.height = this.headPic.height * ( picWidth/ this.headPic.width)
      this.headPic.width = picWidth
      picTop += (picHeight - this.headPic.height) / 2
    }

    ctx.drawImage(this.headPic.path, picLeft, picTop, this.headPic.width, this.headPic.height)
    ctx.setFontSize(16)
    ctx.setFillStyle('#000000')
    ctx.fillText(this.userInfo.name, 20, height /2 + 90 + fix)
    ctx.setFillStyle("#A3A3A3") 
    ctx.setFontSize(13)
    ctx.fillText(this.userInfo.job, 20, height /2 + 120 + fix)
    ctx.fillText(this.userInfo.mobile, 20, height /2 + 140 + fix)
    ctx.setFillStyle("#000000") 
    ctx.setFontSize(11)
    ctx.fillText(this.userInfo.company, 20, height /2 + 170 + fix)
    ctx.drawImage(this.qrcode.path, width - 95, height /2 + 80 + fix, 70, 70)
    ctx.fillText('微信扫码或长按识别',  width - 110, height /2 + 170 + fix)
    let self = this
    ctx.draw(true, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width,
        height: height,
        destWidth: width * 3,
        destHeight: height * 3,
        canvasId: 'myCanvas',
        success: function(res) {
          self.tempFilePath = res.tempFilePath
        } 
      })
    })
  }
  methods = {
    save () {
      let self = this
      wx.saveImageToPhotosAlbum({
        filePath: this.tempFilePath,
        success () {
          wx.previewImage({
            current: self.tempFilePath, // 当前显示图片的http链接
            urls: [self.tempFilePath] // 需要预览的图片http链接列表
          })
        }
      })
    }
  }
  async mounted () {
    this.width = this.G.systemInfo.windowWidth - 60
    this.height = this.width * 1.4
    Tip.showLoading()
    let result = await api.qrcode({
      path: 'pages/index',
      scene: 'id?1212'
    })
    if (result) {
      let self = this
      this.userInfo.qrcode = this.G.imgHost + result
      this.$apply();
      wx.getImageInfo({
        src: this.G.imgHost + this.userInfo.pic,
        success: function (res) {
          self.headPic = res
          wx.getImageInfo({
            src: self.userInfo.qrcode,
            success: function (res) {
              self.qrcode = res
              self.$apply()
              self.makeCard()
              Tip.hideLoading()
            }
          })
        }
      })
    } else{
      Tip.hideLoading()
    }
  }   
}
</script>
<style scoped lang="scss">
@import '../../zanui/btn.scss';
.card{
  padding: 60rpx;
}
.card-shadow{
  box-shadow:0px 10px 15px #ccc;
}
.detail{
  margin:30rpx;
}
</style>
