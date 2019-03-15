import React from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next'
import InnerLoader from 'shared/components/InnerLoader'
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import { Row, Col } from 'react-bootstrap'

const columns = [
  {
    dataField: 'bbl',
    text: 'BBL',
  },
  {
    dataField: 'address',
    text: 'Address',
  },
  {
    dataField: 'yearbuilt',
    text: 'Year Built',
  },
  {
    dataField: 'unitsres',
    text: 'Residential Units',
  },
  {
    dataField: 'unitsrentstabilized',
    text: 'Rent Stabilized Units',
  },
  {
    dataField: 'numbldgs',
    text: '# Buildings',
  },
  {
    dataField: 'numfloors',
    text: '# Floors',
  },
]

const BaseTable = props => {
  const options = {
    custom: true,
    totalSize: props.records.length,
    sizePerPageList: [10, 50, 100],
  }

  return (
    <PaginationProvider pagination={paginationFactory(options)}>
      {({ paginationProps, paginationTableProps }) => (
        <div>
          <Row>
            <Col>Total: {paginationProps.totalSize}</Col>
            <Col>
              <SizePerPageDropdownStandalone {...paginationProps} />
            </Col>
            <Col>
              <PaginationListStandalone {...paginationProps} />
            </Col>
          </Row>
          <BootstrapTable
            className="base-table"
            columns={columns}
            keyField="bbl"
            data={props.records}
            {...paginationTableProps}
          />
          {props.loading && <InnerLoader />}
          {props.error && <div className="text-danger">{props.error.message}</div>}
        </div>
      )}
    </PaginationProvider>
  )
}

BaseTable.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  records: PropTypes.array,
}

export default BaseTable
