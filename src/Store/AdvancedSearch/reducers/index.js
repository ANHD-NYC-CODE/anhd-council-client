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
    case c.ADD_CONDITION: {
      return {
        ...state,
        conditions: state === initialState ? [action.data] : [...state.conditions, action.data],
      }
    }
    case c.REMOVE_CONDITION: {
      const index = initialState.conditions.indexOf(action.data)
      const newConditions = state.conditions.slice()
      return {
        ...state,
        conditions: state.conditions.length === 1 ? [initialState.conditions[0]] : newConditions.splice(index, 1),
      }
    }
    case c.ADD_FILTER: {
      let condition = state.conditions[action.index]
      condition.filters.push(action.filter)
      const newConditions = state.conditions.slice()
      return {
        ...state,
        conditions: [...newConditions.splice(0, action.index), condition, ...newConditions.splice(action.index + 1)],
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
