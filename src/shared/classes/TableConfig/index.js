import BaseTable from 'shared/components/BaseTable'
import * as c from 'shared/constants'
import { getTableColumns, getKeyField, getDescriptionKey, getLinkProps } from 'shared/models/tables'
import { getDatasetDateField } from 'shared/utilities/filterUtils'
import { constantToModelName } from 'shared/utilities/filterUtils'
import moment from 'moment'

export default class TableConfig {
  constructor({
    component = BaseTable,
    resourceConstant = undefined,
    datasetModelName = undefined,
    annotationStart = moment(c.DISTRICT_RESULTS_DATE_ONE).format('MM/DD/YYYY'),
    annotationEnd = moment(moment.now()).format('MM/DD/YYYY'),
  } = {}) {
    this._component = component
    this._resourceConstant = resourceConstant
    this._datasetModelName = datasetModelName || constantToModelName(this.resourceConstant)
    ;(this._annotationStart = annotationStart), (this._annotationEnd = annotationEnd)
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

  get annotationStart() {
    return this._annotationStart
  }

  set annotationStart(annotationStart) {
    this._annotationStart = annotationStart
  }

  get annotationEnd() {
    return this._annotationEnd
  }

  set annotationEnd(annotationEnd) {
    this._annotationEnd = annotationEnd
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

  getColumns({ expandColumnFunction, constructFilter, rowExample, dispatch } = {}) {
    return getTableColumns({
      constant: this._resourceConstant,
      columnExpandFunction: expandColumnFunction,
      linkPropsFunction: getLinkProps(this._resourceConstant),
      constructFilter: constructFilter,
      dispatch: dispatch,
      rowExample,
      annotationStart: this._annotationStart,
      annotationEnd: this._annotationEnd,
    })
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
