import React from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import InnerLoader from 'shared/components/InnerLoader'
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import filterFactory from 'react-bootstrap-table2-filter'

import { Row, Col } from 'react-bootstrap'
import TableError from 'shared/components/BaseTable/TableError'
import './style.scss'

class BaseTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedRowContent: '',
      displayedRecordsCount: props.records.length,
      page: 1,
      expanded: [],
    }

    this.setExpandedContent = this.setExpandedContent.bind(this)
    this.setPage = this.setPage.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      displayedRecordsCount: nextProps.records.length,
    })
  }

  setPage(page) {
    this.setState({
      page: page,
    })
  }

  setExpandedContent({ component, expandedRowProps, row, rowId, e }) {
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

  render() {
    const expandRow = {
      renderer: row => {
        return this.state.expandedRowComponent(this.state.expandedRowProps)
      },

      expanded: this.state.expanded,
      showExpandColumn: false,
      onlyOneExpanding: true,
    }
    return (
      <PaginationProvider
        pagination={paginationFactory(this.props.tableConfig.paginationOptions(this.state, this.setPage))}
      >
        {({ paginationProps, paginationTableProps }) => (
          <div className="base-table">
            <Row>
              <Col>
                <h6 className="base-table__header">{this.props.caption}</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <PaginationListStandalone {...paginationProps} />
              </Col>
              <Col>
                <SizePerPageDropdownStandalone {...paginationProps} />
              </Col>
              <Col>
                Total:
                {paginationProps.dataSize === paginationProps.totalSize
                  ? paginationProps.totalSize
                  : `${paginationProps.dataSize}/${paginationProps.totalSize}`}
              </Col>
            </Row>
            <BootstrapTable
              bootstrap4
              columns={this.props.tableConfig.getColumns({ expandColumnFunction: this.setExpandedContent })}
              data={this.props.records}
              {...paginationTableProps}
              defaultSorted={this.props.tableConfig.defaultSorted}
              filter={filterFactory()}
              keyField={`${this.props.tableConfig.keyField}`}
              rowClasses={this.props.tableConfig.tableRowClasses}
              expandRow={expandRow}
              rowEvents={this.rowEvents}
              hover={this.props.tableConfig.hover}
              condensed
              bordered={false}
              tabIndexCell
            />
            {this.props.loading && <InnerLoader />}
            {this.props.error && <TableError error={this.props.error} errorAction={this.props.errorAction} />}
          </div>
        )}
      </PaginationProvider>
    )
  }
}

BaseTable.propTypes = {
  caption: PropTypes.string,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.object,
  records: PropTypes.array,
  tableConfig: PropTypes.object,
}

export default BaseTable
