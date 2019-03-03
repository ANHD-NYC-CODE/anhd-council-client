import DateFilterSet from 'AdvancedSearch/Filter/DateFilterSet'
const types = [
  {
    constant: 'DATE',
    options: () => {
      return [
        { name: 'comparison', value: 'gte', label: 'At least' },
        { name: 'comparison', value: 'exact', label: 'Exactly' },
        { name: 'comparison', value: 'lte', label: 'At most' },
      ]
    },
    component: DateFilterSet,
  },
]

export class DateFilterClass {
  constructor(typeConstant, label, newButtonLabel, optionValues) {
    this.setType = this.setType.bind(this)
    this._label = label
    this._newButtonLabel = newButtonLabel
    this.setType(typeConstant)
    this._optionValues = optionValues
  }

  setType(typeContant) {
    const type = types.find(t => t.constant === typeContant)

    if (type) {
      this.type = type
      this.options = type.options
      this.constant = type.constant
      this.component = type.component
    } else {
      throw `Pass either '${types.map(t => t.constant).join("' or '")}' as the first argument.`
    }
  }

  get label() {
    return this._label
  }

  get newButtonLabel() {
    return this._newButtonLabel
  }

  get optionValues() {
    return this._optionValues
  }
}
