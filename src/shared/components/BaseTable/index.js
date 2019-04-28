import React from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import { textFilter } from 'react-bootstrap-table2-filter'

import InnerLoader from 'shared/components/Loaders/InnerLoader'
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import filterFactory from 'react-bootstrap-table2-filter'
import TableHeader from 'shared/components/BaseTable/TableHeader'
import { Row, Col } from 'react-bootstrap'
import TableAlert from 'shared/components/BaseTable/TableAlert'
import CsvButton from 'shared/components/buttons/CsvButton'
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit'

import classnames from 'classnames'
import { fireCsvDownloadEvent } from 'Store/Analytics/actions'
import './style.scss'

class BaseTable extends React.Component {
  constructor(props) {
    super(props)

    this.setExpandedContent = this.setExpandedContent.bind(this)
    this.setPage = this.setPage.bind(this)
    this.expandRow = this.expandRow.bind(this)
    this.constructFilter = this.constructFilter.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.handleCsvClick = this.handleCsvClick.bind(this)
    this.constructCsvFilename = this.constructCsvFilename.bind(this)

    this.filters = {
      HPD_VIOLATION_OPEN: undefined,
    }
    this.filter_prototypes = {
      HPD_VIOLATION_OPEN: textFilter({
        getFilter: filter => {
          this.filters['HPD_VIOLATION_OPEN'] = filter
        },
      }),
    }
    this.filterFunctions = {
      HPD_VIOLATION_OPEN: (e, value = 'open') => {
        this.filters['HPD_VIOLATION_OPEN'](value)
        this.selectedFilters['HPD_VIOLATION_OPEN'] = true
      },
    }

    this.selectedFilters = {
      HPD_VIOLATION_OPEN: false,
    }

    this.filter_button_sets = {
      HPD_VIOLATION: [
        selectedFilters => {
          return (
            <div key="hpdviolation-open" className="table-filter-button-group">
              <button
                className={`${classnames('table-filter-button', 'btn', {
                  'btn-primary': !!this.selectedFilters['HPD_VIOLATION_OPEN'],
                })}`}
                onClick={this.filterFunctions['HPD_VIOLATION_OPEN']}
              >
                Open
              </button>
              <button
                className={`${classnames('table-filter-button', 'btn', {
                  'btn-primary': !this.selectedFilters['HPD_VIOLATION_OPEN'],
                })}`}
                onClick={() => this.clearFilter('HPD_VIOLATION_OPEN')}
              >
                All
              </button>
            </div>
          )
        },
      ],
    }

    this.state = {
      expandedRowContent: '',
      displayedRecordsCount: (props.records || {}).length,
      page: 1,
      defaultSorted: props.tableConfig.defaultSorted,
      expanded: [],
      columns: props.tableConfig.getColumns({
        expandColumnFunction: this.setExpandedContent,
        constructFilter: this.constructFilter,
        filter_prototypes: this.filter_prototypes,
        rowExample: props.records[0],
        dispatch: props.dispatch,
        annotationStart: props.annotationStart,
      }),
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     expandedRowContent: '',
  //     displayedRecordsCount: (nextProps.records || {}).length,
  //     page: 1,
  //     defaultSorted: nextProps.tableConfig.defaultSorted,
  //     expanded: [],
  //     columns: nextProps.tableConfig.getColumns({
  //       expandColumnFunction: this.setExpandedContent,
  //       constructFilter: this.constructFilter,
  //       filter_prototypes: this.filter_prototypes,
  //       rowExample: nextProps.records[0],
  //       dispatch: nextProps.dispatch,
  //       annotationStart: nextProps.annotationStart,
  //     }),
  //   })
  // }

  componentWillUnmount() {
    // this.clearFilters()
  }

  handleCsvClick() {
    this.props.dispatch(fireCsvDownloadEvent(this.constructCsvFilename()))
  }

  constructCsvFilename() {
    return `${this.props.csvBaseFileName}.csv`.replace(' ', '_').toLowerCase()
  }

  setPage(page) {
    this.setState({
      page: page,
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

  clearFilter(filterConstant) {
    if (this.filterFunctions[filterConstant]) {
      this.filterFunctions[filterConstant](undefined, '')
      this.selectedFilters[filterConstant] = false
    }
  }

  clearFilters() {
    Object.keys(this.filters).forEach(key => {
      if (this.filters[key]) {
        this.filters[key]('')
      }
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
        }
      },

      expanded: this.state.expanded,
      showExpandColumn: false,
      onlyOneExpanding: true,
    }
  }

  constructFilter(filterType) {
    return filterType({
      getFilter: filter => {
        const filterKey = (Math.random() * 100000).toString()
        this.filters = { ...this.filters, [filterKey]: filter }
      },
    })
  }

  render() {
    console.log('hiii', this.props.records.length)
    const { ExportCSVButton } = CSVExport
    return (
      <ToolkitProvider
        keyField={`${this.props.tableConfig.keyField}`}
        data={this.props.records}
        columns={this.state.columns}
        exportCSV={{
          fileName: this.constructCsvFilename(),
        }}
        bootstrap4={true}
      >
        {props => (
          <PaginationProvider
            pagination={paginationFactory(
              this.props.tableConfig.paginationOptions(this.props.records.length, this.state.page, this.setPage)
            )}
          >
            {({ paginationProps, paginationTableProps }) => (
              <div
                className={`base-table ${this.props.wrapperClasses}`}
                key={`table-${this.props.tableConfig.keyField}`}
              >
                {!this.props.nested && !!this.props.includeHeader && (
                  <Row>
                    <Col xs={12}>
                      <TableHeader
                        datasetModelName={this.props.datasetModelName}
                        dispatch={this.props.dispatch}
                        title={this.props.caption}
                      />
                    </Col>

                    <Col xs={4} className="text-right d-flex justify-content-start align-items-center">
                      Total:
                      {paginationProps.dataSize === paginationProps.totalSize
                        ? paginationProps.totalSize
                        : `${paginationProps.dataSize}/${paginationProps.totalSize}`}
                    </Col>
                    <Col
                      xs={4}
                      className="table-header__share-column d-none d-md-flex justify-content-end align-items-center"
                    >
                      <CsvButton
                        onClick={this.handleCsvClick}
                        ExportCSVButton={ExportCSVButton}
                        csvProps={props.csvProps}
                      />
                    </Col>
                    <Col xs={4} className="d-flex align-items-center justify-content-end">
                      <SizePerPageDropdownStandalone btnContextual="btn-outline-primary" {...paginationProps} />
                    </Col>
                  </Row>
                )}

                <Row>
                  {this.filter_button_sets[this.props.tableConfig.resourceConstant] &&
                    this.filter_button_sets[this.props.tableConfig.resourceConstant].map((set, index) => {
                      return <Col key={`button-set${index}`}>{set(this.selectedFilters)}</Col>
                    })}
                </Row>

                <BootstrapTable
                  // bootstrap4={props.baseProps.bootstrap4}
                  {...props.baseProps}
                  // columns={props.baseProps.columns}
                  condensed
                  classes={classnames(this.props.classes, { 'no-expand': !this.props.expandable })}
                  // data={this.props.baseProps.data}
                  {...paginationTableProps}
                  defaultSorted={this.state.defaultSorted}
                  expandRow={this.props.expandable ? this.expandRow() : undefined}
                  filter={filterFactory()}
                  height="200px"
                  scrollTop="top"
                  // keyField={props.baseProps.keyField}
                  noDataIndication={() => (
                    <TableAlert
                      textType="text-dark"
                      variant="warning"
                      message={'No records found'}
                      buttonText="Clear Filters"
                      buttonVariant="outline-secondary"
                      action={this.clearFilters}
                    />
                  )}
                  rowClasses={this.props.tableConfig.tableRowClasses}
                  tabIndexCell
                />
                {this.props.loading && <InnerLoader />}
                {this.props.error && (
                  <TableAlert
                    variant="danger"
                    textType="text-danger"
                    message={this.props.error.message}
                    action={this.props.errorAction}
                  />
                )}
                {!this.props.nested && !!this.props.includeHeader && (
                  <Row>
                    <Col xs={6}>
                      <PaginationListStandalone {...paginationProps} />
                    </Col>
                  </Row>
                )}
              </div>
            )}
          </PaginationProvider>
        )}
      </ToolkitProvider>
    )
  }
}

BaseTable.defaultProps = {
  expandable: true,
  includeHeader: true,
  nested: false,
  request: undefined,
}

BaseTable.propTypes = {
  expandable: PropTypes.bool,
  caption: PropTypes.string,
  classes: PropTypes.string,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.object,
  records: PropTypes.array,
  tableConfig: PropTypes.object,
  nested: PropTypes.bool,
  annotationStart: PropTypes.string,
}

export default BaseTable
