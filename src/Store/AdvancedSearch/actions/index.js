import { constructAxiosGet } from 'shared/utilities/Axios'
import * as c from '../constants'
import * as u from 'shared/constants/urls'
import { transformStateIntoParamObject } from 'Store/AdvancedSearch/utilities/advancedSearchStoreUtils'

export const addNewCondition = (parentKey, conditionKey, filter) => {
  return {
    type: c.ADD_NEW_CONDITION,
    parentKey,
    conditionKey,
    filter, // optional create with filter
  }
}

export const changeConditionType = (conditionKey, conditionType) => {
  return {
    type: c.CHANGE_CONDITION_TYPE,
    conditionKey,
    conditionType,
  }
}

export const updateCondition = (conditionKey, condition) => {
  return {
    type: c.UPDATE_CONDITION,
    conditionKey,
    condition,
  }
}

export const removeCondition = conditionKey => ({
  type: c.REMOVE_CONDITION,
  conditionKey,
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

export const getAdvancedSearch = () => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  const datasetsConfig = getState().dataset.datasets
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.PROPERTY_URL}`,
    transformStateIntoParamObject(datasetsConfig, getState().advancedSearch),
    access_token,
    c.GET_ADVANCED_SEARCH,
    handleGetAdvancedSearch
  )
}
