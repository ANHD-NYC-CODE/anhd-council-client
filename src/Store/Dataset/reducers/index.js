import * as c from '../constants'

export const initialState = {
  datasets: [],
  models: [],
}

export const datasetReducer = (state = Object.freeze(initialState), action = { data: [] }) => {
  switch (action.type) {
    case c.HANDLE_GET_DATASETS: {
      return {
        ...state,
        datasets: action.data.datasets,
        models: action.data.models,
      }
    }
    default:
      return state
  }
}
