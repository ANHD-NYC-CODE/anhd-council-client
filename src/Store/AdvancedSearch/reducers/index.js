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
      const newCondition =
        state.conditions[state.conditions.length - 1].type === 'AND'
          ? { type: 'OR', filters: [] }
          : { type: 'AND', filters: [] }

      const newConditions = state.conditions.slice()
      newConditions[action.conditionIndex].filters.push({ conditionGroup: action.conditionIndex + 1 })

      return {
        ...state,
        conditions: [...newConditions, newCondition],
      }
    }
    case c.REMOVE_LAST_CONDITION: {
      const newConditions = state.conditions.slice()
      newConditions.pop()

      if (newConditions.length > 0) {
        newConditions[newConditions.length - 1].filters.pop()
      }

      return {
        ...state,
        conditions: !newConditions.length ? [initialState.conditions[0]] : newConditions,
      }
    }
    case c.ADD_FILTER: {
      const newConditions = state.conditions.slice()
      let condition = newConditions[action.conditionIndex]
      if (condition.filters.some(el => el.conditionGroup)) {
        const conditionGroupFilter = condition.filters.pop()
        condition.filters.push(action.filter)
        condition.filters.push(conditionGroupFilter)
      } else {
        condition.filters.push(action.filter)
      }
      return {
        ...state,
        conditions: [
          ...newConditions.slice(0, action.conditionIndex),
          condition,
          ...newConditions.slice(action.conditionIndex + 1),
        ],
      }
    }

    case c.UPDATE_FILTER: {
      const newConditions = state.conditions.slice()
      let condition = newConditions[action.conditionIndex]
      condition.filters[action.filterIndex] = action.newFilter
      return {
        ...state,
        conditions: [
          ...newConditions.slice(0, action.conditionIndex),
          condition,
          ...newConditions.slice(action.conditionIndex + 1),
        ],
      }
    }
    case c.REMOVE_FILTER: {
      const newConditions = state.conditions.slice()
      let condition = newConditions[action.conditionIndex]
      condition.filters.splice(action.filterIndex, 1)
      return {
        ...state,
        conditions: [
          ...newConditions.slice(0, action.conditionIndex),
          condition,
          ...newConditions.slice(action.conditionIndex + 1),
        ],
      }
    }

    default:
      return state
  }
}
