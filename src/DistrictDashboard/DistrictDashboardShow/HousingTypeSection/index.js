import React from 'react'
import PropTypes from 'prop-types'

import HousingTypeResultCard from 'shared/components/ResultCard/HousingTypeResultCard'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import BasicResultsHeader from 'shared/components/ResultCard/BasicResultsHeader'
import ConfigContext from 'Config/ConfigContext'
import * as c from 'shared/constants'
import { setAppState } from 'Store/AppState/actions'

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
              {/* <RequestSummaryWrapper
                request={props.propertySummaryRequest}
                label={'Total properties:'}
                resultsComponent={BasicResultsHeader}
              /> */}
              <Row>
                {propertyResource.ownResultFilters.map((ownResultFilter, index) => {
                  return (
                    <Col
                      xs={12}
                      sm={6}
                      lg={12}
                      key={`housingtype-summary-${index}`}
                      onClick={
                        props.customView
                          ? () => props.dispatch(setAppState({ districtShowCustomView: false }))
                          : undefined
                      }
                    >
                      <RequestSummaryWrapper
                        key={`housingtype-wrapper-${index}`}
                        request={props.propertySummaryRequest}
                        totalRequest={props.propertySummaryRequest}
                        onClick={() => props.switchSelectedFilter(ownResultFilter)}
                        label={ownResultFilter.label}
                        resultsFilter={ownResultFilter}
                        resultsComponent={HousingTypeResultCard}
                        infoKey={ownResultFilter.id}
                        percentageOfWhole={ownResultFilter !== residentialFilter}
                        unitsLabel={ownResultFilter === residentialFilter ? 'of all properties' : 'of residential'}
                        totalResultsFilter={ownResultFilter === residentialFilter ? undefined : residentialFilter}
                        selected={props.customView ? undefined : isSelected(props, ownResultFilter)}
                        disabled={props.customView}
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
}

export default HousingTypeSection
