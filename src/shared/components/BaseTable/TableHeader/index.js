import React from 'react'
import PropTypes from 'prop-types'
import DatasetInfo from 'shared/components/DatasetInfo'

import classnames from 'classnames'
import { Row, Col } from 'react-bootstrap'

const TableHeader = props => {
  return (
    <div className={classnames('table-header', props.className)}>
      <Row>
        <Col>
          {props.size === 'sm' ? (
            <h5 className={props.headerClass}>{props.title}</h5>
          ) : (
            <h4 className={props.headerClass}>{props.title}</h4>
          )}
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
  size: '',
}

TableHeader.propTypes = {
  datasetModelName: PropTypes.string,
  headerClass: PropTypes.string,
  showUpdate: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
}

export default TableHeader
