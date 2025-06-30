import dayjs from 'dayjs'
import log from 'loglevel'

import * as c from 'shared/constants'
import { get, set, del } from 'idb-keyval'
import { handleActionDispatch } from 'shared/utilities/actionUtils'
import { handleCompletedRequest } from 'Store/Loading/actions'

export const LOCAL_STORAGE = 'anhd-dap-portal'
export const USER_STORAGE = 'anhd-dap-portal--user'
export const COUNCIL_DISTRICTS_INDEX = 'councils'
export const COMMUNITY_BOARDS_INDEX = 'communities'
export const STATE_ASSEMBLY_INDEX = 'state-assembly'
export const STATE_SENATE_INDEX = 'state-senate'
export const ZIPCODE_INDEX = 'zipcode'

// Cross-tab synchronization
let storageEventListeners = new Set()
let isRefreshingToken = false
let refreshPromise = null
let storageEventListenerInitialized = false

export const addStorageEventListener = (listener) => {
  storageEventListeners.add(listener)
  console.log('📡 Storage listener added, total listeners:', storageEventListeners.size)
}

export const removeStorageEventListener = (listener) => {
  storageEventListeners.delete(listener)
  console.log('📡 Storage listener removed, total listeners:', storageEventListeners.size)
}

export const setTokenRefreshState = (refreshing, promise = null) => {
  isRefreshingToken = refreshing
  refreshPromise = promise
}

export const isTokenRefreshing = () => isRefreshingToken

export const getRefreshPromise = () => refreshPromise

// Initialize storage event listener for cross-tab synchronization
const initializeStorageEventListener = () => {
  if (storageEventListenerInitialized || typeof window === 'undefined') {
    return
  }

  try {
    console.log('🔧 Initializing storage event listener...')
    
    const storageEventHandler = (event) => {
      console.log('🔄 Raw storage event received:', {
        key: event.key,
        oldValue: event.oldValue ? 'exists' : 'null',
        newValue: event.newValue ? 'exists' : 'null',
        url: event.url,
        storageArea: event.storageArea
      })
      
      if (event.key === USER_STORAGE) {
        try {
          console.log('🔄 Storage event detected for USER_STORAGE:', {
            key: event.key,
            oldValue: event.oldValue ? 'exists' : 'null',
            newValue: event.newValue ? 'exists' : 'null',
            timestamp: new Date().toISOString()
          });
          
          const newData = event.newValue ? JSON.parse(event.newValue) : null
          const oldData = event.oldValue ? JSON.parse(event.oldValue) : null
          
          console.log('📡 Notifying', storageEventListeners.size, 'storage listeners...');
          
          // Notify all listeners about the storage change
          storageEventListeners.forEach((listener, index) => {
            try {
              console.log(`📡 Calling listener ${index + 1}/${storageEventListeners.size}...`);
              listener(newData, oldData, event)
            } catch (listenerError) {
              console.error(`❌ Error in storage listener ${index + 1}:`, listenerError)
            }
          })
          
          console.log('✅ Storage event processed successfully');
        } catch (error) {
          log.error('Error parsing storage event data:', error)
          console.error('❌ Storage event error:', error);
        }
      }
    }

    // Remove any existing listener first
    window.removeEventListener('storage', storageEventHandler)
    
    // Add the new listener
    window.addEventListener('storage', storageEventHandler, false)
    
    storageEventListenerInitialized = true
    console.log('✅ Storage event listener initialized successfully')
    
    // Test the listener is working
    setTimeout(() => {
      console.log('🧪 Testing storage event listener...')
      try {
        const testKey = 'test-storage-event-' + Date.now()
        localStorage.setItem(testKey, 'test')
        localStorage.removeItem(testKey)
        console.log('✅ Storage event listener test completed')
      } catch (e) {
        console.log('⚠️ Storage event listener test failed:', e)
      }
    }, 1000)
    
  } catch (error) {
    console.error('❌ Failed to initialize storage event listener:', error)
    log.error('Failed to initialize storage event listener:', error)
  }
}

// Initialize immediately when module is loaded
initializeStorageEventListener()

// Also initialize when the module is imported (in case it's loaded before DOM is ready)
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStorageEventListener)
  } else {
    // DOM is already ready, initialize immediately
    initializeStorageEventListener()
  }
}

export const getStorageDataAction = async (dispatch, constant, requestId, path, handleAction) => {
  handleActionDispatch(dispatch, constant, requestId)
  return get(path)
    .then(storageData => {
      const now = dayjs()
      const expiration = dayjs(storageData.expires)
      if (storageData.data && expiration > now) {
        dispatch(handleAction({ data: storageData.data }, null, false))
        dispatch(handleCompletedRequest(constant, requestId))
        return storageData
      } else {
        return null
      }
    })
    .catch(() => {
      return // silently fail and let Axios take with fetching data
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

export const getStateAssemblyBoardsData = () => {
  return get(STATE_ASSEMBLY_INDEX)
}

export const getStateSenateBoardsData = () => {
  return get(STATE_SENATE_INDEX)
}

export const getZipCodeBoardsData = () => {
  return get(ZIPCODE_INDEX)
}

const addExpirationDate = data => {
  return {
    expires: new Date(dayjs().add('2', 'day')),
    data,
  }
}

const setIndexedData = (path, data) => {
  const formattedData = addExpirationDate(data)
  return set(path, formattedData)
}

export const setIndexedDataThenUpdateReducer = (path, response) => {
  return setIndexedData(path, response.data).catch(log.error)
}

export const deleteIndexedDate = path => {
  return del(path)
}

export const delCouncilDistrictsData = () => {
  return del(COUNCIL_DISTRICTS_INDEX)
}

export const delCommunityBoardsData = () => {
  return del(COMMUNITY_BOARDS_INDEX)
}

export const delStateAssemblyData = () => {
  return del(STATE_ASSEMBLY_INDEX)
}

export const delStateSenateData = () => {
  return del(STATE_SENATE_INDEX)
}

export const delZipCodeData = () => {
  return del(ZIPCODE_INDEX)
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
    log.error('Local Storage is full, Please empty data', e)
  }
}

export const updateLocalStorage = (key, value) => {
  let newData = {
    [key]: value,
    expiration: dayjs()
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
        expiration: dayjs()
          .add(c.TOKEN_EXPIRATIONS.access, 'minutes')
          .format(),
      }
    }

    if (refresh) {
      refresh = {
        token: refresh,
        expiration: dayjs()
          .add(c.TOKEN_EXPIRATIONS.refresh, 'hours')
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
    log.error('Error updating auth localStorage:', error)
    // Note: logoutUser call removed due to circular dependency
    // The calling code should handle logout if needed
  }
}

export const removeUserStorageData = () => {
  removeData(USER_STORAGE)
}

const removeData = path => {
  localStorage.removeItem(path)
}
