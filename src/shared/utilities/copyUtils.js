export const convertToErrorMessage = error => {
  if (error.status === 500 && !error.message) {
    return `${error.status} - Oops, something went wrong.`
  } else {
    return `${error.status} - ${error.message}`
  }
}
