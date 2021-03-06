import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { searchReducer } from 'Store/Search/reducers'
import { errorReducer } from 'Store/Error/reducers'
import { loadingReducer } from 'Store/Loading/reducers'
import { requestReducer } from 'Store/Request/reducers'
import { modalReducer } from 'Store/Modal/reducers'
import { authReducer } from 'Store/Auth/reducers'
import { datasetReducer } from 'Store/Dataset/reducers'
import { councilReducer } from 'Store/Council/reducers'
import { communityReducer } from 'Store/Community/reducers'
import { stateAssemblyReducer } from 'Store/StateAssembly/reducers'
import { stateSenateReducer } from 'Store/StateSenate/reducers'
import { zipCodeReducer } from 'Store/ZipCode/reducers'
import { buildingReducer } from 'Store/Building/reducers'
import { appStateReducer } from 'Store/AppState/reducers'
import { advancedSearchReducer } from 'Store/AdvancedSearch/reducers'
import { dashboardStateReducer } from 'Store/DashboardState/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    loading: loadingReducer,
    requests: requestReducer,
    modal: modalReducer,
    dataset: datasetReducer,
    auth: authReducer,
    appState: appStateReducer,
    dashboardState: dashboardStateReducer,
    search: searchReducer,
    council: councilReducer,
    community: communityReducer,
    stateAssembly: stateAssemblyReducer,
    stateSenate: stateSenateReducer,
    zipCode: zipCodeReducer,
    building: buildingReducer,
    advancedSearch: advancedSearchReducer,
  })
