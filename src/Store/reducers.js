import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { searchReducer } from 'Store/Search/reducers'
import { errorReducer } from 'Store/Error/reducers'
import { loadingReducer } from 'Store/Loading/reducers'
import { modalReducer } from 'Store/Modal/reducers'
import { authReducer } from 'Store/Auth/reducers'
import { datasetReducer } from 'Store/Dataset/reducers'
import { councilReducer } from 'Store/Council/reducers'
import { communityReducer } from 'Store/Community/reducers'
import { buildingReducer } from 'Store/Building/reducers'
import { advancedSearchReducer } from 'Store/AdvancedSearch/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    loading: loadingReducer,
    modal: modalReducer,
    dataset: datasetReducer,
    auth: authReducer,
    search: searchReducer,
    council: councilReducer,
    community: communityReducer,
    building: buildingReducer,
    advancedSearch: advancedSearchReducer,
  })
