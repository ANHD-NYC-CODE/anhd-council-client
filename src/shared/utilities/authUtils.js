import moment from 'moment'
import { USER_STORAGE } from 'shared/constants/actions'

const TOKEN_EXPIRATIONS = {
  access: 5, // minutes
  refresh: 10, // hours
}

export const updateLocalStorage = (access = null, refresh = null, user = null) => {
  try {
    if (access) {
      access = {
        token: access,
        expiration: moment()
          .add(TOKEN_EXPIRATIONS.access, 'minutes')
          .format(),
      }
    }

    if (refresh) {
      refresh = {
        token: refresh,
        expiration: moment()
          .add(TOKEN_EXPIRATIONS.refresh, 'hours')
          .format(),
      }
    }

    const newData = { access, refresh, user }
    // Clear null values
    for (var propName in newData) {
      if (newData[propName] === null || newData[propName] === undefined) {
        delete newData[propName]
      }
    }

    let storage = JSON.parse(localStorage.getItem(USER_STORAGE))
    storage = { ...storage, ...newData }
    console.log(storage)
    localStorage.setItem(USER_STORAGE, JSON.stringify(storage))
  } catch (error) {
    console.log(error)
  }
}
