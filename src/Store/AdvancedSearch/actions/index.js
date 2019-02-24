import * as c from '../constants'
export const addCondition = condition => ({
  type: c.ADD_CONDITION,
  data: condition,
})

export const removeCondition = condition => ({
  type: c.REMOVE_CONDITION,
  data: condition,
})
