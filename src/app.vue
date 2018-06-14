<style lang="scss" src="./zanui/helper.scss"></style>
<style lang="scss" src="./assets/style/common.scss"></style>

<script>

import app from 'app'
export default class extends app {
  // 这里只能是静态数据
  config = {
    pages: [
      'pages/shop/orderDetial',
      'pages/shop/orderList',
      'pages/shop/shopCart',
      'pages/user/index',
      'pages/user/edit',
      'pages/user/cards',
      'pages/user/shareCard',
      'pages/shop/index',
      'pages/shop/detail',
      'pages/dynamic/index',
      'pages/website/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
        'color': '#666666',
        'selectedColor': '#F3514F',
        'borderStyle': 'white',
        'backgroundColor': '#FAFAFA',
        'list': [
          {
            // 'iconPath': 'images/tab/home.png',
            // 'selectedIconPath': 'images/tab/red/home-active.png',
            'pagePath': 'pages/user/index',
            'text': '我的'
          },
          {
            // 'iconPath': 'images/tab/order.png',
            // 'selectedIconPath': 'images/tab/red/order-active.png',
            'pagePath': 'pages/shop/index',
            'text': '商品'
          },
          {
            // 'iconPath': 'images/tab/cart.png',
            // 'selectedIconPath': 'images/tab/red/cart-active.png',
            'pagePath': 'pages/dynamic/index',
            'text': '动态'
          },
          {
            // 'iconPath': 'images/tab/cart.png',
            // 'selectedIconPath': 'images/tab/red/cart-active.png',
            'pagePath': 'pages/website/index',
            'text': '官网'
          }
        ]
      }
  };
}
</script>
