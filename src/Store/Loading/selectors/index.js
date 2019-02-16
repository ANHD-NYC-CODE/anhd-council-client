export const createLoadingSelector = actions => state => {
  // returns true only when all actions are not loading
  return actions.none(action => state[action] == 'REQUEST')
}
