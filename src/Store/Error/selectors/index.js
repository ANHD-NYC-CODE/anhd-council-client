export const createErrorSelector = actions => state => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  return actions.map(action => state.error[action]).filter(action => action)[0]
}
