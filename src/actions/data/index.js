// flow
import types from '../actionTypes'

type FetchDataAction = {
  type: string,
}
export const fetchData = (): FetchDataAction => {
  return {
    type: types.FETCH_DATA,
  }
}
