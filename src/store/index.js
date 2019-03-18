
import { createStore } from 'redux'
import { setStore } from 'wepy-redux'
import rootReducer from './reducers'
const store = createStore(rootReducer)
setStore(store)

export default store
