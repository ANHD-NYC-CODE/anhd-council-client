import React from 'react'
import PropTypes from 'prop-types'
import DatasetInfo from 'shared/components/DatasetInfo'

import { Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import { makeCsvRequest } from 'Store/Request/actions'
const TableHeader = props => {
  return (
    <div className="table-header">
      <Row>
        <Col>
          <h4>{props.title}</h4>
        </Col>
        {window.innerWidth > 767 && (
          <Col class="table-header__share-column">
            <Button onClick={() => props.dispatch(makeCsvRequest(props.request))}>
              <FontAwesomeIcon icon={faFileCsv} />
              <span> Csv Download</span>
            </Button>
          </Col>
        )}
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
