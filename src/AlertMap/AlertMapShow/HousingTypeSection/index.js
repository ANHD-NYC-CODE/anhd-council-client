import React from 'react'
import PropTypes from 'prop-types'

import HousingTypeResultCard from 'shared/components/ResultCard/HousingTypeResultCard'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import ConfigContext from 'Config/ConfigContext'

import { Row, Col } from 'react-bootstrap'
const HousingTypeSection = props => {
  return (
    <Row className="housingtype-section py-2 mb-4 mb-lg-0">
      <Col xs={12} sm={6} lg={12} className="housingtype-request-summary__container">
        <RequestSummaryWrapper
          request={props.housingTypeRequests.find(r => r.requestConstant === 'GEOGRAPHY_HOUSING_TYPE_ALL')}
          totalRequest={props.housingTypeRequests.find(r => r.requestConstant === 'GEOGRAPHY_HOUSING_TYPE_ALL')}
          onClick={r => props.switchTable(r)}
          resultsComponent={HousingTypeResultCard}
          // selected={
          //   props.selectedRequestIndex ===
          //   props.appState.requests.indexOf(props.appState.requests.indexOf(props.propertySummaryRequest))
          // }
        />

        <ConfigContext.Consumer>
          {config => {
            const propertyResource = config.datasetModels.find(model => model.resourceConstant === 'PROPERTY')
            return propertyResource.ownResultFilters.map(ownResultFilter => {
              return (
                <RequestSummaryWrapper
                  key={`request-summary2-${props.appState.requests.indexOf(props.propertySummaryRequest)}`}
                  request={props.propertySummaryRequest}
                  totalRequest={props.housingTypeRequests.find(r => r.requestConstant === 'GEOGRAPHY_HOUSING_TYPE_ALL')}
                  onClick={r => props.switchTable(r)}
                  label={ownResultFilter.label}
                  filter={results => ownResultFilter.internalFilter(results, ownResultFilter.paramMaps)}
                  resultsComponent={HousingTypeResultCard}
                  infoKey={ownResultFilter.infoKey}
                  // selected={
                  //   props.selectedRequestIndex === props.appState.requests.indexOf(props.propertySummaryRequest)
                  // }
                />
              )
            })
          }}
        </ConfigContext.Consumer>
      </Col>
    </Row>
  )
}

HousingTypeSection.propTypes = {
  appState: PropTypes.object,
  housingTypeRequests: PropTypes.array,
  propertySummaryRequest: PropTypes.object,
  propertyResource: PropTypes.object,
  selectedRequestIndex: PropTypes.number,
  switchTable: PropTypes.func,
}

export default HousingTypeSection
