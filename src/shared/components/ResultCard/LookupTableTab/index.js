import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'

import ModalContext from 'Modal/ModalContext'

import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'

import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import { spaceEnterKeyDownHandler } from 'shared/utilities/accessibilityUtils'

import './style.scss'
import { Row, Col } from 'react-bootstrap'
const getLabel = props => {
  if (props.label) return props.label
  else {
    return (
      <Row>
        {props.resultsFilter && (
          <Col xs={2}>
            <FontAwesomeIcon icon={faHome} />
          </Col>
        )}
        <Col xs={10}>{props.resultsFilter.label ? props.resultsFilter.label : 'All Properties'}</Col>
        {props.request && (
          <Col xs={2}>
            <FontAwesomeIcon icon={faChartBar} />
          </Col>
        )}
        {props.request && <Col xs={10}>{props.request.summaryCardLabel}</Col>}
      </Row>
    )
  }
}

const retryRequest = props => {
  props.request.called = false
  props.dispatch(requestWithAuth(makeRequest(props.request)))
}

const LookupTableTab = props => {
  const renderErrorButton = () => {
    if (props.error.status === 401) {
      return (
        <ModalContext.Consumer>
          {modal => {
            return (
              <button
                className="error-cta text-link"
                onClick={e => {
                  e.preventDefault()
                  modal.setModal({
                    modalComponent: LoginModal,
                    modalProps: {
                      modalFooter: <LoginModalFooter modal={modal} />,
                    },
                  })
                }}
                onKeyDown={e =>
                  spaceEnterKeyDownHandler(e, e => {
                    e.preventDefault()
                    modal.setModal({
                      modalComponent: LoginModal,
                      modalProps: {
                        modalFooter: <LoginModalFooter modal={modal} />,
                      },
                    })
                  })
                }
              >
                {c.LOGIN_CTA}
              </button>
            )
          }}
        </ModalContext.Consumer>
      )
    } else {
      return (
        <button
          className="error-cta text-link"
          onClick={() => retryRequest(props)}
          onKeyDown={e => spaceEnterKeyDownHandler(e, () => retryRequest(props))}
        >
          (!) Retry
        </button>
      )
    }
  }

  const renderComponentInside = () => {
    return (
      <div className="summary-result-card__label">
        <div>
          {getLabel(props)}{' '}
          <span className="summary-result-card__result">
            {props.loading ? <SpinnerLoader className="spinner-loader__container--inline" size="14px" /> : null}
          </span>
          {props.error && renderErrorButton()}
        </div>
      </div>
    )
  }

  return !props.error ? (
    <button
      className={classnames('lookup-table-tab', props.isBuildingTab ? 'tab--secondary' : 'tab--primary', {
        active: props.selected,
      })}
      disabled={props.loading || props.error}
      onClick={props.onClick}
    >
      {renderComponentInside()}
    </button>
  ) : (
    <div className="lookup-table-tab tab--disabled" disabled={props.loading || props.error}>
      {renderComponentInside()}
    </div>
  )
}

LookupTableTab.defaultProps = {
  isBuildingTab: false,
  loading: false,
  error: undefined,
  results: [],
  selected: false,
  resultsFilter: undefined,
}

LookupTableTab.propTypes = {
  dispatch: PropTypes.func,
  isBuildingTab: PropTypes.bool,
  onClick: PropTypes.func,
  resultsComponent: PropTypes.func,
  selected: PropTypes.bool,
  summaryTextColorClass: PropTypes.string,
  className: PropTypes.string,
  results: PropTypes.array,
  request: PropTypes.object,
}
export default LookupTableTab
