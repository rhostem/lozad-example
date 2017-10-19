import types from '../../actions/actionTypes'
import { delay } from 'redux-saga'
import { all, put, takeLatest } from 'redux-saga/effects'

export function* fetchData() {
  try {
    const result = yield Promise.resolve('fetch stream result array')
    yield takeLatest(types.FETCH_DATA, result)
    yield delay(1000)
    yield put({ type: types.FETCH_DATA_SUCCESS })
  } catch (e) {
    yield put({ type: types.FETCH_DATA_FAILED, error: e })
  }
}

export default function* data() {
  yield all([fetchData()])
}
