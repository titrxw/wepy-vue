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

    onLoad(options) {
        if (this.config && this.config.requireLogin) {
            let self = this
            this.autoLogin(function() {
                self.render(options)
            })
        } else {
            this.render(options)
        }
    }

    async miniProgramLogin(callback = null) {
        Tip.showLoading();
        let result = await user.miniProgramLogin()
        Tip.hideLoading();
        if (result && callback) {
          callback()
        }
    
        return result
      }
    
      async autoLogin(callback = null) {
        Tip.showLoading();
        let result = await user.autoLogin()
        Tip.hideLoading();
        if (result && callback) {
          callback()
        }
        
        return result
      }
}