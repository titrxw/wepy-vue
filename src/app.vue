<style lang="scss" src="./zanui/helper.scss"></style>
<style lang="scss" src="./assets/style/common.scss"></style>

<script>

import app from 'app'
export default class extends app {
  // 这里只能是静态数据
  config = {
    pages: [
      'pages/index',
      'pages/login'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };
}
</script>
