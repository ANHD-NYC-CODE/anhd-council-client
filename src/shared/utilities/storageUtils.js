import moment from 'moment'
export const LOCAL_STORAGE = 'anhd-dap-portal'
export const USER_STORAGE = 'anhd-dap-portal--user'
export const COUNCIL_DISTRICTS_INDEX = 'councils'
export const COMMUNITY_BOARDS_INDEX = 'communities'
import { logoutUser } from 'Store/Auth/actions'
import { get, set, del } from 'idb-keyval'
import { handleCatchError, handleActionDispatch } from 'shared/utilities/actionUtils'
import { handleCompletedRequest } from 'Store/Loading/actions'

const TOKEN_EXPIRATIONS = {
  access: 5, // minutes
  refresh: 10, // hours
}

export const getStorageDataAction = async (dispatch, constant, requestId, path, handleAction) => {
  handleActionDispatch(dispatch, constant, requestId)
  return get(path)
    .then(data => {
      if (data) {
        dispatch(handleAction({ data }, null, false))
        dispatch(handleCompletedRequest(constant, requestId))
        return data
      } else {
        return data
      }
    })
    .catch(error => {
      handleCatchError(error, constant, dispatch, requestId)
    })
}

export const getUserStorageData = () => {
  return getData(USER_STORAGE)
}

export const getLocalData = () => {
  return getData(LOCAL_STORAGE)
}

export const getCouncilDistrictsData = () => {
  return get(COUNCIL_DISTRICTS_INDEX)
}

export const getCommunityBoardsData = () => {
  return get(COMMUNITY_BOARDS_INDEX)
}

export const setCouncilDistrictsData = data => {
  return set(COUNCIL_DISTRICTS_INDEX, data)
}

export const setCommunityBoardsData = data => {
  console.log('SETTING', data)
  return set(COMMUNITY_BOARDS_INDEX, data)
}

export const delCouncilDistrictsData = () => {
  return del(COUNCIL_DISTRICTS_INDEX)
}

export const delCommunityBoardsData = () => {
  return del(COMMUNITY_BOARDS_INDEX)
}

const getData = path => {
  return JSON.parse(localStorage.getItem(path))
}

const storeData = (newData, path) => {
  let storage = getData(path)
  storage = { ...storage, ...newData }
  try {
    localStorage.setItem(path, JSON.stringify(storage))
  } catch (e) {
    console.log('Local Storage is full, Please empty data', e)
  }
}

export const updateLocalStorage = (key, value) => {
  let newData = {
    [key]: value,
    expiration: moment()
      .add(48, 'hours') // 2 Days
      .format(),
  }
  storeData(newData, LOCAL_STORAGE)
}

export const updateAuthLocalStorage = (access = null, refresh = null, user = null, dispatch) => {
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

    storeData(newData, USER_STORAGE)
  } catch (error) {
    dispatch(logoutUser())
  }
}

export const removeUserStorageData = () => {
  removeData(USER_STORAGE)
}

const removeData = path => {
  localStorage.removeItem(path)
}
