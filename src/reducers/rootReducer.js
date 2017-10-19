import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'
import data from './data'

const rootReducer = combineReducers({
  router: routerReducer,
  data,
})

export default rootReducer
