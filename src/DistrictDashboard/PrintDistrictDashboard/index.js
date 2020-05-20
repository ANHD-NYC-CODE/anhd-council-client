import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import * as c from 'shared/constants'

import { getManyRequestTypes } from 'Store/AppState/selectors'
import HousingTypeResultCard from 'shared/components/ResultCard/HousingTypeResultCard'
import BasicResultsHeader from 'shared/components/ResultCard/BasicResultsHeader'

import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'

import moment from 'moment'
import LeafletMap from 'LeafletMap'

const PrintDistrictDashboard = props => {
  const geographyRequests = getManyRequestTypes(props.appState.requests, ['MAP_FILTER'])

  const propertyResource = props.config.resourceModels['PROPERTY']
  const residentialFilter = propertyResource.ownResultFilters.find(f => f.id === c.HOUSING_TYPE_RESIDENTIAL)

  return (
    <div className="print-alert-map">
      <Row className="pb-4">
        <Col xs={4}>
          <h6>
            From {`${moment(props.dashboardState.mapFilterDate).format('MM/DD/YYYY')}`} to{' '}
            {moment().format('MM/DD/YYYY')}
          </h6>
        </Col>

        <Col xs={8}>
          <LeafletMap
            currentGeographyType={props.appState.currentGeographyType}
            currentGeographyId={props.appState.currentGeographyId}
            changingGeographyType={props.appState.changingGeographyType}
            changingGeographyId={props.appState.changingGeographyId}
            councilDistricts={props.config.councilDistricts}
            communityDistricts={props.config.communityDistricts}
            stateAssemblies={props.config.stateAssemblies}
            stateSenates={props.config.stateSenates}
            zipCodes={props.config.zipCodes}
            height="300px"
            width="300px"
            iconConfig="MULTIPLE"
            interactive={false}
            selectGeographyData={props.config.selectGeographyData}
          />
        </Col>
      </Row>
      <Row>
        <h4>Housing Types</h4>
      </Row>
      <Row>
        <RequestSummaryWrapper
          print={true}
          request={props.propertySummaryRequest}
          label={'Total properties:'}
          resultsComponent={BasicResultsHeader}
        />
      </Row>
      <Row className="py-4">
        {propertyResource.ownResultFilters.map((ownResultFilter, index) => {
          return (
            <Col xs={4} key={`housingtype-summary-${index}`}>
              <RequestSummaryWrapper
                print={true}
                request={props.propertySummaryRequest}
                totalRequest={props.propertySummaryRequest}
                label={ownResultFilter.label}
                resultsFilter={ownResultFilter}
                resultsComponent={HousingTypeResultCard}
                unitsLabel={ownResultFilter === residentialFilter ? 'of all properties' : 'of residential'}
                totalResultsFilter={ownResultFilter === residentialFilter ? undefined : residentialFilter}
              />
            </Col>
          )
        })}
      </Row>
      <Row>
        <h4>Reports</h4>
      </Row>
      <Row className="pt-4">
        {geographyRequests.map((request, index) => {
          return (
            <Col xs={4} key={`rs-col-${index}`} className="geography-request-summary__container">
              <RequestSummaryWrapper
                key={`request-summary-${props.appState.requests.indexOf(request)}`}
                request={request}
                label={request.summaryCardLabel}
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

PrintDistrictDashboard.propTypes = {
  appState: PropTypes.object,
  dashboardState: PropTypes.object,
  propertySummaryRequest: PropTypes.object,
  layout: PropTypes.object,
}

export default PrintDistrictDashboard
