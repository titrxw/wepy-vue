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
  register (params) {
    return ajax.post('contractC/common/bind', {form: params})
  },
  qrcode (params) {
    return ajax.post('transactionsC/common/miniProgramQrCode', params)
  }
}