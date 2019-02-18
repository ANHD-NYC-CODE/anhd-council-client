export const convertToErrorMessage = error => {
  if (error.status === 500 && !error.message) {
    return `${error.status} - Oops, something went wrong.`
  } else if (error.status === 400) {
    return `${error.status} - Invalid username and/or password`
  } else {
    return `${error.status} - ${error.message}`
  }
}
