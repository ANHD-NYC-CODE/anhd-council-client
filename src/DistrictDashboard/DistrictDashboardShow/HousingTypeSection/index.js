import React from 'react'
import PropTypes from 'prop-types'

import HousingTypeResultCard from 'shared/components/ResultCard/HousingTypeResultCard'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import BasicResultsHeader from 'shared/components/ResultCard/BasicResultsHeader'
import ConfigContext from 'Config/ConfigContext'
import * as c from 'shared/constants'

import { Row, Col } from 'react-bootstrap'

const isSelected = (props, ownResultFilter) => {
  return (props.selectedResultsFilter || {}).id === ownResultFilter.id
}

const HousingTypeSection = props => {
  return (
    <ConfigContext.Consumer>
      {config => {
        const propertyResource = Object.values(config.resourceModels).find(
          model => model.resourceConstant === 'PROPERTY'
        )
        const residentialFilter = propertyResource.ownResultFilters.find(f => f.id === c.HOUSING_TYPE_RESIDENTIAL)
        return (
          <Col xs={12} className="housingtype-request-summary__container">
            <div className="housing-type-section__wrapper">
              <RequestSummaryWrapper
                request={props.propertySummaryRequest}
                label={'Total properties:'}
                resultsComponent={BasicResultsHeader}
              />
              <Row>
                {propertyResource.ownResultFilters.map((ownResultFilter, index) => {
                  return (
                    <Col xs={12} sm={6} lg={12} key={`housingtype-summary-${index}`}>
                      <RequestSummaryWrapper
                        request={props.propertySummaryRequest}
                        totalRequest={props.propertySummaryRequest}
                        onClick={() => props.switchSelectedFilter(ownResultFilter)}
                        label={ownResultFilter.label}
                        resultsFilter={ownResultFilter}
                        resultsComponent={HousingTypeResultCard}
                        infoKey={ownResultFilter.id}
                        unitsLabel={ownResultFilter === residentialFilter ? 'of all properties' : 'of residential'}
                        totalResultsFilter={ownResultFilter === residentialFilter ? undefined : residentialFilter}
                        selected={isSelected(props, ownResultFilter)}
                      />
                    </Col>
                  )
                })}
              </Row>
            </div>
          </Col>
        )
      }}
    </ConfigContext.Consumer>
  )
}

HousingTypeSection.propTypes = {
  appState: PropTypes.object,
  housingTypeRequests: PropTypes.array,
  propertySummaryRequest: PropTypes.object,
  propertyResource: PropTypes.object,
  selectedResultsFilter: PropTypes.object,
  switchSelectedFilter: PropTypes.func,
}

export default HousingTypeSection
