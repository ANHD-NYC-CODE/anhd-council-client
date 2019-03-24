import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'
import AddressSearch from 'Lookup/AddressSearch'
import LeafletMap from 'LeafletMap'
import IntroductionBlock from 'shared/components/IntroductionBlock'

const LookupIndex = props => {
  return (
    <Row>
      <Col className="touch-left padding-xs-sm-0" xs={12} md={6} lg={5}>
        <IntroductionBlock />
      </Col>
      <Col className="px-md-4 py-3 py-md-6" xs={12} md={6} lg={7}>
        <p className="text-muted font-weight-bold">Enter a building address to begin.</p>
        <Row className="mt-4">
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
