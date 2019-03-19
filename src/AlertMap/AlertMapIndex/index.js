import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import GeographySelect from 'shared/components/GeographySelect'
import LeafletMap from 'LeafletMap'

const AlertMapIndex = props => {
  return (
    <div className="alert-map-index">
      <Row>
        <GeographySelect dispatch={props.dispatch} onChange={props.changeGeographyAndId} />
      </Row>
      <Row>
        <Col xs={12} sm={6} md={4} />
        <Col xs={12} sm={6} md={8} />
      </Row>
      <Row>
        <Col xs={12} lg={3} />
        <Col xs={12} lg={6}>
          <LeafletMap />
        </Col>
        <Col sm={12} lg={3} />
      </Row>
    </div>
  )
}

AlertMapIndex.propTypes = {
  changeGeographyAndId: PropTypes.func,
  dispatch: PropTypes.func,
}

export default AlertMapIndex
