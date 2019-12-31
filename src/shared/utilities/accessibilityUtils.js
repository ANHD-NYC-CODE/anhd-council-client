export const spaceEnterKeyDownHandler = (e, callback) => {
  if (e.keyCode === 13 || e.keyCode === 32) {
    e.preventDefault()
    callback(e)
  }
}
