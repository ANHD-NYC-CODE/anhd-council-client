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
          <DatasetInfo datasetModelName={props.datasetModelName} showUpdate={props.showUpdate} />
        </Col>
      </Row>
    </div>
  )
}

TableHeader.defaultProps = {
  showUpdate: true,
}

TableHeader.propTypes = {
  datasetModelName: PropTypes.string,
  showUpdate: PropTypes.bool,
  title: PropTypes.string,
}

export default TableHeader
