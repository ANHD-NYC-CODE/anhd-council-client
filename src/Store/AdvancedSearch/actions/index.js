import { constructAxiosGet } from 'shared/utilities/Axios'
import * as c from '../constants'
import * as u from 'shared/constants/urls'

import { convertConditionMappingToQ } from 'shared/utilities/advancedSearchUtils'

export const addNewCondition = conditionIndex => {
  return {
    type: c.ADD_NEW_CONDITION,
    conditionIndex,
  }
}

export const removeLastCondition = () => ({
  type: c.REMOVE_LAST_CONDITION,
})

export const addFilter = (conditionIndex, filter) => ({
  type: c.ADD_FILTER,
  filter: filter,
  conditionIndex,
})

export const updateFilter = (conditionIndex, filterIndex, newFilter) => ({
  type: c.UPDATE_FILTER,
  conditionIndex,
  filterIndex,
  newFilter,
})

export const removeFilter = (conditionIndex, filterIndex) => ({
  type: c.REMOVE_FILTER,
  conditionIndex,
  filterIndex,
})

export const handleGetAdvancedSearch = response => ({
  type: c.HANDLE_GET_ADVANCED_SEARCH,
  data: response.data,
})

export const getAdvancedSearch = conditions => (dispatch, getState, access_token) => {
  const requestId = Math.floor(Math.random() * 1000000)
  return constructAxiosGet(
    dispatch,
    getState,
    requestId,
    `${u.PROPERTY_URL}`,
    { q: convertConditionMappingToQ(conditions) },
    access_token,
    c.GET_ADVANCED_SEARCH,
    handleGetAdvancedSearch
  )
}
