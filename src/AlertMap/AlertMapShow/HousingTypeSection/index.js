import React from 'react'
import PropTypes from 'prop-types'

import HousingTypeResultCard from 'shared/components/ResultCard/HousingTypeResultCard'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import BasicResultsHeader from 'shared/components/ResultCard/BasicResultsHeader'
import ConfigContext from 'Config/ConfigContext'

import { Col } from 'react-bootstrap'
const HousingTypeSection = props => {
  return (
    <Col xs={12} sm={6} lg={12} className="housingtype-request-summary__container">
      <ConfigContext.Consumer>
        {config => {
          const propertyResource = config.resourceModels.find(model => model.resourceConstant === 'PROPERTY')
          const residentialFilter = propertyResource.ownResultFilters.find(f => f.id === 'HOUSING_TYPE_RESIDENTIAL')
          return (
            <div className="housing-type-section__wrapper">
              <RequestSummaryWrapper
                request={props.propertySummaryRequest}
                label={'Total properties:'}
                resultsComponent={BasicResultsHeader}
              />
              {propertyResource.ownResultFilters.map((ownResultFilter, index) => {
                return (
                  <RequestSummaryWrapper
                    key={`housingtype-summary-${index}`}
                    request={props.propertySummaryRequest}
                    totalRequest={props.propertySummaryRequest}
                    onClick={props.switchTable}
                    label={ownResultFilter.label}
                    resultsFilter={ownResultFilter}
                    resultsComponent={HousingTypeResultCard}
                    infoKey={ownResultFilter.id}
                    unitsLabel={ownResultFilter === residentialFilter ? 'of all properties' : 'of residential'}
                    totalResultsFilter={ownResultFilter === residentialFilter ? undefined : residentialFilter}
                    selected={
                      props.selectedRequest === props.propertySummaryRequest &&
                      props.selectedResultsFilter === ownResultFilter
                    }
                  />
                )
              })}
            </div>
          )
        }}
      </ConfigContext.Consumer>
    </Col>
  )
}

HousingTypeSection.propTypes = {
  appState: PropTypes.object,
  housingTypeRequests: PropTypes.array,
  propertySummaryRequest: PropTypes.object,
  propertyResource: PropTypes.object,
  selectedRequest: PropTypes.object,
  selectedResultsFilter: PropTypes.object,
  switchTable: PropTypes.func,
}

export default HousingTypeSection
