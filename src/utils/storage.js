var rememberData = {}
export default {
    set(key, data, expire = 0) {
        if (!data) {
            return false;
        }
        rememberData[key] = data
        try {
            wx.setStorageSync(key, data)
            if (expire > 0) {
                this.set(key + '-expire', new Date().valueOf() + expire)
            }
        } catch (e) {
            console.log('storage error')
        }
    },
    get(key, _default = null) {
        let expire = null
        try {
            expire = wx.getStorageSync(key + '-expire')
        } catch (e) {
            expire = null
        }
        if (expire) {
            if (ctime > expire) {
                this.rm(key)
                return _default
            }
        }

        if (!rememberData[key]) {
            let data = null
            try {
                data = wx.getStorageSync(key)
            } catch (e) {
                data = _default
            }
            if (!data) {
                data = _default
            }
            rememberData[key] = data
        }

        return rememberData[key]
    },
    rm(key) {
        delete rememberData[key]
        try {
            wx.removeStorageSync(key)
            if (rememberData[key + '-expire']) {
                wx.removeStorageSync(key + '-expire')
            }
        } catch (e) {
            console.log('storage error')
        }
    }
}