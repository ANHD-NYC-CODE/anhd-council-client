import IntegerFieldGroup from 'AdvancedSearch/Filter/IntegerFieldGroup'
const types = [
  {
    constant: 'INTEGER',
    options: () => {
      return [
        { name: 'comparison', value: 'gte', label: 'At least' },
        { name: 'comparison', value: 'exact', label: 'Exactly' },
        { name: 'comparison', value: 'lte', label: 'At most' },
      ]
    },
    component: IntegerFieldGroup,
  },
  {
    constant: 'DATE',
    options: [
      { value: 'range', label: 'From/To' },
      { value: 'startDate', label: 'Since' },
      { value: 'endDate', label: 'Before' },
    ],
  },
]

export class ComparisonFilter {
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
