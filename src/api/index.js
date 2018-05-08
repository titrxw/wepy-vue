import ajax from './ajax'
import conf from '../conf'

export default {
  getFeedBackType (params) {
    return ajax.post('system/setting', params)
  },
  submitFeedBack (params) {
    return ajax.post('member/feedBack', {form: params})
  },
  miniProgramLogin (params) {
    return ajax.post('common/miniProgramLogin', params)
  },
  wxDataCrypt (params) {
    return ajax.post('common/wxDataCrypt', params)
  },
  autoLogin (params) {
    return ajax.post('common/login', params)
  },
  sendMsg (params) {
    return ajax.post('common/sendMsg', params)
  },
  register (params) {
    return ajax.post('common/bind', {form: params})
  },
  /**
   * 
   * @param {*} params  {image_file: '文件地址'}
   */
  faceAuthCard (params) {
    return ajax.post('https://api-cn.faceplusplus.com/cardpp/v1/ocridcard', {
      api_key: conf.faceApiKey,
      api_secret: conf.faceApiSecret,
      legality: 1,
      ...params
    }, {
      'Content-Type': 'multipart/form-data; charset=UTF-8'
    })
  },
}