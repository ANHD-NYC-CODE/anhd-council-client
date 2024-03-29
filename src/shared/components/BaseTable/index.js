import React from 'react'
import PropTypes from 'prop-types'

import BootstrapTable from 'react-bootstrap-table-next'
import BaseTableConfig from 'shared/classes/BaseTableConfig'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator'
import filterFactory from 'react-bootstrap-table2-filter'
import BaseTableHeader from 'shared/components/BaseTable/BaseTableHeader'
import { Button } from 'react-bootstrap'
import TableAlert from 'shared/components/BaseTable/TableAlert'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'

import classnames from 'classnames'
import { fireCsvDownloadEvent } from 'Store/Analytics/actions'
import './style.scss'

class BaseTable extends React.Component {
  constructor(props) {
    super(props)
    this.setExpandedContent = this.setExpandedContent.bind(this)
    this.setPage = this.setPage.bind(this)
    this.setSizePerPage = this.setSizePerPage.bind(this)
    this.expandRow = this.expandRow.bind(this)
    this.constructFilter = this.constructFilter.bind(this)
    this.handleCsvClick = this.handleCsvClick.bind(this)
    this.constructCsvFilename = this.constructCsvFilename.bind(this)
    this.baseTableConfig = new BaseTableConfig({ component: this })
    this.pageButtonRenderer = this.pageButtonRenderer.bind(this)
    this.state = {
      key: props.key,
      expandedRowContent: '',
      displayedRecordsCount: (props.records || {}).length,
      page: props.globalTableState.page || 1,
      sizePerPage: props.globalTableState.sizePerPage || 10,
      defaultSorted: props.tableConfig.defaultSorted,
      expanded: [],
      columns: props.tableConfig.getColumns({
        page: props.page,
        expandColumnFunction: this.setExpandedContent,
        constructFilter: this.constructFilter,
        baseTableConfig: this.baseTableConfig,
        rowExample: props.records[0],
        dispatch: props.dispatch,
        annotationStart: props.annotationStart,
        advancedSearchDatasets: props.advancedSearchDatasets,
      }),
    }
  }

  componentDidUpdate(props, state) {
    if (props.records.length !== state.displayedRecordsCount) {
      this.setState({
        key: props.key,
        page: props.globalTableState.page || state.page,
        sizePerPage: props.globalTableState.sizePerPage || 10,
        displayedRecordsCount: props.records.length,
        defaultSorted: props.tableConfig.defaultSorted,
        columns: props.tableConfig.getColumns({
          page: props.page,
          expandColumnFunction: this.setExpandedContent,
          constructFilter: this.constructFilter,
          baseTableConfig: this.baseTableConfig,
          rowExample: props.records[0],
          dispatch: props.dispatch,
          annotationStart: props.annotationStart,
          advancedSearchDatasets: props.advancedSearchDatasets,
        }),
      })
    }
  }

  handleCsvClick() {
    this.props.dispatch(fireCsvDownloadEvent(this.constructCsvFilename(this.baseTableConfig.selectedFilters)))
  }

  constructCsvFilename(selectedFilters) {
    const filters = Object.keys(selectedFilters)
      .map(key => {
        if (selectedFilters[key]) {
          return key.split('__')[1].trim()
        }
      })
      .filter(f => f)
      .join('_')

    return `${this.props.csvBaseFileName}${filters ? '__' + filters : ''}.csv`.replace(' ', '_').toLowerCase()
  }

  setPage(page, sizePerPage) {
    if (this.props.setTableState) {
      this.props.setTableState({
        ...this.props.globalStableState,
        sizePerPage,
        page,
      })
    }

    this.setState({
      page,
      sizePerPage,
    })
  }

  setSizePerPage(page, sizePerPage) {
    if (this.props.setTableState) {
      const tableState = { ...this.props.globalTableState, sizePerPage }
      this.props.setTableState({
        ...tableState,
        page,
      })
    }

    this.setState({
      sizePerPage,
    })
  }

  setExpandedContent({ component, expandedRowProps, rowId, e }) {
    let expandedSet
    if (
      this.state.expanded.some(ex => ex === rowId) &&
      expandedRowProps.content === (this.state.expandedRowProps || {}).content
    ) {
      // Toggle off if clicked column twice
      expandedSet = []
      expandedRowProps = undefined
      // Remove active column class
      if (e.type === 'mouseenter') return // But not for mouseenter, only click
      e.currentTarget
        .closest('tbody')
        .querySelectorAll('td')
        .forEach(col => col.classList.remove('table-column--active'))
    } else {
      expandedSet = [rowId]
      // Add active column class
      e.currentTarget
        .closest('tbody')
        .querySelectorAll('td')
        .forEach(col => col.classList.remove('table-column--active'))
      e.currentTarget.classList.add('table-column--active')
    }

    this.setState({
      expandedRowProps,
      expandedRowComponent: component,
      expanded: expandedSet,
    })
  }

  expandRow() {
    const isNestedTable = component => {
      if (!component) return false
      return (
        component.name === 'NestedTable' ||
        (typeof component === 'function' && component.prototype && component.prototype.isReactComponent)
      )
    }
    return {
      onExpand: (row, isExpand, rowIndex, e) => {
        if (!e.currentTarget.classList.contains('expandable-cell')) return
      },
      renderer: row => {
        if (isNestedTable(this.state.expandedRowComponent)) {
          const NestedTable = this.state.expandedRowComponent

          return (
            <div className="table-row--nested-bumper" key={`expanded-row-${row.id}`}>
              <NestedTable nested={true} {...this.state.expandedRowProps} />
            </div>
          )
        } else if (this.state.expandedRowProps) {
          return this.state.expandedRowComponent(this.state.expandedRowProps)
        } else {
          return null
        }
      },

      expanded: this.state.expanded,
      showExpandColumn: false,
      onlyOneExpanding: true,
    }
  }

