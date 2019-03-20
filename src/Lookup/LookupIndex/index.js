import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'
import AddressSearch from 'Lookup/AddressSearch'
import LeafletMap from 'LeafletMap'
const LookupIndex = props => {
  return (
    <Row>
      <Col xs={12} lg={4}>
        <Row>
          <Col>
            <AddressSearch />
          </Col>
        </Row>
        <Row>
          <Col />
        </Row>
        <Row>
          <Col>
            <LeafletMap />
          </Col>
        </Row>
        <Row>
          <Col />
        </Row>
      </Col>
      <Col xs={12} lg={8}>
        <Row>
          <Col xs={12} lg={3}>
            <Row />
          </Col>
          <Col xs={12} lg={9}>
            <Row>
              <Col />
            </Row>
            <Row />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

LookupIndex.propTypes = {}

export default LookupIndex
