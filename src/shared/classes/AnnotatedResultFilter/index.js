import moment from 'moment'
export default class AnnotatedResultFilter {
  constructor({
    resourceModel = undefined,
    category = 'AMOUNT',
    fieldName = '',
    annotationStart = '',
    annotationEnd = moment(moment.now).format('MM/DD-YYYY'),
    comparison = 'gte',
    value = 5,
    min = 1,
  } = {}) {
    this._resourceModel = resourceModel
    this._category = category
    this._fieldName = fieldName
    this._annotationStart = annotationStart
    this._annotationEnd = annotationEnd
    this._comparison = comparison
    this._value = value
    this._min = min
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

  get annotationStart() {
    return this._annotationStart
  }

  set annotationStart(annotationStart) {
    this._annotationStart = annotationStart
  }

  get annotationEnd() {
    return this._annotationEnd
  }

  set annotationEnd(annotationEnd) {
    this._annotationEnd = annotationEnd
  }

  internalFilter(records) {
    return records.filter(record => {
      return this.evaluate(record)
    })
  }

  get field() {
    return `${this._fieldName}__${this._annotationStart}-${this._annotationEnd}`
  }

  set field(field) {
    this._field = field
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

  evaluate(result) {
    const resultField = Object.keys(result).find(key => key.match(this.fieldName))

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
