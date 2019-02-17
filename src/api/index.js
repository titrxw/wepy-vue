import ajax from './ajax'

export default {
  getCurTime() {
    return ajax.get('worker_common/getCurrentTime')
  },
  miniProgramLogin(params) {
    return ajax.post('worker_common/miniProgramLogin', params)
  },
  register(params) {
    return ajax.post('worker_common/bind', {
      form: params
    })
  },
  unionLogin(params) {
    return ajax.post('worker_common/wxDataCrypt', params)
  },
  unbound () {
    return ajax.get('worker_member/unbound')
  },
  changePassword (form) {
    return ajax.post('worker_member/changePassword', {form})
  },
  about () {
    return ajax.get('worker_common/aboutUs')
  },
  feedBackTypes () {
    return ajax.get('worker_Goods/feedbackTypeList')
  },
  feedBack (form) {
    return ajax.post('worker_Goods/feedback', { form })
  },

  // 通知
  getNotify () {
    return ajax.get('worker_Goods/feedbackTypeList')
  }
}
