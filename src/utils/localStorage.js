import * as R from 'ramda'

export const getLocalStorageItem = (name: string): any => {
  const getStorage = name => window.localStorage.getItem(name)
  const item = R.compose(JSON.parse, getStorage)(name)
  return item
}

export const setLocalStorageItem = (name: string, value: any): void => {
  const stringifiedValue = JSON.stringify(value)
  window.localStorage.setItem(name, stringifiedValue)
}
