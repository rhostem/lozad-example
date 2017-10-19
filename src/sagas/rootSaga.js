import { all } from 'redux-saga/effects'
import data from './data'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([data()])
}
