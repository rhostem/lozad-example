// @flow
import types from '../../actions/actionTypes'
import { fromJS, Map } from 'immutable'
import { Data } from '../../models/data'

const initialState = fromJS({
  list: [],
})

const mapResultsToList = (results: Array<any>) => {
  return Array.isArray(results)
    ? fromJS(results.map(v => new Data(v)))
    : fromJS([])
}

const data = (state: Map = initialState, action: Object) => {
  switch (action.type) {
    case types.FETCH_DATA_SUCCESS:
      return state.set('list', mapResultsToList(action.results))

    case types.FETCH_DATA_FAILED:
      return state.set('list', fromJS([]))

    default:
      return state
  }
}

export default data
