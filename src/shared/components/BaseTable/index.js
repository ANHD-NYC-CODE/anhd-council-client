import React from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
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

import classnames from 'classnames'
import './style.scss'

class BaseTable extends React.Component {
  constructor(props) {
    super(props)

    this.setExpandedContent = this.setExpandedContent.bind(this)
    this.setPage = this.setPage.bind(this)
    this.expandRow = this.expandRow.bind(this)
    this.constructFilter = this.constructFilter.bind(this)
    this.filters = {}
    this.state = {
      expandedRowContent: '',
      displayedRecordsCount: (props.records || {}).length,
      page: 1,
      defaultSorted: props.tableConfig.defaultSorted,
      expanded: [],
      columns: props.tableConfig.getColumns({
        expandColumnFunction: this.setExpandedContent,
        constructFilter: this.constructFilter,
        dispatch: props.dispatch,
      }),
    }
  }

  componentWillReceiveProps(nextProps) {
    Object.keys(this.filters).forEach(key => this.filters[key](''))

    this.setState({
      expandedRowContent: '',
      displayedRecordsCount: (nextProps.records || {}).length,
      page: 1,
      defaultSorted: nextProps.tableConfig.defaultSorted,
      expanded: [],
      columns: nextProps.tableConfig.getColumns({
        expandColumnFunction: this.setExpandedContent,
        constructFilter: this.constructFilter,
        dispatch: nextProps.dispatch,
      }),
    })
  }

  componentWillUnmount() {
    Object.keys(this.filters).forEach(key => this.filters[key](''))
    this.filters = {}
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
      renderer: row => {
        if (isNestedTable(this.state.expandedRowComponent)) {
          const NestedTable = this.state.expandedRowComponent

          return (
            <div className="table-row--nested-bumper" key={`expanded-row-${row.id}`}>
              <NestedTable nested={true} {...this.state.expandedRowProps} />
            </div>
          )
        } else {
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
    return (
      <PaginationProvider
        pagination={paginationFactory(this.props.tableConfig.paginationOptions(this.state, this.setPage))}
      >
        {({ paginationProps, paginationTableProps }) => (
          <div className={`base-table ${this.props.wrapperClasses}`} key={`table-${this.props.tableConfig.keyField}`}>
            {!this.props.nested && !!this.props.includeHeader && (
              <Row>
                <Col xs={12}>
                  <TableHeader
                    datasetModelName={this.props.datasetModelName}
                    dispatch={this.props.dispatch}
                    request={this.props.request}
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
                  <CsvButton dispatch={this.props.dispatch} request={this.props.request} />
                </Col>
                <Col xs={4} className="d-flex align-items-center justify-content-end">
                  <SizePerPageDropdownStandalone btnContextual="btn-outline-primary" {...paginationProps} />
                </Col>
              </Row>
            )}

            <BootstrapTable
              bootstrap4
              columns={this.state.columns}
              condensed
              classes={classnames(this.props.classes, { 'no-expand': !this.props.expandable })}
              data={this.props.records}
              {...paginationTableProps}
              defaultSorted={this.state.defaultSorted}
              expandRow={this.props.expandable ? this.expandRow() : undefined}
              filter={filterFactory()}
              height="200px"
              scrollTop="top"
              keyField={`${this.props.tableConfig.keyField}`}
              noDataIndication={() => (
                <TableAlert
                  textType="text-dark"
                  variant="warning"
                  message={'No records found'}
                  buttonText="Clear Filters"
                  buttonVariant="outline-secondary"
                  action={
                    this.props.records.length
                      ? () => Object.keys(this.filters).forEach(key => this.filters[key](''))
                      : null
                  }
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
            {!this.props.nested && !!this.includeHeader && (
              <Row>
                <Col xs={6}>
                  <PaginationListStandalone {...paginationProps} />
                </Col>
              </Row>
            )}
          </div>
        )}
      </PaginationProvider>
    )
  }
}

BaseTable.defaultProps = {
  expandable: true,
  includeHeader: true,
  nested: false,
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
}

export default BaseTable
