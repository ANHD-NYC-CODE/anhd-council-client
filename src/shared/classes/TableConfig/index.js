import BaseTable from 'shared/components/BaseTable'
import { getTableColumns, getKeyField, getDescriptionKey } from 'shared/models/tables'
import { getDatasetDateField } from 'shared/utilities/filterUtils'
export class TableConfig {
  constructor({ component = BaseTable, resourceConstant = undefined, hover = false, rowEventType = undefined } = {}) {
    this._component = component
    this._resourceConstant = resourceConstant
    this._hover = hover
    this._rowEventType = rowEventType
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

  get hover() {
    return this._hover
  }

  set hover(hover) {
    this._hover = hover
  }

  get keyField() {
    return getKeyField(this._resourceConstant)
  }

  get descriptionKey() {
    return getDescriptionKey(this._resourceConstant)
  }

  getColumns({ expandColumnFunction } = {}) {
    return getTableColumns(this._resourceConstant, expandColumnFunction)
  }

  get rowEventType() {
    return this._rowEventType
  }

  set rowEventType(rowEventType) {
    this._rowEventType = rowEventType
  }

  paginationOptions(componentState) {
    return {
      custom: true,
      totalSize: componentState.displayedRecordsCount,
      sizePerPageList: [10, 50, 100],
      page: 1,
    }
  }

  get defaultSorted() {
    return [
      {
        dataField: getDatasetDateField(this._resourceConstant),
        order: 'desc',
      },
    ]
  }

  get tableRowClasses() {
    return 'table-row--collapsed'
  }
}
