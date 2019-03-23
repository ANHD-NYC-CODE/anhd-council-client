import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import LeafletMap from 'LeafletMap'
import RequestSummary from 'shared/components/RequestSummary'
import RequestWrapper from 'shared/components/RequestWrapper'
import SummaryResultCard from 'shared/components/SummaryResultCard'

import { Row, Col, Card } from 'react-bootstrap'
import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'

const PrintLookup = props => {
  return (
    <div className="print-lookup">
      <Row>
        <Col>
          <LeafletMap
            appState={props.appState}
            currentGeographyType={props.appState.currentGeographyType}
            center={props.propertyResult.lat ? [props.propertyResult.lat, props.propertyResult.lng] : undefined}
            selectedRequest={props.profileRequest}
            iconConfig="SINGLE"
            interactive={false}
            height="300px"
            width="300px"
            zoom={15}
          />
        </Col>
        <Col>
          <Card.Text className="lookup-profile-summary__group">
            <h4>{councilIdToString(props.propertyResult.council)}</h4>
          </Card.Text>
          <Card.Text className="lookup-profile-summary__group">
            <h4>{`Community District  ${communityIdToString(props.propertyResult.cd)}`}</h4>
          </Card.Text>
          <Card.Text className="lookup-profile-summary__group"> {moment().format('MM/DD/YYYY')}</Card.Text>
          {props.bin && <Card.Text>BIN: {props.bin}</Card.Text>}
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Property Information</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <RequestWrapper request={props.profileRequest} visible={true} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>{props.bin ? 'Building' : 'Property'} Data</h4>
        </Col>
      </Row>
      <Row>
        {props.lookupRequests.map((request, index) => {
          return (
            <Col xs={3} key={`rw-col-${index}`} className="request-wrapper-container">
              <RequestSummary
                key={`request-summary-${props.appState.requests.indexOf(request)}`}
                request={request}
                print={true}
                resultsComponent={SummaryResultCard}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

PrintLookup.propTypes = {
  appState: PropTypes.object,
  bin: PropTypes.string,
  lookupRequests: PropTypes.array,
  propertyResult: PropTypes.object,
  profileRequest: PropTypes.object,
}

export default PrintLookup
