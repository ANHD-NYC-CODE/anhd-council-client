import * as c from '../constants'
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
