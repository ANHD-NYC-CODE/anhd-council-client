import React from 'react'
import PropTypes from 'prop-types'

import * as c from 'shared/constants'

import { setAppState, toggleSelectedAmountFilter } from 'Store/AppState/actions'
import UserContext from 'Auth/UserContext'
import AnnotatedResultFilterCard from 'DistrictDashboard/AnnotatedResultFilterCard'
import { Row, Col } from 'react-bootstrap'
import ResultFilterError from 'shared/components/ResultFilterError'
import { setHousingTypeResultFilter } from 'Store/DashboardState/actions'

import ModalContext from 'Modal/ModalContext'

import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import { fireFilterSelectEvent } from 'Store/Analytics/actions'
const DistrictSummarySection = props => {
  const handleResultFilterClick = amountFilter => {
    props.endChangingState()
    props.dispatch(
      setAppState({
        districtShowCustomView: false,
        dashboardTableState: {
          ...props.appState.dashboardTableState,
          page: 1,
        },
        selectedResultFilters: amountFilter,
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
          <Row className="district-summary-section">
            {props.dashboardState.resultFilters
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
                      props.customView
                        ? () => props.dispatch(setAppState({ districtShowCustomView: false }))
                        : undefined
                    }
                  >
                    {(amountFilter.resourceModel.resourceConstant === 'FORECLOSURE' ||
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
                      <AnnotatedResultFilterCard
                        auth={auth}
                        key={`request-summary-${amountFilter.category}-${index}`}
                        amountFilter={amountFilter}
                        calculatedTotal={
                          props.housingTypeResultFilter.internalFilter(
                            amountFilter.internalFilter(props.totalPropertyResults),
                            props.housingTypeResultFilter.paramMaps
                          ).length
                        }
                        disabled={props.customView || props.loading}
                        dispatch={props.dispatch}
                        selected={!props.customView && props.appState.selectedFilters.includes(amountFilter)}
                        handleClick={() => handleResultFilterClick(amountFilter)}
                      />
                    )}
                  </Col>
                )
              })}
          </Row>
        )
      }}
    </UserContext.Consumer>
  )
}
DistrictSummarySection.defaultProps = {
  loading: false,
  customView: false,
}
DistrictSummarySection.propTypes = {
  appState: PropTypes.object,
  dashboardState: PropTypes.object,
  customView: PropTypes.bool,
  loading: PropTypes.bool,
}

export default DistrictSummarySection
