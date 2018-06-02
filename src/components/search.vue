<template>
  <view  class="{{isFixed ? 'stars-search-fixed stars-search-box' : 'stars-search-box'}}" style="{{isFixed ? 'top:' + top + ';' : ';' +  fixPosition ? 'position: fixPosition' : '' }}">
    <view class="{{(!isCancel || value) ? 'stars-search-bar_focusing stars-search-bar': 'stars-search-bar'}}">
      <slot name="left"></slot>
      <form class="stars-search-bar__form">
        <view @tap="touch" class="{{ isCancel ? 'stars-search-mask' : 'stars-search-no-mask'}}"></view>
        <view class="stars-search-bar__box">
          <icon href="javascript:" type="search" size="17" class="stars-icon-search"></icno>
          <input class="stars-search-bar__input" id="{{'search_input_' + uuid}}`" placeholder="{{placeholder}}" autocomplete="off"   ref="input"
          focus="{{ isFocus }}" bindinput="bindKeyInput" value="{{ value }}" bindconfirm="formSubmit"/>
          <icon href="javascript:" type="clear" size="17" class="stars-icon-clear" @tap="clear" wx:if="{{value}}"></icno>
        </view>
      </form>
      <label  class="stars-search-bar__cancel-btn" @tap="cancel">{{cancelText || 'cancel_text'}}</label>
      <slot name="right"></slot>
    </view>
    <view class="stars-cells stars-search_show">
      <repeat for="{{results}}" key="index" index="index" item="item" >
        <view class="stars-cell " @tap="handleResultClick(item)">
          <text class="stars-cell__bd stars-cell_primary">{{item.title}}</text>
        </view>
      </repeat>
    </view>
  </view>
</template>
<script>
import wepy from 'wepy';
export default class Search extends wepy.component {
  name = 'yd-search';
  props = {
    required: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    cancelText: {
      type: String,
      default: '取消'
    },
    value: {
      type: String,
      default: ''
    },
    results: {
      type: Array,
      default() {
        return [];
      },
      twoWay: true
    },
    autoFixed: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '0px'
    },
    position: {
      type: String,
      default: 'fixed'
    },
    autoScrollToTop: Boolean
  };
  onLoad() {
    this.uuid = Math.random()
      .toString(36)
      .substring(3, 8);
  }
  computed = {
    fixPosition() {
      if (this.isFixed) {
        return this.position === 'absolute' ? 'absolute' : 'fixed';
      }
      return 'static';
    }
  };
  onFocus() {
    this.isFocus = true;
    this.$emit('focus');
  }
  methods = {
    bindKeyInput(e) {
      this.value = e.detail.value;
    },
    clear() {
      this.value = '';
      this.isFocus = true;
      if (this.autoFixed && !this.isFixed) {
        this.isFixed = true;
      }
      this.results = [];
    },
    cancel() {
      this.isCancel = true;
      this.value = '';
      this.isFocus = false;
      if (this.autoFixed) {
        this.isFixed = false;
      }
      this.$emit('cancel');
      this.results = [];
    },
    handleResultClick(item) {
      this.results = [];
      this.isCancel = true;
      this.isFocus = false;
      this.$emit('result-click', item); // just for compatibility
      if (this.autoFixed) {
        this.isFixed = false;
      }
    },
    touch() {
      this.results = [];
      this.isCancel = false;
      if (this.autoFixed) {
        this.isFixed = true;
      }
      this.onFocus();
      this.$emit('touch');
    },
    formSubmit() {
      this.results = [];
      if (this.value) {
        console.log('submit');
        this.$emit('submit', this.value);
      }
    }
  };
  data = {
    isCancel: true,
    isFocus: false,
    isFixed: false
  };
  watch = {
    isFixed(val) {
      if (val === true) {
        this.isFocus = true;

        if (this.autoScrollToTop) {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 150);
        }
      } else {
      }
    },
    value(val) {
      this.$emit('change', val);
    }
  };
}
</script>

