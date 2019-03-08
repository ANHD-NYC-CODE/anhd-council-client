export class LanguageModule {
  constructor({ type = 'AMOUNT', noun = undefined, propertyAdjective = '', valuePrefix = '', valueSuffix = '' } = {}) {
    this._type = type
    this._noun = noun
    this._propertyAdjective = propertyAdjective
    this._valuePrefix = valuePrefix
    this._valueSuffix = valueSuffix
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

  grammaticalNoun(noun, value) {
    if (noun) {
      if (value > 1) {
        return ` ${noun.endsWith('s') ? noun : noun + 's'}`
      } else {
        return ` ${noun.endsWith('s') ? noun.substring(0, -1) : noun}`
      }
    } else {
      return ''
    }
  }
}
