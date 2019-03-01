import * as c from '../constants'

export const initialState = {
  conditions: {
    '0': {
      type: 'AND',
      filters: [],
    },
  },
  results: undefined,
}

export const advancedSearchReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.ADD_NEW_CONDITION: {
      const newCondition =
        state.conditions[action.parentKey].type === 'AND' ? { type: 'OR', filters: [] } : { type: 'AND', filters: [] }

      const newConditions = { ...state.conditions }
      newConditions[action.parentKey].filters.push({ conditionGroup: action.conditionKey })

      return {
        ...state,
        conditions: { ...newConditions, [action.conditionKey]: newCondition },
      }
    }
    case c.REMOVE_CONDITION: {
      const newConditions = { ...state.conditions }

      delete newConditions[action.conditionKey]

      // Remove conditionGroup links in other condition filters
      for (const key in newConditions) {
        newConditions[key].filters = newConditions[key].filters.filter(
          f => !f.conditionGroup || f.conditionGroup !== action.conditionKey
        )
      }

      return {
        ...state,
        conditions:
          Object.entries(newConditions).length === 0 && newConditions.constructor === Object
            ? { ...initialState.conditions }
            : newConditions,
      }
    }
    case c.ADD_FILTER: {
      const newConditions = { ...state.conditions }
      let condition = newConditions[action.conditionKey]
      let conditionGroups = condition.filters.filter(f => f.conditionGroup)
      condition.filters = condition.filters.filter(f => !f.conditionGroup)
      condition.filters.push(action.filter)
      condition.filters = condition.filters.concat(conditionGroups)
      newConditions[action.conditionKey] = condition
      return {
        ...state,
        conditions: { ...newConditions },
      }
    }

    case c.UPDATE_FILTER: {
      const newConditions = { ...state.conditions }
      let condition = newConditions[action.conditionKey]
      condition.filters[action.filterIndex] = action.newFilter
      newConditions[action.conditionKey] = condition
      return {
        ...state,
        conditions: { ...newConditions },
      }
    }
    case c.REMOVE_FILTER: {
      const newConditions = { ...state.conditions }
      let condition = newConditions[action.conditionKey]
      condition.filters.splice(action.filterIndex, 1)
      newConditions[action.conditionKey] = condition
      return {
        ...state,
        conditions: { ...newConditions },
      }
    }
    case c.HANDLE_GET_ADVANCED_SEARCH: {
      return {
        ...state,
        results: action.data,
      }
    }

    default:
      return state
  }
}
