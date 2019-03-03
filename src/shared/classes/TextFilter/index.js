import TextSelectFieldSet from 'AdvancedSearch/Filter/TextSelectFieldSet'
const types = [
  {
    constant: 'SELECT',
    options: values => {
      return values.map(value => ({ value: { name: 'value', value: value }, label: value }))
    },
    component: TextSelectFieldSet,
  },
]

export class TextFilter {
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
