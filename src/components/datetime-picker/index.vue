<template>
  <PopView :show.sync="show" direction="bottom">
    <view style="height:40px;margin-bottom:10px;border-bottom:1rpx solid #ccc;">
      <text style="line-height:32px;float:left;padding:5px;font-size:13px;" @tap="cancel">取消</text>
      <text style="line-height:32px;float:right;padding:5px;font-size:13px;" @tap="sure">确定</text>
    </view>
    <picker-view wx:if="{{ value.length > 1 }}" indicator-style="height: 50px;" style="width: 100%; height: 300px;" value="{{value}}" bindchange="bindChange">
      <picker-view-column>
        <view wx:for="{{years}}" style="line-height: 50px">{{item}}年</view>
      </picker-view-column>
      <picker-view-column>
        <view wx:for="{{months}}" style="line-height: 50px">{{item}}月</view>
      </picker-view-column>
      <picker-view-column>
        <view wx:for="{{days}}" style="line-height: 50px">{{item}}日</view>
      </picker-view-column>
      <picker-view-column wx:if="{{ type == 'ymdh' || type == 'ymdhm' }}">
        <view wx:for="{{hours}}" style="line-height: 50px">{{item}}时</view>
      </picker-view-column>
      <picker-view-column wx:if="{{ type == 'ymdhm' }}">
        <view wx:for="{{mins}}" style="line-height: 50px">{{item}}分</view>
      </picker-view-column>
    </picker-view>
  </PopView>
</template>
<script>
import wepy from 'wepy';
import PopView from '../zan-popup';
export default class DateTimePicker extends wepy.component {
  components = {
    PopView
  };

