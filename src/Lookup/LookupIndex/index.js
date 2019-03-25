import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'
import AddressSearch from 'Lookup/AddressSearch'
import LeafletMap from 'LeafletMap'
import IntroductionBlock from 'shared/components/IntroductionBlock'

const LookupIndex = props => {
  return (
    <Row>
      <Col className="touch-left padding-xs-sm-0" xs={12} lg={5}>
        <IntroductionBlock />
      </Col>
      <Col className="px-md-4 py-3 py-lg-6" xs={12} lg={7}>
        <Row className="mb-4">
          <Col>
            <p className="text-muted font-weight-bold">Enter a building address to begin.</p>
            <AddressSearch />
          </Col>
        </Row>
        <Row>
          <Col>
            <LeafletMap appState={props.appState} iconConfig="SINGLE" zoom={15} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

LookupIndex.propTypes = {
  appState: PropTypes.object,
}

export default LookupIndex
