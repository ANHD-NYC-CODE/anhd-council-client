import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { searchReducer } from 'Store/Search/reducers'
import { loadingReducer } from 'Store/Loading/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    loading: loadingReducer,
    search: searchReducer,
  })
