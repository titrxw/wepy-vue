import { handleActions } from 'redux-actions'
import types from '../constants/websocket'

const defaultState = {
  newOrder: 0
}

export default handleActions({
  [types.NEW_ORDER](state, action) {
    if (action.newOrder >= 0) {
      state.newOrder = action.newOrder
    }
    
    return state
  }
}, defaultState)