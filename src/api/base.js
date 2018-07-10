import G from '@/conf';
import md5 from 'md5'
import ajax from './ajax'

export default class base {
    static reset = {}
    static G = G

    static apiReset (url, data, header = {}) {
        let key = url;
        if (data) {
            if (typeof(data) == 'array' || typeof(data) == 'object')
                key += JSON.stringify(data)
            else
                key += data
        }
        if (header != {}) {
            key += JSON.stringify(header)
        }
        key = md5(key);
        if (this.reset[key] === true) {
            return false;
        }
        this.reset[key] = true

        return key
    }

    static async post(url, data, header = {}, checkReset = true) {
        let key = ''
        if (checkReset) {
            key = this.apiReset(url, data, header)
            if (!key) {
                return false;
            }
        }
        

        let result = await ajax.post(url, data, header)
        if (checkReset) {
            delete this.reset[key]
        }
        return result
    }

    static async get(url, data = {}, header = {}, checkReset = true) {
        let key = ''
        if (checkReset) {
            key = this.apiReset(url, data, header)
            if (!key) {
                return false;
            }
        }
        

        let result = await ajax.get(url, data, header)
        if (checkReset) {
            delete this.reset[key]
        }
        return result
    }
}