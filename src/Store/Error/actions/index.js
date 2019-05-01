import * as u from 'shared/utilities/constantUtils'

export const handleClearErrors = type => ({
  type: u.createClearedErrorsConstant(type),
})

export const handleFailure = (type, status, message) => {
  return {
    type: u.createFailureConstant(type),
    status: status,
    message: message,
  }
}
