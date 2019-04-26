export default class AnnotatedResultFilter {
  constructor({
    resourceModel = undefined,
    category = 'AMOUNT',
    fieldName = '',
    comparison = 'gte',
    value = 5,
    min = 1,
    annotationStart,
  } = {}) {
    this._resourceModel = resourceModel
    this._category = category
    this._fieldName = fieldName
    this._comparison = comparison
    this._value = value
    this._min = min
    this._annotationStart = annotationStart
  }

  get resourceModel() {
    return this._resourceModel
  }

  set resourceModel(resourceModel) {
    this._resourceModel = resourceModel
  }

  get category() {
    return this._category
  }

  set category(category) {
    this._category = category
  }

  get fieldName() {
    return this._fieldName
  }

  set fieldName(fieldName) {
    this._fieldName = fieldName
  }

  internalFilter(records) {
    return records.filter(record => {
      return this.evaluate(record)
    })
  }

  get comparison() {
    return this._comparison
  }

  set comparison(comparison) {
    this._comparison = comparison
  }

  get value() {
    return this._value
  }

  set value(value) {
    if (value < this._min) {
      this._value = this._min
    } else {
      this._value = value
    }
  }

  get annotationStart() {
    return this._annotationStart
  }

  set annotationStart(annotationStart) {
    this._annotationStart = annotationStart
  }

  evaluate(result) {
    const resultField = Object.keys(result).find(key =>
      key.match(`${this.fieldName}${this._annotationStart ? '_' + this._annotationStart : ''}`)
    )

    switch (this.comparison) {
      case 'gte':
        return result[resultField] >= this.value
      case 'gt':
        return result[resultField] > this.value
      case 'lte':
        return result[resultField] <= this.value
      case 'lt':
        return result[resultField] < this.value
      case 'bool':
        return Array.isArray(result[resultField])
          ? !!result[resultField].length === this.value
          : !!result[resultField] == this.value
      default:
        return result[resultField] == this.value
    }
  }
}
