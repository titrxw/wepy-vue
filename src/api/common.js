import base from './base'
/**
 * 登录类
 */
export default class Common extends base {
  static sendMsg (params) {
    return this.post('common/sendMsg', {mobile: params})
  }
}
