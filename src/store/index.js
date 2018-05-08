import * as redux from 'redux'
import Actions from './actions'
import Reducers from './reducers'
import {
  getStore,
  setStore
} from 'wepy-redux'

let store = redux.createStore(Reducers, {})
setStore(store)

export default {
  // ...store,
  subscribe: store.subscribe,
  state: store.getState(),
  actions: redux.bindActionCreators(Actions, store.dispatch),
  ...getStore()
}