<style>
.stars-search-bar {
  position: relative;
  padding: 8px 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  background-color: #efeff4;
}
.stars-search-bar:before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d7d6dc;
  color: #d7d6dc;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.stars-search-bar__form {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -ms-flex: auto;
  flex: auto;
  background-color: #efeff4;
}
.stars-search-bar__box {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
}
.stars-search-bar__box .stars-icon-search {
  position: absolute;
  left: -18px;
  top: 0;
  line-height: 38px;
}
.stars-icon-search {
  color: #b2b2b2;
  font-size: 14px;
}
.stars-icon-search:before {
  content: '\E626';
}
[class^='stars-icon-']:before,
[class*=' stars-icon-']:before {
  display: inline-block;
  margin-left: 0.2em;
  margin-right: 0.2em;
}
[class*=' stars-icon-'],
[class^='stars-icon-'] {
  display: inline-block;
  vertical-align: middle;
  font: normal normal normal 14px/1 stars;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
.stars-search-bar__box .stars-search-bar__input {
  padding: 5px 0;
  width: 100%;
  height: 1.42857143em;
  border: 0;
  font-size: 14px;
  line-height: 1.42857143em;
  box-sizing: content-box;
  background: transparent;
}
.stars-icon-clear:before {
  content: '\E602';
}
[class^='stars-icon-']:before,
[class*=' stars-icon-']:before {
  display: inline-block;
  margin-left: 0.2em;
  margin-right: 0.2em;
}
.stars-search-bar__box .stars-icon-clear {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1px 5px;
  line-height: 38px;
}
.stars-icon-clear {
  color: #b2b2b2;
  font-size: 14px;
}
.stars-search-bar__label {
  position: absolute;
  top: 6px;
  right: 1px;
  bottom: 6px;
  left: 1px;
  z-index: 2;
  border-radius: 3px;
  text-align: center;
  color: #9b9b9b;
  background: #ffffff;
}
.stars-search-bar__label .stars-icon-search {
  margin-right: 5px;
}
[class^='stars-icon-'],
[class*=' stars-icon-'] {
  display: inline-block;
  vertical-align: middle;
  font: normal normal normal 14px/1 'YDUI-ICONS';
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
.stars-search-bar__label span {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
}
.stars-search-bar__form:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  border-radius: 10px;
  border: 1px solid #e6e6ea;
  box-sizing: border-box;
  background: #ffffff;
}
.stars-search-bar__cancel-btn {
  display: none;
  margin-left: 10px;
  line-height: 35px;
  color: #1aad16;
  white-space: nowrap;
  font-size: 13px;
}
.stars-search-bar:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d7d6dc;
  color: #d7d6dc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.stars-cells.stars-search_show {
  margin-top: 0 !important;
  overflow-y: auto;
  max-height: 400px;
}
.stars-cells {
  margin-top: 1.17647059em;
  background-color: #ffffff;
  line-height: 1.41176471;
  font-size: 17px;
  overflow: hidden;
  position: relative;
}
.stars-cells:before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.stars-cell_access {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: inherit;
}
.stars-cell:before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left: 15px;
}
.stars-cell {
  position: relative;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  line-height: 1.4;
  font-size: 14px;
}
.stars-cell__bd {
  flex: 1;
}
.stars-cell_primary {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.stars-search-bar.stars-search-bar_focusing .stars-search-bar__cancel-btn {
  display: block;
}
.stars-search-bar.stars-search-bar_focusing .stars-search-bar__label {
  display: none;
}
.stars-search-fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(5px);
}
.stars-search-box {
  width: 100%;
}
.stars-cells.stars-search_show {
  margin-top: 0 !important;
  overflow-y: auto;
  max-height: 400px;
}
.stars-cells.stars-search_show::-webkit-scrollbar {
  display: none;
}
.stars-cells.stars-search_show::after {
  display: none;
}
.stars-search-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 90%;
  height: 100%;
  z-index: 5;
}
.stars-search-no-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 90%;
  height: 100%;
}
</style>
