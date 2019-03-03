import IntegerFilter from 'AdvancedSearch/Filter/IntegerFilter'
const types = [
  {
    constant: 'INTEGER',
    comparisonOptions: (param, key) => {
      return [
        { value: { key: key, value: `${param}__gte` }, label: 'At least' },
        { value: { key: key, value: `${param}__exact` }, label: 'Exactly' },
        { value: { key: key, value: `${param}__lte` }, label: 'At most' },
      ]
    },
    component: IntegerFilter,
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
  constructor(typeConstant, label, queryParam) {
    this.setType = this.setType.bind(this)
    this._label = label
    this._queryParam = queryParam
    this.setType(typeConstant)
  }

  setType(typeContant) {
    const type = types.find(t => t.constant === typeContant)

    if (type) {
      this.type = type
      this.comparisonOptions = type.comparisonOptions
      this.constant = type.constant
      this.component = type.component
    } else {
      throw `Pass either '${types.map(t => t.constant).join("' or '")}' as the first argument.`
    }
  }

  get label() {
    return this._label
  }

  get queryParam() {
    return this._queryParam
  }
}
