import React from 'react'
import PropTypes from 'prop-types'
import DatasetInfo from 'shared/components/DatasetInfo'

import { Row, Col } from 'react-bootstrap'

const TableHeader = props => {
  return (
    <div className="table-header">
      <Row>
        <Col>
          <h4>{props.title}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <DatasetInfo datasetModelName={props.datasetModelName} />
        </Col>
      </Row>
    </div>
  )
}

TableHeader.propTypes = {
  datasetModelName: PropTypes.string,
  title: PropTypes.string,
}

export default TableHeader
