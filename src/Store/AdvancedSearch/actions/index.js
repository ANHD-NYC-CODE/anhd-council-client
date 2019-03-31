import { constructAxiosGet } from 'shared/utilities/Axios'
import * as c from '../constants'
import * as u from 'shared/constants/urls'

export const replacePropertyFilter = propertyFilter => ({
  type: c.REPLACE_PROPERTY_FILTER,
  propertyFilter,
})

export const addNewCondition = (parentKey, conditionKey, filterIndex) => {
  return {
    type: c.ADD_NEW_CONDITION,
    parentKey,
    conditionKey,
    filterIndex, // optionally move a filter to new condition from parent
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
