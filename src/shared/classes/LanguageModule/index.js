export class LanguageModule {
  constructor({ type = 'AMOUNT', noun = '', propertyAdjective = '' } = {}) {
    this._type = type
    this._noun = noun
    this._propertyAdjective = propertyAdjective
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

  get propertyAdjective() {
    return this._propertyAdjective
  }

  set propertyAdjective(propertyAdjective) {
    this._propertyAdjective = propertyAdjective
  }

  grammaticalNoun(noun, value) {
    if (value > 1) {
      return noun.endsWith('s') ? noun : `${noun}s`
    } else {
      return noun.endsWith('s') ? noun.substring(0, -1) : noun
    }
  }
}
