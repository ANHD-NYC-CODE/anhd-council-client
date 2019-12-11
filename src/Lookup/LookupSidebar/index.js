import React, { useState } from 'react'
import PropTypes from 'prop-types'

import LeafletMap from 'LeafletMap'
import LookupLinks from 'Lookup/LookupLinks'
import RequestTableWrapper from 'shared/components/RequestTableWrapper'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { Row, Col } from 'react-bootstrap'
import classnames from 'classnames'
import './style.scss'

const LookupSidebar = props => {
  const [open, toggleOpen] = useState(true)

  const handleToggleKeyDown = e => {
    // space or enter or escape
    if (e.keyCode === 13 || e.keyCode === 32 || (open && e.keyCode === 27)) {
      e.preventDefault()
      toggleOpen(!open)
    }
  }

  return (
    <div className={classnames('lookup-sidebar full-bleed--mobile', { open })}>
      <div
        tabIndex="0"
        role="button"
        aria-label="Toggle Sidebar"
        className="lookup-sidebar__toggle"
        onKeyDown={handleToggleKeyDown}
        onClick={() => toggleOpen(!open)}
      >
        <FontAwesomeIcon icon={open ? faChevronLeft : faChevronRight} size="1x" />
      </div>
      <Row className="mt-4">
        <Col xs={12}>
          <h3 className="text-light-gray font-weight-bold text-uppercase">Property Info</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <RequestTableWrapper
            caption={props.profileRequest.resourceModel.label}
            request={props.profileRequest}
            visible={true}
          />
        </Col>
      </Row>
      <hr />
      <Row className="mb-4">
        <Col col={12}>
          <LeafletMap
            appState={props.appState}
            currentGeographyType={props.appState.currentGeographyType}
            center={props.propertyResult.lat ? [props.propertyResult.lat, props.propertyResult.lng] : undefined}
            results={props.propertyResult}
            displayedRequest={props.appState.requests.find(request => request.type === 'LOOKUP_PROFILE')}
            iconConfig="SINGLE"
            zoom={17}
          />
        </Col>
      </Row>
      <LookupLinks request={props.profileRequest} />
    </div>
  )
}

LookupSidebar.propTypes = {
  appState: PropTypes.object,
  profileRequest: PropTypes.object,
  propertyResult: PropTypes.object,
}

export default LookupSidebar
