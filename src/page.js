import wepy from 'wepy'
import user from '@/api/user';
import Tip from 'tip';
import G from '@/conf';

export default class page extends wepy.page {
  mounted(options) {

  }

  async render(options) {
    this.setData('G', G)
    this.G = G

    await this.mounted(options)

    this.setData('isMounted', true)
    this.isMounted = true

    this.$apply()
  }

  async onLoad(options) {
    if (this.config) {
      if (this.config.requireAuth) {
        let result = await user.miniProgramLogin()
        if (result) {
          this.render(options)
        } else {
          Tip.errorToast('登录失败')
        }
        return true
      } else if (this.config.requireLogin) {
        let result = await user.autoLogin()
        if (result) {
          this.render(options)
        } else {
          Tip.errorToast('登录失败')
        }
        return true
      }
    }

    this.render(options)
  }
}
