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
import { Row, Col } from 'react-bootstrap'
import TableError from 'shared/components/BaseTable/TableError'
import './style.scss'

const BaseTable = props => {
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      props.dispatch(push(`/property/${row.bbl}`))
    },
  }

  const options = {
    custom: true,
    totalSize: props.records.length,
    sizePerPageList: [10, 50, 100],
    page: 1,
  }

  return (
    <PaginationProvider pagination={paginationFactory(options)}>
      {({ paginationProps, paginationTableProps }) => (
        <div className="base-table">
          <Row>
            <Col>
              <h6 className="base-table__header">{props.caption}</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={2}>
              <SizePerPageDropdownStandalone {...paginationProps} />
            </Col>
            <Col xs={6} sm={2}>
              Total: {paginationProps.totalSize}
            </Col>
            <Col xs={12} sm={{ span: 4, offset: 4 }}>
              <PaginationListStandalone {...paginationProps} />
            </Col>
          </Row>
          <BootstrapTable
            columns={props.tableConfig.columns}
            keyField={props.tableConfig.keyField}
            data={props.records}
            {...paginationTableProps}
            striped
            hover
            condensed
            bordered={false}
            rowEvents={rowEvents}
          />
          {props.loading && <InnerLoader />}
          {props.error && <TableError error={props.error} errorAction={props.errorAction} />}
        </div>
      )}
    </PaginationProvider>
  )
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
