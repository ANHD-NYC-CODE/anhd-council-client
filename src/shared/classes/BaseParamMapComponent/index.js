import TextFieldGroup from 'AdvancedSearch/Filter/TextFieldGroup'
import IntegerFieldGroup from 'AdvancedSearch/Filter/IntegerFieldGroup'
import DateFieldGroup from 'AdvancedSearch/Filter/DateFieldGroup'
import IntegerDateFieldGroup from 'AdvancedSearch/Filter/IntegerDateFieldGroup'

import { comparisonOptions } from 'shared/utilities/filterUtils'

const types = [
  {
    constant: 'INTEGER',
    component: IntegerFieldGroup,
  },
  {
    constant: 'DATE',
    component: DateFieldGroup,
    dateType: 'date',
  },
  {
    constant: 'PERCENTDATE',
    component: IntegerDateFieldGroup,
    dateType: 'date',
  },
  {
    constant: 'MULTISELECT',
    component: TextFieldGroup,
  },
]

export class BaseParamMapComponent {
  constructor({ component = undefined, defaultOptions = [] } = {}) {
    this._component = component
    this._defaultOptions = defaultOptions
  }

  get component() {
    return this._component
  }

  set component(value) {
    this._component = value
  }

  options(values) {
    return values || this.defaultOptions || comparisonOptions(['gte', 'exact', 'lte'], [], 'INTEGER')
  }

  get defaultOptions() {
    return this._defaultOptions
  }

  set defaultOptions(value) {
    this._defaultOptions = value
  }
}
