import {
  combineReducers
} from 'redux'

function _combineReducers(initState = {}, reduce) {
  return (state = initState, action) => reduce[action.type] && reduce[action.type](state, action) || state
}


const state = {
  msg: ''
}



const sys = _combineReducers(state, {
  msg: (state, action) => {
    state.msg = action.data
    console.log(action)
    return state
  }
})


const reducers = combineReducers({
  sys
})

export default reducers
