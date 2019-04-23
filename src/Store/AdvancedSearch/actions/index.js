import * as c from '../constants'

export const replacePropertyFilter = propertyFilter => ({
  type: c.REPLACE_PROPERTY_FILTER,
  propertyFilter,
})

export const addNewCondition = ({ parentKey, conditionKey, filterIndex = undefined } = {}) => {
  return {
    type: c.ADD_NEW_CONDITION,
    parentKey,
    conditionKey,
    filterIndex, // optionally move a filter to new condition from parent
  }
}

export const addNewConditionGroup = ({ parentKey, conditionKey, filters = [] } = {}) => {
  return {
    type: c.ADD_NEW_CONDITION_GROUP,
    parentKey,
    conditionKey,
    filters,
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

export const removeConditionGroup = (removedConditionKey, parentConditionKey) => ({
  type: c.REMOVE_CONDITION_GROUP,
  removedConditionKey,
  parentConditionKey,
})

export const addGeography = geography => ({
  type: c.ADD_GEOGRAPHY,
  geography,
})

export const updateGeography = (geographyIndex, geography) => ({
  type: c.UPDATE_GEOGRAPHY,
  geographyIndex,
  geography,
})

export const removeGeography = geographyIndex => ({
  type: c.REMOVE_GEOGRAPHY,
  geographyIndex,
})

export const handleGetAdvancedSearch = response => ({
  type: c.HANDLE_GET_ADVANCED_SEARCH,
  data: response.data,
})

export const resetAdvancedSearchReducer = propertyFilter => ({
  type: c.RESET_ADVANCED_SEARCH_REDUCER,
  propertyFilter,
})
