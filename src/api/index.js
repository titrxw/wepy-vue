import ajax from './ajax'
import conf from '../conf'

export default {
  miniProgramLogin (params) { 
    return ajax.post('contractC/common/miniProgramLogin', params)
  },
  wxDataCrypt (params) {
    return ajax.post('common/wxDataCrypt', params)
  },
  autoLogin (params) {
    return ajax.post('contractC/common/login', params)
  },
  sendMsg (params) {
    return ajax.post('contractC/common/sendMsg', params)
  }, 
  register (params) {
    return ajax.post('contractC/common/bind', {form: params})
  },
  contractList (params = null) {
    return ajax.post('contractC/customer/contractList', {form: params})
  },
  personAuth (params) {
    return ajax.post('contractC/customer/personAuth', {form: params})
  }, 
  contractRecordDetail (params) {
    return ajax.post('contractC/customer/contractRecordDetail', params)
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