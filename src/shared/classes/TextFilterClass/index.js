import TextFieldGroup from 'AdvancedSearch/Filter/TextFieldGroup'
const types = [
  {
    constant: 'MULTISELECT',
    options: values => {
      return values.map(value => ({ value: value, name: 'value', label: value }))
    },
    component: TextFieldGroup,
  },
]

export class TextFilterClass {
  constructor(typeConstant, label, newButtonLabel, optionsList) {
    this.setType = this.setType.bind(this)
    this._label = label
    this._newButtonLabel = newButtonLabel
    this.setType(typeConstant)
    this._optionsList = optionsList
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

  get optionsList() {
    return this._optionsList
  }

  get options() {
    return this._options
  }

  set options(value) {
    this._options = value
  }
}
