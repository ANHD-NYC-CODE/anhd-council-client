import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'
import AddressSearch from 'Lookup/AddressSearch'
import LeafletMap from 'LeafletMap'
import { Element } from 'react-scroll'
import * as c from 'shared/constants'
import ConfigContext from 'Config/ConfigContext'

import IntroductionBlock from 'shared/components/IntroductionBlock'

const LookupIndex = props => {
  return (
    <Row>
      <Col className="layout__left-column touch-left padding-xs-sm-0" xs={12} lg={c.SIDEBAR_COLUMN_SIZE}>
        <IntroductionBlock scrollToControls={props.scrollToControls} />
      </Col>
      <Col className="px-md-4 py-3 py-lg-6" xs={12} lg={12 - c.SIDEBAR_COLUMN_SIZE}>
        <Element name="main-controls" />
        <Row className="mb-4">
          <Col>
            <h5 className="font-weight-bold text-muted text-uppercase">Enter a building address to begin.</h5>
            <ConfigContext.Consumer>
              {config => {
                return <AddressSearch config={config} />
              }}
            </ConfigContext.Consumer>
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
