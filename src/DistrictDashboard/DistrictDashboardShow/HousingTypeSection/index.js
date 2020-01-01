import React from 'react'
import PropTypes from 'prop-types'

import HousingTypeResultCard from 'shared/components/ResultCard/HousingTypeResultCard'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import ConfigContext from 'Config/ConfigContext'
import * as c from 'shared/constants'
import { setDashboardCustomView } from 'Store/DashboardState/actions'

import { Row, Col } from 'react-bootstrap'

const isSelected = (props, ownResultFilter) => {
  return (props.housingTypeResultFilter || {}).id === ownResultFilter.id
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
              <Row>
                {propertyResource.ownResultFilters.map((ownResultFilter, index) => {
                  return (
                    <Col
                      xs={12}
                      sm={6}
                      lg={12}
                      key={`housingtype-summary-${index}`}
                      onClick={props.customView ? () => props.dispatch(setDashboardCustomView(false)) : undefined}
                    >
                      <RequestSummaryWrapper
                        key={`housingtype-wrapper-${index}`}
                        onClick={() => props.switchSelectedFilter(ownResultFilter, index)}
                        disabled={props.customView}
                        infoKey={ownResultFilter.id}
                        label={ownResultFilter.label}
                        percentageOfWhole={ownResultFilter !== residentialFilter}
                        resultsFilter={ownResultFilter}
                        resultsComponent={HousingTypeResultCard}
                        request={props.propertySummaryRequest}
                        selected={props.customView ? undefined : isSelected(props, ownResultFilter)}
                        results={props.housingTypeResults[index]}
                        totalResults={props.results}
                        unitsLabel={
                          ownResultFilter === residentialFilter ? 'of all properties' : 'of residential units'
                        }
                        totalRequest={props.propertySummaryRequest}
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
  customView: PropTypes.bool,
  propertySummaryRequest: PropTypes.object,
  propertyResource: PropTypes.object,
  housingTypeResultFilter: PropTypes.object,
  switchSelectedFilter: PropTypes.func,
  results: PropTypes.array,
}

export default HousingTypeSection
