import * as c from '../constants'

export const initialState = {
  datasets: [],
}

export const datasetReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.HANDLE_GET_DATASETS: {
      return {
        ...state,
        datasets: action.data,
      }
    }
    default:
      return state
  }
}
