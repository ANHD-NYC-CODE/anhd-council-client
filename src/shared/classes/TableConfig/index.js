import BaseTable from 'shared/components/BaseTable'
import { getTableColumns, getKeyField, getDescriptionKey, getLinkProps } from 'shared/models/tables'
import { getDatasetDateField } from 'shared/utilities/filterUtils'
import { constantToModelName } from 'shared/utilities/filterUtils'
export default class TableConfig {
  constructor({ component = BaseTable, resourceConstant = undefined, datasetModelName = undefined } = {}) {
    this._component = component
    this._resourceConstant = resourceConstant
    this._datasetModelName = datasetModelName || constantToModelName(this.resourceConstant)
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

  get datasetModelName() {
    return this._datasetModelName
  }

  set datasetModelName(datasetModelName) {
    this._datasetModelName = datasetModelName
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

  getColumns({ expandColumnFunction, constructFilter, dispatch } = {}) {
    return getTableColumns(
      this._resourceConstant,
      expandColumnFunction,
      getLinkProps(this._resourceConstant),
      constructFilter,
      dispatch
    )
  }

  paginationOptions(componentState, setPage) {
    return {
      custom: true,
      totalSize: componentState.displayedRecordsCount,
      sizePerPageList: [10, 50, 100],
      page: componentState.page,
      onPageChange: (page, sizePerPage) => {
        setPage(page)
      },
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
