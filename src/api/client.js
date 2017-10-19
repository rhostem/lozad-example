// @flow

// add "import 'whatwg-fetch'" at entry file to use fetch API
// https://github.com/github/fetch

import { getLocalStorageItem } from '../utils/localStorage'
import { LOCAL_STORAGE } from '../constants'

const API_ROOT = process.env.REACT_APP_API_ROOT
const headers = new Headers()
headers.set('Content-Type', 'application/json')
headers.set(
  'Authorization',
  `Bearer ${getLocalStorageItem(LOCAL_STORAGE.USER_AUTH_TOKEN)}`
)

const defaultOptions = {
  mode: 'cors',
  cache: 'default',
  headers,
}
const mergeDefulatOption = options => Object.assign({}, defaultOptions, options)

const withRootURL = url => `${API_ROOT}${url}`

// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
const handleError = res => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export default {
  get: (url, options) =>
    fetch(
      withRootURL(url),
      mergeDefulatOption({
        ...options,
      })
    ).then(handleError),

  post: (url, body, options) =>
    fetch(
      withRootURL(url),
      mergeDefulatOption({
        method: 'POST',
        body: JSON.stringify(body),
        ...options,
      })
    ).then(handleError),

  put: (url, body, options) =>
    fetch(
      withRootURL(url),
      mergeDefulatOption({
        method: 'PUT',
        body: JSON.stringify(body),
        ...options,
      })
    ).then(handleError),

  delete: (url, options) =>
    fetch(
      withRootURL(url),
      mergeDefulatOption({
        method: 'DELETE',
        ...options,
      })
    ).then(handleError),
}
