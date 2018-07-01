import G from '@/conf';
import md5 from 'md5'
import ajax from './ajax'

export default class base {
    static single = {}
    static G = G

    static async post(url, data, header = {}, isSingle = true) {
        let key = url;
        if (isSingle) {
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
            if (this.single[key] === true) {
                return false;
            }
            this.single[key] = true
        }

        let result = await ajax.post(url, data, header)
        if (isSingle) {
            delete this.single[key]
        }
        return result
    }
    static async get(url, data, header = {}, isSingle = true) {
        let key = url;
        if (isSingle) {
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
            if (this.single[key] === true) {
                return false;
            }
            this.single[key] = true
        }

        let result = await ajax.get(url, data, header)
        if (isSingle) {
            delete this.single[key]
        }
        return result
    }
}