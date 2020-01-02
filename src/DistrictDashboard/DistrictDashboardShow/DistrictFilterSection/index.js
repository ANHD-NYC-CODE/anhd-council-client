import React from 'react'
import PropTypes from 'prop-types'

import * as c from 'shared/constants'

import { setAppState } from 'Store/AppState/actions'
import { setDashboardCustomView, toggleSelectedAmountFilter } from 'Store/DashboardState/actions'
import UserContext from 'Auth/UserContext'
import AnnotatedResultFilterCard from 'DistrictDashboard/AnnotatedResultFilterCard'
import ResultFilterError from 'shared/components/ResultFilterError'
import { setHousingTypeResultFilter, setDashboardTableState } from 'Store/DashboardState/actions'

import ModalContext from 'Modal/ModalContext'
import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import { fireFilterSelectEvent } from 'Store/Analytics/actions'

import './style.scss'

const DistrictFilterSection = props => {
  const handleResultFilterClick = amountFilter => {
    props.endChangingState()
    if (props.customView) {
      props.dispatch(setDashboardCustomView(false))
    }
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
            <p className="district-filter-section__title">Datasets:</p>

            {props.dashboardState.resultFilters
              .filter(f => f.category === 'AMOUNT')
              .map((amountFilter, index) => {
                return (amountFilter.resourceModel.resourceConstant === 'FORECLOSURE' ||
                  amountFilter.resourceModel.resourceConstant === 'LISPENDEN') &&
                  !auth.user ? (
                  <ModalContext.Consumer>
                    {modal => {
                      return (
                        <ResultFilterError
                          amountFilter={amountFilter}
                          ctaText={c.LOGIN_CTA}
                          error={{ message: 'Please login to view.' }}
                          errorAction={e => {
                            e.preventDefault()
                            modal.setModal({
                              modalComponent: LoginModal,
                              modalProps: {
                                modalFooter: <LoginModalFooter modal={modal} />,
                              },
                            })
                          }}
                          requestLabel={amountFilter.label}
                        />
                      )
                    }}
                  </ModalContext.Consumer>
                ) : (
                  <div>
                    <AnnotatedResultFilterCard
                      auth={auth}
                      key={`request-summary-${amountFilter.category}-${index}`}
                      amountFilter={amountFilter}
                      calculatedTotal={(props.dashboardState.resultFilterCalculations[index] || {}).length}
                      disabled={props.customView || props.loading}
                      dispatch={props.dispatch}
                      selected={!props.customView && props.dashboardState.selectedFilters.includes(amountFilter)}
                      handleClick={() => handleResultFilterClick(amountFilter)}
                    />
                  </div>
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
  customView: false,
}
DistrictFilterSection.propTypes = {
  appState: PropTypes.object,
  dashboardState: PropTypes.object,
  customView: PropTypes.bool,
  loading: PropTypes.bool,
}

export default DistrictFilterSection
