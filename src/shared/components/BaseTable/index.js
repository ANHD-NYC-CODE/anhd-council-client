import React from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import InnerLoader from 'shared/components/InnerLoader'
import { push } from 'connected-react-router'
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
    }

    this.setExpandedContent = this.setExpandedContent.bind(this)

    this.expandRowFunc = (e, row, rowIndex) => {
      // e.currentTarget.parentElement.querySelectorAll('tr').forEach((otherRow, index) => {
      //   if (index === rowIndex) return
      //   otherRow.classList.add('table-row--collapsed')
      //   otherRow.classList.remove('table-row--expanded')
      // })
      //
      // // Don't expand unless it has a descriptionKey
      // if (!row[props.tableConfig.descriptionKey]) return
      // e.target.closest('tr').classList.toggle('table-row--collapsed')
      // e.target.closest('tr').classList.toggle('table-row--expanded')
    }

    this.rowEvents = rowEventType => {
      switch (rowEventType) {
        case 'LINK': {
          return {
            onClick: (e, row, rowIndex) => {
              this.props.dispatch(push(`/property/${row.bbl}`))
            },
          }
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      displayedRecordsCount: nextProps.records.length,
    })
  }

  setExpandedContent(content, row, rowId) {
    this.setState({
      expandedRowContent: content,
      expanded: [row[rowId]],
    })
  }

  render() {
    const expandRow = {
      renderer: row => {
        return (
          <div className="table-row__expanded-box">
            <p>
              <span>>>&nbsp;</span>
              {this.state.expandedRowContent}
            </p>
          </div>
        )
      },
      expanded: this.state.expanded,
      showExpandColumn: false,
      onlyOneExpanding: true,
      onExpand: (row, isExpand, rowIndex, e) => {
        this.expandRowFunc(e, row, rowIndex)
      },
      onExpandAll: (isExpandAll, rows, e) => {
        console.log(isExpandAll)
        console.log(rows)
        console.log(e)
      },
    }
    return (
      <PaginationProvider pagination={paginationFactory(this.props.tableConfig.paginationOptions(this.state))}>
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
              keyField={this.props.tableConfig.keyField}
              rowClasses={this.props.tableConfig.tableRowClasses}
              expandRow={expandRow}
              rowEvents={this.rowEvents(this.props.tableConfig.rowEventType)}
              striped
              hover={this.props.tableConfig.hover}
              condensed
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
