import BaseTable from 'shared/components/BaseTable'
import { getTableColumns, getKeyField } from 'shared/models/tables'
export class TableConfig {
  constructor({ component = BaseTable, resourceConstant = undefined } = {}) {
    this._component = component
    this._resourceConstant = resourceConstant
  }

  get component() {
    return this._component
  }

  set component(component) {
    this._component = component
  }

  get resourceConstant() {
    return this._resourceConstant
  }

  set resourceConstant(resourceConstant) {
    this._resourceConstant = resourceConstant
  }

  get keyField() {
    return getKeyField(this._resourceConstant)
  }

  get columns() {
    return getTableColumns(this._resourceConstant)
  }
}
