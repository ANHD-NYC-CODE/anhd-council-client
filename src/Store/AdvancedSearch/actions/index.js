import * as c from '../constants'
export const addCondition = condition => ({
  type: c.ADD_CONDITION,
  data: condition,
})

export const removeCondition = condition => ({
  type: c.REMOVE_CONDITION,
  data: condition,
})

export const addFilter = (conditionIndex, filter) => ({
  type: c.ADD_FILTER,
  filter: filter,
  index: conditionIndex,
})

export const removeFilter = (conditionIndex, filterIndex) => ({
  type: c.REMOVE_FILTER,
  filterIndex: filterIndex,
  conditionIndex: conditionIndex,
})
