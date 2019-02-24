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

      return {
        ...state,
        conditions: state.conditions.length === 1 ? [initialState.conditions[0]] : state.conditions.splice(index, 1),
      }
    }
    default:
      return state
  }
}
