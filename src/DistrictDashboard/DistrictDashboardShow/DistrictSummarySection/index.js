import React from 'react'
import PropTypes from 'prop-types'
import { setAppState, toggleSelectedAmountFilter } from 'Store/AppState/actions'
import UserContext from 'Auth/UserContext'
import AmountResultFilterCard from 'DistrictDashboard/AmountResultFilterCard'
import { Row, Col } from 'react-bootstrap'
import ResultFilterError from 'shared/components/ResultFilterError'

import ModalContext from 'Modal/ModalContext'

import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'

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
    <UserContext.Consumer>
      {auth => {
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
                      props.customView
                        ? () => props.dispatch(setAppState({ districtShowCustomView: false }))
                        : undefined
                    }
                  >
                    {amountFilter.resourceModel.resourceConstant === 'LISPENDEN' && !auth.user ? (
                      <ModalContext.Consumer>
                        {modal => {
                          return (
                            <ResultFilterError
                              amountFilter={amountFilter}
                              error={{ message: 'Please login to view.' }}
                              errorAction={e => {
                                e.preventDefault()
                                modal.setModal({
                                  modalComponent: LoginModal,
                                  modalProps: {
                                    postLoginAction: () => props.resendPropertyRequest(),
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
                      <AmountResultFilterCard
                        auth={auth}
                        key={`request-summary-${amountFilter.category}-${index}`}
                        amountFilter={amountFilter}
                        calculatedTotal={amountFilter.internalFilter(props.totalPropertyResults).length}
                        disabled={props.customView}
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

DistrictSummarySection.propTypes = {
  customView: PropTypes.bool,
}

export default DistrictSummarySection
