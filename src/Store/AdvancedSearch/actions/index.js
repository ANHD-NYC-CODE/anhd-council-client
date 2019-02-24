import * as c from '../constants'
export const addNewCondition = () => {
  return {
    type: c.ADD_NEW_CONDITION,
  }
}

export const removeLastCondition = condition => ({
  type: c.REMOVE_LAST_CONDITION,
  data: condition,
})

export const addFilter = (conditionIndex, filter) => ({
  type: c.ADD_FILTER,
  filter: filter,
  index: conditionIndex,
})

export const updateFilter = (conditionIndex, filterIndex, newFilter) => ({
  type: c.UPDATE_FILTER,
  conditionIndex,
  filterIndex,
  newFilter,
})

export const removeFilter = (conditionIndex, filterIndex) => ({
  type: c.REMOVE_FILTER,
  filterIndex: filterIndex,
  conditionIndex: conditionIndex,
})
