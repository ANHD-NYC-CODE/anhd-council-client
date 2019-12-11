import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'

import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'
import LookupLinks from 'Lookup/LookupLinks'
import RequestTableWrapper from 'shared/components/RequestTableWrapper'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import ConfigContext from 'Config/ConfigContext'

import { Row, Col, InputGroup } from 'react-bootstrap'

const LookupSidebar = props => {
  return (
    <Col
      className="layout__left-column touch-left lookup-show__property-column px-lg-2 px-xl-5"
      xs={12}
      md={c.SIDEBAR_COLUMN_SIZE}
    >
      <Row className="mt-4">
        <Col xs={12}>
          <h3 className="text-light-gray font-weight-bold text-uppercase">Property Info</h3>
        </Col>
      </Row>
      <Row className="mt-2 mb-4">
        <Col>
          <InputGroup className="lookup-show__address-group flex-nowrap">
            <InputGroup.Append className="flex-column justify-content-center">
              <FontAwesomeIcon className=" mr-2 text-white" size="2x" icon={faSearch} />
            </InputGroup.Append>
            <ConfigContext.Consumer>
              {config => {
                return <AddressSearch config={config} inputClass="xl-form-control" />
              }}
            </ConfigContext.Consumer>
          </InputGroup>
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
    </Col>
  )
}

LookupSidebar.propTypes = {
  appState: PropTypes.object,
  profileRequest: PropTypes.object,
  propertyResult: PropTypes.object,
}

export default LookupSidebar
