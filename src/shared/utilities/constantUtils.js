export const createPendingRequestConstant = type => {
  return `${type}_PENDING`
}

export const createCompletedRequestConstant = type => {
  return `${type}_COMPLETE`
}

export const createClearedErrorsConstant = type => {
  return `${type}_CLEAR_ERRORS`
}

export const createFailureConstant = type => {
  return `${type}_FAILURE`
}
