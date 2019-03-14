export class DataRequest {
  constructor({ results = [], paramMaps = [] } = {}) {
    this._results = results
    this._paramMaps = paramMaps
  }

  get results() {
    return this._results
  }

  set results(results) {
    this._results = results
  }

  get paramMaps() {
    return this._paramMaps
  }

  set paramMaps(paramMaps) {
    this._paramMaps = paramMaps
  }
}
