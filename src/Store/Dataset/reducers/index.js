import * as c from '../constants'

export const initialState = {
  datasets: [],
  datasetModels: [],
  housingTypeModels: [],
}

export const datasetReducer = (state = Object.freeze(initialState), action = { data: {} }) => {
  console.log(action.type)
  switch (action.type) {
    case c.HANDLE_GET_DATASETS: {
      return {
        ...state,
        datasets: action.data.datasets,
        datasetModels: action.data.datasetModels,
        housingTypeModels: action.data.housingTypeModels,
      }
    }
    default:
      return state
  }
}
