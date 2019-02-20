import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { searchReducer } from 'Store/Search/reducers'
import { errorReducer } from 'Store/Error/reducers'
import { loadingReducer } from 'Store/Loading/reducers'
import { modalReducer } from 'Store/Modal/reducers'
import { authReducer } from 'Store/Auth/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    loading: loadingReducer,
    modal: modalReducer,
    auth: authReducer,
    search: searchReducer,
  })
