import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'

import ConfigContext from 'Config/ConfigContext'
import { getRequestType, getManyRequestTypes } from 'Store/AppState/selectors'
import HousingTypeSummaryResultCard from 'AlertMap/HousingTypeSummaryResultCard'

import RequestSummary from 'shared/components/RequestSummary'
import SummaryResultCard from 'shared/components/SummaryResultCard'

import moment from 'moment'
import LeafletMap from 'LeafletMap'

const PrintAlertMap = props => {
  const geographyRequests = getManyRequestTypes(props.appState.requests, ['MAP_FILTER'])

  const housingTypeRequests = getRequestType(props.appState.requests, 'GEOGRAPHY_HOUSING_TYPE')

  return (
    <div className="print-alert-map">
      <Row>
        <Col xs={4}>
          <h5>
            From {`${moment(props.appState.mapFilterDate).format('MM/DD/YYYY')}`} to {moment().format('MM/DD/YYYY')}
          </h5>
        </Col>

        <Col xs={8}>
          <ConfigContext.Consumer>
            {config => {
              return (
                <LeafletMap
                  appState={props.appState}
                  councilDistricts={config.councilDistricts}
                  communityDistricts={config.communityDistricts}
                  height="300px"
                  width="300px"
                  iconConfig="MULTIPLE"
                  interactable={false}
                  selectGeographyData={config.selectGeographyData}
                />
              )
            }}
          </ConfigContext.Consumer>
        </Col>
      </Row>
      <Row>
        <h4>Housing Types</h4>
      </Row>
      <Row>
        {housingTypeRequests.map((request, index) => {
          return (
            <Col xs={4} key={`rs-col-${index}`} className="housingtype-request-summary__container">
              <RequestSummary
                key={`request-summary-${props.appState.requests.indexOf(request)}`}
                request={request}
                onClick={r => this.switchTable(r)}
                resultsComponent={HousingTypeSummaryResultCard}
              />
            </Col>
          )
        })}
      </Row>
      <Row>
        <h4>Reports</h4>
      </Row>
      <Row>
        {geographyRequests.map((request, index) => {
          return (
            <Col xs={4} key={`rs-col-${index}`} className="geography-request-summary__container">
              <RequestSummary
                key={`request-summary-${props.appState.requests.indexOf(request)}`}
                request={request}
                onClick={r => this.switchTable(r)}
                resultsComponent={SummaryResultCard}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

PrintAlertMap.propTypes = {
  appState: PropTypes.object,
  layout: PropTypes.object,
  selectedRequest: PropTypes.object,
}

export default PrintAlertMap
