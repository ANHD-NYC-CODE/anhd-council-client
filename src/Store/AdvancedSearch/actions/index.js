import { constructAxiosGet } from 'shared/utilities/Axios'
import * as c from '../constants'
import * as u from 'shared/constants/urls'

import { convertConditionMappingToQ } from 'AdvancedSearch/utilities/advancedSearchUtils'

export const addNewCondition = (parentKey, conditionKey) => {
  return {
    type: c.ADD_NEW_CONDITION,
    parentKey,
    conditionKey,
  }
}

export const removeCondition = conditionKey => ({
  type: c.REMOVE_CONDITION,
  conditionKey,
})

export const addFilter = (conditionKey, filter) => ({
  type: c.ADD_FILTER,
  filter: filter,
  conditionKey,
})

export const updateFilter = (conditionKey, filterIndex, newFilter) => ({
  type: c.UPDATE_FILTER,
  conditionKey,
  filterIndex,
  newFilter,
})

export const removeFilter = (conditionKey, filterIndex) => ({
  type: c.REMOVE_FILTER,
  conditionKey,
  filterIndex,
})

export const addBoundary = boundary => ({
  type: c.ADD_BOUNDARY,
  boundary,
})

export const updateBoundary = (boundaryIndex, boundary) => ({
  type: c.UPDATE_BOUNDARY,
  boundaryIndex,
  boundary,
})

export const removeBoundary = boundaryIndex => ({
  type: c.REMOVE_BOUNDARY,
  boundaryIndex,
})

export const addHousingType = housingType => ({
  type: c.ADD_HOUSING_TYPE,
  housingType,
})

export const updateHousingType = (housingTypeIndex, housingType) => ({
  type: c.UPDATE_HOUSING_TYPE,
  housingTypeIndex,
  housingType,
})

export const removeHousingType = housingTypeIndex => ({
  type: c.REMOVE_HOUSING_TYPE,
  housingTypeIndex,
})

export const handleGetAdvancedSearch = response => ({
  type: c.HANDLE_GET_ADVANCED_SEARCH,
  data: response.data,
})

export const getAdvancedSearch = advancedSearch => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  const datasetsConfig = getState().dataset.datasets
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.PROPERTY_URL}`,
    {
      ...Object.assign(
        {},
        ...advancedSearch.boundaries.map(b => ({
          [b.object.queryName]: b.id,
        }))
      ),
      q: convertConditionMappingToQ(datasetsConfig, advancedSearch.conditions),
    },
    access_token,
    c.GET_ADVANCED_SEARCH,
    handleGetAdvancedSearch
  )
}
