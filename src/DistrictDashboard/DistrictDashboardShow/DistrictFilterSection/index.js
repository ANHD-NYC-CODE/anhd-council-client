import React from 'react'
import PropTypes from 'prop-types'

import { setAppState } from 'Store/AppState/actions'
import { toggleSelectedAmountFilter } from 'Store/DashboardState/actions'
import UserContext from 'Auth/UserContext'
import AnnotatedResultFilterCard from 'DistrictDashboard/AnnotatedResultFilterCard'
import { setHousingTypeResultFilter, setDashboardTableState } from 'Store/DashboardState/actions'
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { fireFilterSelectEvent } from 'Store/Analytics/actions'
import InfoModalButton from 'shared/components/InfoModalButton'

import './style.scss'

const DistrictFilterSection = props => {
  const setFilterCondition = filterCondition => {
    props.toggleFilterCondition(filterCondition)
  }
  const handleResultFilterClick = amountFilter => {
    props.endChangingState()

    props.dispatch(
      setAppState({
        selectedResultFilters: amountFilter,
      })
    )

    props.dispatch(
      setDashboardTableState({
        ...props.dashboardState.dashboardTableState,
        page: 1,
      })
    )

    props.dispatch(toggleSelectedAmountFilter(amountFilter))
    props.dispatch(fireFilterSelectEvent(amountFilter))
    if (!props.dashboardState.housingTypeResultFilter) {
      props.dispatch(
        setAppState({
          changingGeography: false, // End changing state
          changingGeographyId: undefined,
          changingGeographyType: undefined,
        })
      )
      props.dispatch(setHousingTypeResultFilter(props.dashboardState.resultFilters[0]))
    }
  }

  return (
    <UserContext.Consumer>
      {auth => {
        return (
          <div className="district-filter-section">
            <div className="district-filter-section__header">
              <p className="district-filter-section__title">Datasets:</p>
              <ButtonToolbar className="d-flex dashboard-filter-section__toggle">
                <ToggleButtonGroup
                  name="view"
                  type="radio"
                  value={props.dashboardState.filterCondition}
                  onChange={setFilterCondition}
                >
                  <ToggleButton
                    tabIndex="0"
                    className="view-toggle"
                    data-test-id="dashboard-condition-toggle"
                    size="sm"
                    variant={props.dashboardState.filterCondition === 'OR' ? 'light' : 'dark'}
                    value={'AND'}
                  >
                    And
                  </ToggleButton>
                  <ToggleButton
                    tabIndex="0"
                    className="view-toggle"
                    data-test-id="dashboard-condition-toggle"
                    size="sm"
                    variant={props.dashboardState.filterCondition === 'OR' ? 'dark' : 'light'}
                    value={'OR'}
                  >
                    Or
                  </ToggleButton>
                </ToggleButtonGroup>
                <InfoModalButton modalConstant={'DASHBOARD_AND_OR'} />
              </ButtonToolbar>
            </div>

            {props.dashboardState.resultFilters
              .filter(f => f.category === 'AMOUNT')
              .map((amountFilter, index) => {
                return (
                  <AnnotatedResultFilterCard
                    testId={`annotated-result-filter-card--${amountFilter.fieldName}`}
                    key={`request-summary-${amountFilter.category}-${index}`}
                    auth={auth}
                    amountFilter={amountFilter}
                    calculatedTotal={(props.dashboardState.resultFilterCalculations[index] || {}).length}
                    disabled={props.loading}
                    dispatch={props.dispatch}
                    selected={props.dashboardState.selectedFilters.includes(amountFilter)}
                    handleClick={() => handleResultFilterClick(amountFilter)}
                  />
                )
              })}
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}
DistrictFilterSection.defaultProps = {
  loading: false,
}
DistrictFilterSection.propTypes = {
  appState: PropTypes.object,
  dashboardState: PropTypes.object,
  loading: PropTypes.bool,
}

export default DistrictFilterSection
