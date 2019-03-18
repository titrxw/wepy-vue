import types from '../constants/websocket'

export default {
    [types.NOTIFY]: (newOrder) => ({
        type: types.NOTIFY,
        newOrder
    })
}