import * as constants from '../constants'

export const initialState = {
  building: undefined,
}

export const buildingReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case constants.HANDLE_GET_BUILDING: {
      return {
        ...state,
        currentBuilding: action.data,
      }
    }
    default:
      return state
  }
}
