export default class WebSocket {
    host = null;
    header = null;
    method = null;

    _onError = null;
    _onConnect = null;
    _onClose = null;
    _onMessage = null;
    _hasConnect = null;
    _tryNum = 3;
    _hasTryNum = 0;
    _isHeartBeat = true;
    _pongHandle = null
    _pingHandle = null;



    constructor(tryNum = 3, heartBeat = true) {
        this._tryNum = tryNum
        this._isHeartBeat = heartBeat
    }

    startHeartbeat() {
        if (!this._isHeartBeat) {
            return false
        }
        this._pingHandle = setInterval(() => {
            this.send('ping')
            this._pongHandle = setTimeout(() => {
                wx.closeSocket()
            }, 5000)
        }, 15000)
    }

    stopHeartbeat() {
        if (!this._isHeartBeat) {
            return false
        }
        clearInterval(this._pingHandle)
        this._pingHandle = null
        this.checkPong()
    }

    checkPong() {
        if (this._pongHandle) {
            clearTimeout(this._pongHandle);
            this._pongHandle = null;
        }
    }

    onConnect(callback) {
        this._onConnect = callback;
    }

    onClose(callback) {
        this._onClose = callback;
    }

    onError(callback) {
        this._onError = callback;
    }

    onMessage(callback) {
        this._onMessage = callback;
    }

    connect(url, header = {
        'content-type': 'application/json'
    }, method = 'GET') {
        if (this._hasConnect) {
            return true;
        }

        this.host = url
        this.header = header
        this.method = method
        wx.connectSocket({
            url: url,
            header: header,
            method: method
        })

        wx.onSocketOpen(event => {
            this._hasConnect = true
            this._hasTryNum = 0
            this.startHeartbeat()
            this._onConnect && this._onConnect(event);
        })
        wx.onSocketError(event => {
            this._onError && this._onError(event);
        })
        wx.onSocketClose(event => {
            this._hasConnect = false
            this.stopHeartbeat()
            if (event.reason != 'client-close') {
                if (this._tryNum <= 0) {
                    this._onClose && this._onClose(event);
                } else {
                    this.reConnect()
                }
            } else {
                this._hasTryNum = 0
            }
        })
        wx.onSocketMessage(event => {
            this.checkPong()
            this._onMessage && this._onMessage(event.data);
        })
    }

    send(data) {
        if (!this._hasConnect) {
            return false
        }
        wx.sendSocketMessage({
            data: data
        })
    }

    close() {
        wx.closeSocket({
            reason: 'client-close'
        })
    }

    reConnect() {
        if (this._hasTryNum == this._tryNum) {
            this._onClose && this._onClose({
                reason: 'abnormal'
            });
            return false
        }

        ++this._hasTryNum
        this.connect(this.host, this.header, this.method)
    }
}