  constructFilter(filterType) {
    return filterType({
      placeholder: 'Search...',
      getFilter: filter => {
        const filterKey = (Math.random() * 100000).toString()
        this.filters = { ...this.filters, [filterKey]: filter }
      },
    })
  }

  pageButtonRenderer({ page, active, onPageChange }) {
    const handleClick = e => {
      e.preventDefault()
      onPageChange(page)
    }

    return (
      <li key={page} className="page-item">
        <Button variant={active ? 'dark' : 'light'} onClick={handleClick}>
          {page}
        </Button>
      </li>
    )
  }
  render() {
    const columns = this.props.tableConfig.getColumns({
      page: this.props.page,
      expandColumnFunction: this.setExpandedContent,
      constructFilter: this.constructFilter,
      baseTableConfig: this.baseTableConfig,
      rowExample: this.props.records[0],
      dispatch: this.props.dispatch,
      annotationStart: this.props.annotationStart,
      advancedSearchDatasets: this.props.advancedSearchDatasets,
    })
    const HeaderComponent = this.props.headerComponent
    return (
      <PaginationProvider
        key={this.props.advancedSearchDatasets}
        pagination={paginationFactory({
          custom: true,
          totalSize: this.props.records.length,
          sizePerPage: this.state.sizePerPage,
          sizePerPageList: [10, 50, 100],
          page: this.state.page,
          tableData: this.node ? this.node.table.props.data : [],
          onPageChange: (page, sizePerPage) => {
            this.setPage(page, sizePerPage)
          },
          onSizePerPageChange: (sizePerPage, page) => {
            this.setSizePerPage(page, sizePerPage)
          },
        })}
      >
        {({ paginationProps, paginationTableProps }) => {
          return (
            <ToolkitProvider
              keyField={`${this.props.tableConfig.keyField}`}
              data={this.props.records}
              columns={columns}
              exportCSV={{
                fileName: this.constructCsvFilename(this.baseTableConfig.selectedFilters),
                exportAll: false,
                onlyExportFiltered: true
              }}
              bootstrap4={true}
            >
              {toolKitProps => {
                return (
                  <div
                    className={`base-table ${this.props.wrapperClasses}`}
                    data-test-id="base-table"
                    key={`table-${this.props.tableConfig.keyField}`}
                  >
                    {!this.props.nested && !!this.props.includeHeader && <div>{HeaderComponent}</div>}
                    <div className="base-table__header-body-wrapper">
                      <div className="base-table__header-body-inner-wrapper">
                        <BaseTableHeader
                          headerClass={this.props.headerClass}
                          records={this.props.records}
                          recordsSize={this.props.recordsSize}
                          csvProps={toolKitProps.csvProps}
                          paginationProps={paginationProps}
                          handleCsvClick={this.handleCsvClick}
                          resourceConstant={this.props.tableConfig.resourceConstant}
                          request={this.props.request}
                          filterButtonSets={
                            this.baseTableConfig.filterButtonSets[this.props.tableConfig.resourceConstant]
                          }
                          selectedFilters={this.baseTableConfig.selectedFilters}
                        />
                        <BootstrapTable
                          key={this.props.records}
                          ref={n => (this.node = n)}
                          {...toolKitProps.baseProps}
                          {...paginationTableProps}
                          condensed
                          classes={classnames(this.props.classes, { 'no-expand': !this.props.expandable })}
                          defaultSorted={this.state.defaultSorted}
                          expandRow={this.props.expandable ? this.expandRow() : undefined}
                          filter={filterFactory()}
                          height="200px"
                          scrollTop="top"
                          noDataIndication={() =>
                            !this.props.loading && (
                              <TableAlert
                                textType="text-dark"
                                variant="light"
                                message={'No records found'}
                                buttonText="Clear Filters"
                                buttonVariant="outline-dark"
                              />
                            )
                          }
                          rowClasses={this.props.tableConfig.tableRowClasses}
                          tabIndexCell
                        />
                      </div>
                    </div>

                    {this.props.loading && <InnerLoader />}
                    {this.props.error && (
                      <TableAlert
                        variant="danger"
                        textType="text-danger"
                        message={this.props.error.message}
                        action={this.props.errorAction}
                      />
                    )}
                    {!this.props.nested &&
                      !!this.props.includeHeader &&
                      paginationProps.sizePerPage < this.props.records.length && (
                        <div>
                          <PaginationListStandalone
                            {...{ ...paginationProps, pageButtonRenderer: this.pageButtonRenderer }}
                          />
                        </div>
                      )}
                  </div>
                )
              }}
            </ToolkitProvider>
          )
        }}
      </PaginationProvider>
    )
  }
}

BaseTable.defaultProps = {
  globalTableState: {},
  expandable: true,
  includeHeader: true,
  nested: false,
  recordsSize: 0,
  request: undefined,
}

BaseTable.propTypes = {
  annotationStart: PropTypes.string,
  classes: PropTypes.string,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  expandable: PropTypes.bool,
  globalTableState: PropTypes.object,
  headerComponent: PropTypes.object,
  loading: PropTypes.bool,
  nested: PropTypes.bool,
  records: PropTypes.array,
  recordsSize: PropTypes.number,
  tableConfig: PropTypes.object,
  advancedSearchDatasets: PropTypes.array,
  page: PropTypes.string,
}

export default BaseTable
