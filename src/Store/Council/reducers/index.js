import * as c from '../constants'

export const initialState = {
  districts: undefined,
  district: undefined,
  districtHousing: undefined,
  districtPropertySummaries: undefined,
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
        district: action.data,
      }
    }
    case c.HANDLE_GET_COUNCIL_HOUSING: {
      return {
        ...state,
        districtHousing: action.data,
      }
    }
    case c.HANDLE_GET_COUNCIL_PROPERTY_SUMMARY: {
      return {
        ...state,
        districtPropertySummaries: {
          ...state.districtPropertySummaries,
          ...action.data,
        },
      }
    }
    default:
      return state
  }
}
