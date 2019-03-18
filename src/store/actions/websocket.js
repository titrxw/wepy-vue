import types from '../constants/websocket'

export default {
  [types.NEW_ORDER]: (newOrder) => ({
    type: types.NEW_ORDER,
    newOrder
  })
}
