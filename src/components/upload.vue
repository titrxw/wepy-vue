<template>
  <view class="upload">
      <repeat for="{{tmpPics}}" key="index" index="index" item="item">
        <image @tap="deleteImg({{index}})" class="upload-img" style="{{'width:' + width + 'px;height:' + width + 'px;'}}"  src="{{imgHost + item}}"></image>
      </repeat>
      <view class="upload-btn zan-icon zan-icon-photograph" @tap="upload" style="{{'width:' + width + 'px;height:' + width + 'px;display:block;'}}"  ></view>
  </view>
</template>
<script>
import wepy from 'wepy';
import Tip from 'tip'
export default class Upload extends wepy.component {
  props = {
    imgHost: {
      type: String,
      default: ''
    },
    pics: {
      type: [Array,String],
      default: function() {
        if (this.multiple) {
          return []
        } else {
          return ''
        }
      },
      twoWay: true
    },
    uploadHost: {
      type: String,
      default: ''
    },
    multiple: {
      type: [Boolean],
      default: false
    },
    count: {
      type: Number,
      default: 9
    },
    sourceType: {
      type: Array,
      default: function() {
        return ['album ', 'camera'];
      }
    },
    fileSize: {
      type: Number,
      default: 2048
    },
    lineItems: {
      type: Number,
      default: 4
    }
  };
  data = {
    width: 0,
    tmpPics: []
  };
  watch = {
    pics (val) {
      if (this.multiple) {
        this.tmpPics = val
      } else {
        this.tmpPics = [val]
      }
      this.$apply()
    }
  }

  init (val) {
    if (this.multiple) {
      this.tmpPics = val
    } else {
      this.tmpPics = [val]
    }
  }

  methods = {
    upload() {
      let _self = this;
      console.log(this.multiple)
      if (!this.multiple) {
        this.count = 1;
      }
      wx.chooseImage({
        count: _self.count,
        sourceType: _self.sourceType,
        success: function(res) {
          res.tempFiles.forEach(element => {
            if (_self.fileSize * 1024 < element.size) {
              Tip.errorToast('文件太大, 不能超过 ' + (_self.fileSize / 1024) + 'M.')
              return false;
            }
            Tip.showLoading()
            wepy.uploadFile({
              url: _self.uploadHost,
              filePath: element.path,
              success: function(res) {
                if (res) {
                  if (!_self.multiple) {
                    _self.pics = res
                  } else {
                    _self.pics.push(res);
                  }
                  _self.$apply();
                }
              },
              complete: function () {
                Tip.hideLoading()
              }
            });
          });
        }
      });
    },
    deleteImg(index) {
      this.pics = this.pics
        .slice(0, index)
        .concat(this.pics.slice(index + 1, this.pics.length));
    }
  };
  onLoad = function(options) {
    this.width = (wepy.G.systemInfo.screenWidth - 60) / this.lineItems;
    this.init(this.pics)
  };
}
</script>
<style scoped>
.upload {
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
  text-align:center;
}
.upload-img,
.upload-btn {
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  display: block;
  float: left;
  line-height:65px;

}
</style>

