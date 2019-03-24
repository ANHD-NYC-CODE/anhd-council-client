import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'
import AddressSearch from 'Lookup/AddressSearch'
import LeafletMap from 'LeafletMap'
import IntroductionBlock from 'shared/components/IntroductionBlock'
const LookupIndex = props => {
  return (
    <Row>
      <Col className="touch-left" xs={12} md={6} lg={5}>
        <IntroductionBlock />
      </Col>
      <Col xs={12} md={6} lg={7}>
        <Row>
          <Col>
            <AddressSearch />
          </Col>
        </Row>
        <Row>
          <Col>
            <LeafletMap appState={props.appState} iconConfig="SINGLE" zoom={15} />
          </Col>
        </Row>
        <Row>
          <Col />
        </Row>
      </Col>
    </Row>
  )
}

LookupIndex.propTypes = {
  appState: PropTypes.object,
}

export default LookupIndex
