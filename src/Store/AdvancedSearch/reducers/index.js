import * as c from '../constants'
import { Condition } from 'shared/classes/Condition'
import { ConditionFilter } from 'shared/classes/ConditionFilter'
import { cloneInstance } from 'shared/utilities/classUtils'
import { Filter } from 'shared/classes/Filter'

export const initialState = {
  conditions: {
    '0': new Condition({ key: '0', type: 'AND', filters: [] }),
  },
  boundaries: [],
  housingTypes: [new Filter({ modelConstant: 'ALL_TYPES' })],
  results: undefined,
}

export const advancedSearchReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.ADD_NEW_CONDITION: {
      const newConditions = { ...state.conditions }
      const parentCondition = newConditions[action.parentKey]

      const transferredFilter =
        action.filterIndex || action.filterIndex === 0 ? parentCondition.filters[action.filterIndex] : undefined

      const newCondition = new Condition({
        key: action.conditionKey,
        type: parentCondition.type === 'AND' ? 'OR' : 'AND',
        filters: transferredFilter ? [transferredFilter] : [],
      })

      parentCondition.addFilter({
        filter: new ConditionFilter({ conditionGroup: action.conditionKey }),
      })
      parentCondition.removeFilter({ filterIndex: action.filterIndex })
      return {
        ...state,
        conditions: { ...newConditions, [action.conditionKey]: newCondition },
      }
    }
    case c.CHANGE_CONDITION_TYPE: {
      const changedCondition = cloneInstance(state.conditions[action.conditionKey])
      changedCondition.type = action.conditionType
      return {
        ...state,
        conditions: { ...state.conditions, [action.conditionKey]: changedCondition },
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
