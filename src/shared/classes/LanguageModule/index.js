export class LanguageModule {
  constructor({ type = 'AMOUNT', valuePrefix = '', valueSuffix = '' } = {}) {
    this._type = type
    this._valuePrefix = valuePrefix
    this._valueSuffix = valueSuffix
  }

  get type() {
    return this._type
  }

  set type(type) {
    this._type = type
  }

  get valueSuffix() {
    return this._valueSuffix
  }

  set valueSuffix(valueSuffix) {
    this._valueSuffix = valueSuffix
  }

  get valuePrefix() {
    return this._valuePrefix
  }

  set valuePrefix(valuePrefix) {
    this._valuePrefix = valuePrefix
  }
}
