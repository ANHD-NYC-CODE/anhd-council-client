import * as actions from '../actions'

export const initialState = {
  building: undefined,
}

export const buildingReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case actions.HANDLE_MODAL_ACTION: {
      return {
        ...state,
        building: action.data,
      }
    }
    default:
      return state
  }
}
