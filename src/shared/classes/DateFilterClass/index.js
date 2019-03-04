import DateFieldGroup from 'AdvancedSearch/Filter/DateFieldGroup'
const types = [
  {
    constant: 'DATE',
    options: () => {
      return [
        { name: 'comparison', value: 'gte', label: 'Since' },
        { name: 'comparison', value: 'between', label: 'Between' },
        { name: 'comparison', value: 'lte', label: 'Before' },
      ]
    },
    component: DateFieldGroup,
    dateType: 'date',
  },
]

export class DateFilterClass {
  constructor(typeConstant, label, newButtonLabel) {
    this.setType = this.setType.bind(this)
    this._label = label
    this._newButtonLabel = newButtonLabel
    this.setType(typeConstant)
  }

  setType(typeContant) {
    const type = types.find(t => t.constant === typeContant)

    if (type) {
      this.type = type
      this.constant = type.constant
      this.component = type.component
      this.dateType = type.dateType
      this._options = type.options
    } else {
      throw `Pass either '${types.map(t => t.constant).join("' or '")}' as the first argument.`
    }
  }

  get type() {
    return this._type
  }

  set type(value) {
    this._type = value
  }

  get label() {
    return this._label
  }

  get newButtonLabel() {
    return this._newButtonLabel
  }

  get options() {
    return this._options
  }

  set options(value) {
    this._options = value
  }
}
