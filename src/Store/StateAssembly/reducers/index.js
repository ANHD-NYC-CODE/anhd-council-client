import * as c from '../constants'

export const initialState = {
  districts: [],
  district: undefined,
  districtHousing: undefined,
  districtPropertySummaries: {},
}

export const stateAssemblyReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.HANDLE_GET_STATE_ASSEMBLIES: {
      return {
        ...state,
        districts: action.data,
      }
    }
    case c.HANDLE_GET_STATE_ASSEMBLY: {
      return {
        ...state,
        district: action.data,
      }
    }
    case c.HANDLE_GET_STATE_ASSEMBLY_HOUSING: {
      return {
        ...state,
        districtHousing: action.data,
      }
    }
    case c.HANDLE_GET_STATE_ASSEMBLY_PROPERTY_SUMMARY: {
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
