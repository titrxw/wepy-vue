import G from '@/conf';
import ajax from './ajax'

export default class base {
  static G = G

  static post(url, data, header = {}) {
    return ajax.post(url, data, header)
  }

  static get(url, data = {}, header = {}) {
    return ajax.get(url, data, header)
  }
}