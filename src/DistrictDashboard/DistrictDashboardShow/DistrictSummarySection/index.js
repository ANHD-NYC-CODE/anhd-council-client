import React from 'react'
import PropTypes from 'prop-types'
import { setAppState, toggleSelectedAmountFilter } from 'Store/AppState/actions'

import AmountResultFilterCard from 'DistrictDashboard/AmountResultFilterCard'
import { Row, Col } from 'react-bootstrap'

const DistrictSummarySection = props => {
  const handleResultFilterClick = amountFilter => {
    props.dispatch(setAppState({ districtShowCustomView: false }))
    props.dispatch(toggleSelectedAmountFilter(amountFilter))
    if (!props.appState.housingTypeResultFilter) {
      props.dispatch(
        setAppState({
          housingTypeResultFilter: props.appState.resultFilters[0],
        })
      )
    }

    props.dispatch(
      setAppState({
        selectedResultFilters: amountFilter,
      })
    )
  }
  return (
    <Row className="district-summary-section">
      {props.appState.resultFilters
        .filter(f => f.category === 'AMOUNT')
        .map((amountFilter, index) => {
          return (
            <Col
              xs={12}
              sm={6}
              xl={4}
              key={`rs-col-${index}`}
              className="geography-request-summary__container"
              onClick={
                props.customView ? () => props.dispatch(setAppState({ districtShowCustomView: false })) : undefined
              }
            >
              <AmountResultFilterCard
                key={`request-summary-${amountFilter.category}-${index}`}
                amountFilter={amountFilter}
                calculatedTotal={amountFilter.internalFilter(props.totalPropertyResults).length}
                disabled={props.customView}
                dispatch={props.dispatch}
                selected={!props.customView && props.appState.selectedFilters.includes(amountFilter)}
                handleClick={() => handleResultFilterClick(amountFilter)}
              />
            </Col>
          )
        })}
    </Row>
  )
}

DistrictSummarySection.propTypes = {
  customView: PropTypes.bool,
}

export default DistrictSummarySection
