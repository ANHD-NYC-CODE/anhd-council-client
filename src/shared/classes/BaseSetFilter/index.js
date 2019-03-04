import TextFieldGroup from 'AdvancedSearch/Filter/TextFieldGroup'
import IntegerFieldGroup from 'AdvancedSearch/Filter/IntegerFieldGroup'
import DateFieldGroup from 'AdvancedSearch/Filter/DateFieldGroup'
import IntegerDateFieldGroup from 'AdvancedSearch/Filter/IntegerDateFieldGroup'

import { comparisonOptions } from 'shared/utilities/filterUtils'

const types = [
  {
    constant: 'INTEGER',
    options: values => {
      return values || comparisonOptions(['gte', 'exact', 'lte'], [], 'INTEGER')
    },
    component: IntegerFieldGroup,
  },
  {
    constant: 'DATE',
    options: values => {
      return values || comparisonOptions(['gte', 'exact', 'lte'], [], 'DATE')
    },
    component: DateFieldGroup,
    dateType: 'date',
  },
  {
    constant: 'PERCENTDATE',
    options: values => {
      return values || comparisonOptions(['gte', 'exact', 'lte'], [], 'DATE')
    },
    component: IntegerDateFieldGroup,
    dateType: 'date',
  },
  {
    constant: 'MULTISELECT',
    options: values => {
      return values
    },
    component: TextFieldGroup,
  },
]

export class BaseSetFilter {
  constructor({ type = undefined, label = '', newButtonLabel = '', defaultOptions = [] } = {}) {
    this.setType = this.setType.bind(this)
    this._label = label
    this._newButtonLabel = newButtonLabel
    this._defaultOptions = defaultOptions
    this.setType(type)
  }

  setType(typeContant) {
    const type = types.find(t => t.constant === typeContant)
    if (!type) throw `Pass either '${types.map(t => t.constant).join("' or '")}' as the first argument.`

    this._type = type
    this._constant = type.constant
    this._component = type.component
    this._options = type.options(this._defaultOptions)
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

  get component() {
    return this._component
  }

  set component(value) {
    this._component = value
  }

  get optionsList() {
    return this._optionsList
  }

  get defaultOptions() {
    return this._defaultOptions
  }

  set defaultOptions(value) {
    this._defaultOptions = value
  }

  get options() {
    return this._options
  }

  set options(value) {
    this._options = value
  }
}
