import * as c from '../constants'
import Condition from 'shared/classes/Condition'
import ConditionFilter from 'shared/classes/ConditionFilter'
import { cloneInstance } from 'shared/utilities/classUtils'

const defaultCondition = () => {
  return new Condition({ key: '0', type: 'AND', filters: [] })
}

export const initialState = () => ({
  conditions: {
    '0': defaultCondition(),
  },
  geographies: [],
  propertyFilter: undefined, // initialize in Config/index.js
  results: undefined,
})

export const advancedSearchReducer = (state = Object.freeze(initialState()), action = { data: [] }) => {
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
    case c.ADD_NEW_CONDITION_GROUP: {
      const newConditions = { ...state.conditions }
      const parentCondition = newConditions[action.parentKey]

      const newCondition = new Condition({
        key: action.conditionKey,
        type: parentCondition.type,
        filters: [...action.filters],
      })

      parentCondition.removeDatasetFilters()
      parentCondition.toggleType()
      parentCondition.addConditionGroup({
        filter: new ConditionFilter({ conditionGroup: action.conditionKey }),
      })
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
            ? { ...initialState().conditions }
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

    case c.ADD_GEOGRAPHY: {
      return {
        ...state,
        geographies: [...state.geographies, action.geography],
      }
    }
    case c.UPDATE_GEOGRAPHY: {
      return {
        ...state,
        geographies: [
          ...state.geographies.slice(0, action.geographyIndex),
          action.geography,
          ...state.geographies.slice(action.geographyIndex + 1),
        ],
      }
    }
    case c.REMOVE_GEOGRAPHY: {
      return {
        ...state,
        geographies: [
          ...state.geographies.slice(0, action.geographyIndex),
          ...state.geographies.slice(action.geographyIndex + 1),
        ],
      }
    }
    case c.REPLACE_PROPERTY_FILTER: {
      return {
        ...state,
        propertyFilter: action.propertyFilter,
      }
    }

    case c.HANDLE_GET_ADVANCED_SEARCH: {
      return {
        ...state,
        results: action.data,
      }
    }

    case c.RESET_ADVANCED_SEARCH_REDUCER: {
      return {
        ...initialState(),
        propertyFilter: action.propertyFilter,
      }
    }

    default:
      return state
  }
}