  props = {
    show: {
      type: Boolean,
      default: false,
      twoWay: true
    },
    datetime: {
      type: String,
      default: '',
      twoWay: true
    },
    type: {
      type: String,
      default: 'ymd'
    },
    start: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    }
  };

  data = {
    years: [],
    year: '',
    months: [],
    month: '',
    days: [],
    day: '',
    hours: [],
    hour: '',
    mins: [],
    min: '',
    value: [],
    startObj: {},
    endObj: {},
    lastObj: {},
    isStart: false,
    isEnd: false,
    hasInit: false
  };

  combineDate() {
    let datetime = '';
    console.log(this.year)
    if (this.year) {
      datetime += this.year + '-';
    }
    if (this.month) {
      datetime += this.month + '-';
    }
    if (this.day) {
      datetime += this.day + ' ';
    }
    if (this.hour) {
      datetime += this.hour + '';
    }
    if (this.min) {
      datetime += ':' + this.min;
    }
    this.datetime = datetime;
  }

  methods = {
    bindChange: function(e) {
      this.change(e);
    },
    cancel () {
      this.show = false
    },
    sure () {
      this.combineDate();
      this.show = false
    }
  };
  change = function(e) {
    const val = e.detail.value;
    this.value = val;
    this.year = this.years[val[0]];
    this.initCurYear(this.year);
    this.initCurMonth(this.year);
    this.month = this.months[val[1]];
    this.initCurDay(this.month);
    this.day = this.days[val[2]];
    if (val[3] >= 0) {
      this.initCurHour(this.day);
      console.log(this.hours)
      console.log(val[3])
      this.hour = this.hours[val[3]];
    }

    if (val[4] >= 0) {
      this.initCurMin(this.hour);
      this.min = this.mins[val[4]];
    }
  };

  initCurYear(year) {
    if (year < this.startObj.year) {
      year = this.startObj.year;
    }
    if (year > this.endObj.year) {
      year = this.endObj.year;
    }
    if (year == this.startObj.year) {
      this.isStart = true;
      this.isEnd = false;
    } else if (year == this.endObj.year) {
      this.isEnd = true;
      this.isStart = false;
    } else {
      this.isStart = false;
      this.isEnd = false;
    }
    this.initYear(this.startObj['year'], this.endObj['year']);
  }

  initCurMonth(year) {
    if (this.isStart && year == this.startObj.year) {
      this.initMonth(this.startObj.month, 12);
      this.isEnd = false;
    } else if (this.isEnd && year == this.endObj.year) {
      this.initMonth(1, this.endObj.month);
      this.isStart = false;
    } else {
      this.isStart = false;
      this.isEnd = false;
      this.initMonth(1, 12);
    }
  }
  initCurDay(month) {
    if (this.isStart && month == this.startObj.month) {
      this.initDay(this.startObj.day, 31);
      this.isEnd = false;
    } else if (this.isEnd && month == this.endObj.month) {
      this.initDay(1, this.endObj.day);
      this.isStart = false;
    } else {
      this.isStart = false;
      this.isEnd = false;
      this.initDay(1, 31);
    }
  }
  initCurHour(day) {
    if (this.isStart && day == this.startObj.day) {
      this.initHour(this.startObj.hour, 24);
      this.isEnd = false;
    } else if (this.isEnd && day == this.endObj.day) {
      this.initHour(1, this.endObj.hour);
      this.isStart = false;
    } else {
      this.isStart = false;
      this.isEnd = false;
      this.initHour(1, 24);
    }
  }
  initCurMin(hour) {
    if (this.isStart && hour == this.startObj.hour) {
      this.initMin(this.startObj.min, 60);
      this.isEnd = false;
    } else if (this.isEnd && hour == this.endObj.hour) {
      this.initMin(1, this.endObj.min);
      this.isStart = false;
    } else {
      this.isStart = false;
      this.isEnd = false;
      this.initMin(1, 60);
    }
  }

  initYear(start, end) {
    this.years = [];
    for (let i = start; i <= end; i++) {
      this.years.push(i);
    }
  }

  initMonth(start, end) {
    this.months = [];
    for (let i = start; i <= end; i++) {
      this.months.push(i);
    }
  }

  initDay(start, end) {
    this.days = [];
    for (let i = start; i <= end; i++) {
      this.days.push(i);
    }
  }

  initHour(start, end) {
    this.hours = [];
    for (let i = start; i <= end; i++) {
      this.hours.push(i);
    }
  }

  initMin(start, end) {
    this.mins = [];
    for (let i = start; i <= end; i++) {
      this.mins.push(i);
    }
  }

  initSec(start, end) {
    this.secs = [];
    for (let i = start; i <= end; i++) {
      this.secs.push(i);
    }
  }

  formatDateTime(datetime) {
  
    console.log(datetime)
    let obj = {};
    if (!datetime) {
      return obj;
    }
    let cformat;
    let format = datetime.split(' ');
    if (format[0]) {
      cformat = format[0].split('-');
      obj['year'] = parseInt(cformat[0]);
      if (cformat[1]) {
        obj['month'] = parseInt(cformat[1]);
      }
      if (cformat[2]) {
        obj['day'] = parseInt(cformat[2]);
      }
    }
    if (format[1]) {
      cformat = format[1].split(':');
      obj['hour'] = parseInt(cformat[0]);
      if (cformat[1]) {
        obj['min'] = parseInt(cformat[1]);
      }
    }
    return obj;
  }

  firstymd(curDate) {
    let year, month, day;
    this.initCurYear(curDate['year']);
    if (this.isStart) {
      year = 0;
    } else {
      year = curDate['year'] - this.startObj['year'];
    }
    this.year = this.years[year];
    if (!this.startObj.month) {
      this.startObj.month = 1;
    }
    if (this.isStart && this.startObj.month > curDate['month']) {
      curDate['month'] = this.startObj.month;
    }
    if (this.isEnd && this.endObj.month < curDate['month']) {
      curDate['month'] = this.endObj.month;
    }
    this.initCurMonth(curDate['year']);
    if (this.isStart) {
      month = 0;
    } else {
      month = curDate['month'] - 1;
    }
    this.month = this.months[month];

    if (!this.startObj.day) {
      this.startObj.day = 1;
    }
    if (this.isStart && this.startObj.day > curDate['day']) {
      curDate['day'] = this.startObj.day;
    }
    if (this.isEnd && this.endObj.day < curDate['day']) {
      curDate['day'] = this.endObj.day;
    }
    this.initCurDay(curDate['month']);
    if (this.isStart) {
      day = 0;
    } else {
      day = curDate['day'] - 1;
    }
    this.day = this.days[day];
    return [year, month, day]
  }

  init() {
    let year, month, day, hour, min;
    let need = true;
    let start = {
      year: 1990,
      month: 1,
      day: 1,
      hour: 1,
      min: 1
    };
    let end = {
      year: 2040,
      month: 12,
      day: 31,
      hour: 24,
      min: 60
    };
    if (this.start) {
      start = this.formatDateTime(this.start);
    }
    if (this.end) {
      end = this.formatDateTime(this.end);
    }
    this.startObj = start;
    this.endObj = end;
    let curDate = this.formatDateTime(this.datetime);
    if (!curDate.year) {
      curDate = start
    }
    switch (this.type) {
      case 'ymd':
        this.value = this.firstymd(curDate);
        break;
      case 'ymdh':
        var ymd = this.firstymd(curDate);

        if (!this.startObj.hour) {
          this.startObj.hour = 1;
        }
        if (this.isStart && this.startObj.hour > curDate['hour']) {
          curDate['hour'] = this.startObj.hour;
        }
        if (this.isEnd && this.endObj.hour < curDate['hour']) {
          curDate['hour'] = this.endObj.hour;
        }
        this.initCurHour(curDate['day']);
        if (this.isStart) {
          hour = 0;
        } else {
          hour = curDate['hour'] - 1;
        }
        this.hour = this.hours[hour];

        this.value = [...ymd, hour];
        break;
      case 'ymdhm':
        var ymd = this.firstymd(curDate);

        if (!this.startObj.hour) {
          this.startObj.hour = 1;
        }
        if (this.isStart && this.startObj.hour > curDate['hour']) {
          curDate['hour'] = this.startObj.hour;
        }
        if (this.isEnd && this.endObj.hour < curDate['hour']) {
          curDate['hour'] = this.endObj.hour;
        }
        this.initCurHour(curDate['day']);
        if (this.isStart) {
          hour = 0;
        } else {
          hour = curDate['hour'] - 1;
        }
        this.hour = this.hours[hour];

        if (!this.startObj.min) {
          this.startObj.min = 1;
        }
        if (this.isStart && this.startObj.min > curDate['min']) {
          curDate['min'] = this.startObj.min;
        }
        if (this.isEnd && this.endObj.min < curDate['min']) {
          curDate['min'] = this.endObj.min;
        }
        this.initCurMin(curDate['hour']);
        if (this.isStart) {
          min = 0;
        } else {
          min = curDate['min'] - 1;
        }
        this.min = this.mins[min];

        this.value = [...ymd, hour, min];
        break;
    }
  }

  watch = {
    show (val) {
      if (val) {
        if (!this.hasInit) {
          this.init();
          this.$apply()
          this.hasInit = true
        }
      }
    }
  }
}
</script>
<style>

</style>
