import * as c from '../constants'

export const initialState = {
  conditions: [
    {
      type: 'AND',
      filters: [],
    },
  ],
}

export const advancedSearchReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.ADD_NEW_CONDITION: {
      const condition =
        state.conditions[state.conditions.length - 1].type === 'AND'
          ? { type: 'OR', filters: [] }
          : { type: 'AND', filters: [] }
      return {
        ...state,
        conditions: [...state.conditions, condition],
      }
    }
    case c.REMOVE_LAST_CONDITION: {
      const newConditions = state.conditions.slice()
      newConditions.pop()
      return {
        ...state,
        conditions: state.conditions.length === 1 ? [initialState.conditions[0]] : newConditions,
      }
    }
    case c.ADD_FILTER: {
      const newConditions = state.conditions.slice()
      let condition = newConditions[action.index]
      condition.filters.push(action.filter)
      return {
        ...state,
        conditions: [...newConditions.splice(0, action.index), condition, ...newConditions.splice(action.index + 1)],
      }
    }
    case c.UPDATE_FILTER: {
      const newConditions = state.conditions.slice()
      let condition = newConditions[action.conditionIndex]
      condition.filters[action.filterIndex] = action.newFilter
      return {
        ...state,
        conditions: [
          ...newConditions.splice(0, action.conditionIndex),
          condition,
          ...newConditions.splice(action.conditionIndex + 1),
        ],
      }
    }
    case c.REMOVE_FILTER: {
      let condition = state.conditions[action.conditionIndex]
      condition.filters.splice(action.filterIndex, 1)
      const newConditions = state.conditions.slice()

      return {
        ...state,
        conditions: [
          ...newConditions.splice(0, action.conditionIndex),
          condition,
          ...newConditions.splice(action.conditionIndex + 1),
        ],
      }
    }
    default:
      return state
  }
}
