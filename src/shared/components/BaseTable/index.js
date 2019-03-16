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
      displayedRecordsCount: props.records.length,
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
        case 'EXPAND': {
          return {
            onClick: (e, row, rowIndex) => {
              // Close other rows
              e.currentTarget.parentElement.querySelectorAll('tr').forEach((otherRow, index) => {
                if (index === rowIndex) return
                otherRow.classList.add('table-row--collapsed')
                otherRow.classList.remove('table-row--expanded')
              })
              e.currentTarget.classList.toggle('table-row--collapsed')
              e.currentTarget.classList.toggle('table-row--expanded')
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

  render() {
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
              <Col xs={6} sm={2}>
                <SizePerPageDropdownStandalone {...paginationProps} />
              </Col>
              <Col xs={6} sm={2}>
                Total:
                {paginationProps.dataSize === paginationProps.totalSize
                  ? paginationProps.totalSize
                  : `${paginationProps.dataSize}/${paginationProps.totalSize}`}
              </Col>
              <Col xs={12} sm={{ span: 4, offset: 4 }}>
                <PaginationListStandalone {...paginationProps} />
              </Col>
            </Row>
            <BootstrapTable
              bootstrap4
              columns={this.props.tableConfig.columns}
              data={this.props.records}
              {...paginationTableProps}
              defaultSorted={this.props.tableConfig.defaultSorted}
              filter={filterFactory()}
              keyField={this.props.tableConfig.keyField}
              rowClasses={this.props.tableConfig.tableRowClasses}
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
