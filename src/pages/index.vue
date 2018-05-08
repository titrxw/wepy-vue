<template>
  <view>
    <button @tap="login">登录</button>
    <button @tap="feedback">{{ msg }}feedback</button>
    <button @tap="auth">实名认证</button>
  </view>
</template>
<script>
import page from 'page';
export default class Upload extends page {
  data = {
    src: 'https://bj.zh5j.com/test.html'
  };
  methods = {
    login() {
      this.$router.push({
        path: 'login',
        params: {
          id: 1,
          test: 2
        }
      });
      this.$store.actions.msg(23);
    },
    feedback() {
      this.$router.push('feedback?id=1');
    },
    auth () {
      this.$router.push('authentication');
    }
  };
}
</script>
