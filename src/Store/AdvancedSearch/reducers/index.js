import * as c from '../constants'
import { Condition } from 'shared/classes/Condition'
import { ConditionFilter } from 'shared/classes/ConditionFilter'

export const initialState = {
  conditions: {
    '0': new Condition({ key: '0', type: 'AND', filters: [] }),
  },
  boundaries: [],
  housingTypes: [],
  results: undefined,
}

export const advancedSearchReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.ADD_NEW_CONDITION: {
      const newCondition = new Condition({
        key: action.conditionKey,
        type: state.conditions[action.parentKey].type === 'AND' ? 'OR' : 'AND',
        filters: [],
      })

      const newConditions = { ...state.conditions }
      newConditions[action.parentKey].addFilter({
        filter: new ConditionFilter({ conditionGroup: action.conditionKey }),
      })
      return {
        ...state,
        conditions: { ...newConditions, [action.conditionKey]: newCondition },
      }
    }
    case c.UPDATE_CONDITION: {
      return {
        ...state,
        conditions: { ...state.conditions, [action.conditionKey]: action.condition },
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

      // Return to initial state with condition 0 if none left somehow
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

    case c.ADD_BOUNDARY: {
      return {
        ...state,
        boundaries: [...state.boundaries, action.boundary],
      }
    }
    case c.UPDATE_BOUNDARY: {
      return {
        ...state,
        boundaries: [
          ...state.boundaries.slice(0, action.boundaryIndex),
          action.boundary,
          ...state.boundaries.slice(action.boundaryIndex + 1),
        ],
      }
    }
    case c.REMOVE_BOUNDARY: {
      return {
        ...state,
        boundaries: [
          ...state.boundaries.slice(0, action.boundaryIndex),
          ...state.boundaries.slice(action.boundaryIndex + 1),
        ],
      }
    }
    case c.ADD_HOUSING_TYPE: {
      return {
        ...state,
        housingTypes: [...state.housingTypes, action.housingType],
      }
    }
    case c.UPDATE_HOUSING_TYPE: {
      return {
        ...state,
        housingTypes: [
          ...state.housingTypes.slice(0, action.housingTypeIndex),
          action.housingType,
          ...state.housingTypes.slice(action.housingTypeIndex + 1),
        ],
      }
    }
    case c.REMOVE_HOUSING_TYPE: {
      return {
        ...state,
        housingTypes: [
          ...state.housingTypes.slice(0, action.housingTypeIndex),
          ...state.housingTypes.slice(action.housingTypeIndex + 1),
        ],
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
