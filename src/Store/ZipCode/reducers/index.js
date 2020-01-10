import * as c from '../constants'

export const initialState = {
  districts: [],
  district: undefined,
  districtHousing: undefined,
  districtPropertySummaries: {},
}

export const zipCodeReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.HANDLE_GET_ZIPCODES: {
      return {
        ...state,
        districts: action.data,
      }
    }
    case c.HANDLE_GET_ZIPCODE: {
      return {
        ...state,
        district: action.data,
      }
    }
    case c.HANDLE_GET_ZIPCODE_HOUSING: {
      return {
        ...state,
        districtHousing: action.data,
      }
    }
    case c.HANDLE_GET_ZIPCODE_PROPERTY_SUMMARY: {
      return {
        ...state,
        districtPropertySummaries: {
          ...state.districtPropertySummaries,
          [action.key]: action.data,
        },
      }
    }
    default:
      return state
  }
}
