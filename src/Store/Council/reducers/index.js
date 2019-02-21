import * as c from '../constants'

export const initialState = {
  districts: undefined,
  selectedDistrict: undefined,
  selectedDistrictHousing: undefined,
}

export const councilReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.HANDLE_GET_COUNCILS: {
      return {
        ...state,
        districts: action.data,
      }
    }
    case c.HANDLE_GET_COUNCIL: {
      return {
        ...state,
        selectedDistrict: action.data,
      }
    }
    case c.HANDLE_GET_COUNCIL_HOUSING: {
      return {
        ...state,
        selectedDistrictHousing: action.data,
      }
    }
    default:
      return state
  }
}
