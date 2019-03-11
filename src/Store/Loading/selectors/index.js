export const createLoadingSelector = actions => state => {
  // returns false only when all actions are not loading
  return actions.some(action => state.loading[action])
}

export const createLoadingReducerSelector = actions => loadingReducer => {
  // returns false only when all actions are not loading
  return actions.some(action => loadingReducer[action])
}
