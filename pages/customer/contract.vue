<template>
  <view class="container padding-top-15">
    <repeat for="{{contracts}}" key="index" index="index" item="item">
        <view class="zan-cell cell--without-border background-fff" @tap="progress({{item.id}})">
          <view class="zan-cell__bd">【{{item.jia_name}}】和【{{item.yi_name}}】买卖合同</view>
          <view class="zan-cell__ft">{{item.status}}</view>
        </view>
    </repeat>
    <LoadMore @loadMore.user="loadMore" :status.sync="loadStatus"></LoadMore>
  </view>
</template>
<script>
import LoadMore from '../../components/zan-loadmore'
import page from 'page';
import api from '../../api'
export default class Contract extends page {
  components = {
    LoadMore: LoadMore
  }
  data = {
    status: 'more',
    loadStatus: 'more',
    contracts: [],
    page: 1
  }
  async getData (page) {
    let result = await api.contractList({
      page: page
    })
    if (result) {
      this.contracts = [...this.contracts , ...result.data]
      if (result.data.length == 0) {
        this.loadStatus = 'nodata'
      } else {
        this.loadStatus = 'more'
      }
      this.$apply()
    } else {
      this.loadStatus = 'more'
    }
  }
  methods = {
    progress (id) {
      this.$navigate({
        url: 'progress?id=' + id
      })
    },
    async loadMore () {
      ++this.page
      this.loadStatus = 'loading'
      this.getData(this.page)
    }
  }
  mounted () {
    this.getData(1)
  }
  onPullDownRefresh () {
    this.contracts = []
    this.getData(1)
  }
}
</script>
<style lang="css">
@import '/zanui/cell';
</style>