<template>
  <view class="upload">
      <repeat for="{{urls}}" key="index" index="index" item="item">
        <image @tap="deleteImg({{index}})" class="upload-img" style="{{'width:' + width + 'px;height:' + width + 'px;'}}"  src="{{imgHost + item}}"></image>
      </repeat>
      <button class="upload-btn" @tap="upload" style="{{'width:' + width + 'px;height:' + width + 'px;display:block;'}}"  >上传</button>
  </view>
</template>
<script>
import component from 'component';
export default class Upload extends component {
  props = {
    imgHost: {
      type: String,
      default: ''
    },
    urls: {
      type: Array,
      default: function() {
        return [];
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
    }
  };
  data = {
    width: 0
  };
  methods = {
    upload() {
      console.log(this)
      let _self = this;
      if (!this.multiple) {
        this.count = 1;
      }
      wx.chooseImage({
        count: _self.count,
        sourceType: _self.sourceType,
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          tempFilePaths.forEach(element => {
            wx.uploadFile({
              url: _self.uploadHost,
              filePath: element,
              name: 'file',
              formData: {
                token: _self.G.token
              },
              success: function(res) {
                try{
                  var data = JSON.parse(res.data);
                  if (data.ret == 200) {
                    if (!data.data.url) {
                      _self.errorToast('文件上传失败')
                      return false
                    }
                    _self.urls.push(data.data.url);
                    _self.$apply();
                  } else {
                    _self.errorToast(data.data.msg)
                  }
                } catch (e) {
                  _self.errorToast('数据格式错误')
                }
              },
              fail: function(err) {}
            });
          });
        }
      });
    },
    deleteImg(index) {
      this.urls = this.urls
        .slice(0, index)
        .concat(this.urls.slice(index + 1, this.urls.length));
    }
  };
  mounted = function(options) {
    this.width = (this.G.systemInfo.screenWidth - 50) / 4;
  };
}
</script>
<style>
.upload {
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
}
.upload-img,
.upload-btn {
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  display: block;
  float: left;
}
</style>

