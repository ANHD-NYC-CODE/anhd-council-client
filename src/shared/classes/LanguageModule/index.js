export class LanguageModule {
  constructor({ type = 'AMOUNT', noun = '' } = {}) {
    this._type = type
    this._noun = noun
  }

  get noun() {
    return this._noun
  }

  set noun(noun) {
    this._noun = noun
  }

  get type() {
    return this._type
  }

  set type(type) {
    this._type = type
  }

  getNoun(value) {
    return value > 1 && this._noun.endsWith('s') ? `${this._noun}` : `${this._noun}s`
  }
}
