export class ParamError {
  constructor({ message = '' } = {}) {
    this._message = message
  }

  get message() {
    return this._message
  }

  set message(message) {
    this._message = message
  }
}
