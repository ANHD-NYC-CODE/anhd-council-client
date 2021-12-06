import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'

import ModalContext from 'Modal/ModalContext'

import SpinnerLoader from 'shared/components/Loaders/SpinnerLoader'
import RequestAccessModal from 'shared/components/modals/RequestAccessModal'
import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import ConfigContext from 'Config/ConfigContext'

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
    if (props.error.status === 409 && 
        props.request.resourceModel.resourceConstant === "OCA_HOUSING_COURT") 
    {
      return (
        <ConfigContext.Consumer>
        {config => {
          if (!config.infoModals["OCA_DATA_UNAVAILABLE"])
            return <div className={classnames('error-cta text-link', props.className)} />
          return (
            <ModalContext.Consumer>
              {modal => {
                return (
                  <button
                    className="error-cta text-link"
                    onClick={e => {
                      e.preventDefault()
                      modal.setModal({
                        modalProps: {
                          title: config.infoModals["OCA_DATA_UNAVAILABLE"].title,
                          body: config.infoModals["OCA_DATA_UNAVAILABLE"].body,
                          sources: config.infoModals["OCA_DATA_UNAVAILABLE"].sources,
                          documentationBody: config.infoModals["OCA_DATA_UNAVAILABLE"].documentationBody,
                          documentationSources: config.infoModals["OCA_DATA_UNAVAILABLE"].documentationSources,
                          size: 'lg',
                        },
                      })
                    }}
                    onKeyDown={e =>
                      spaceEnterKeyDownHandler(e, e => {
                        e.preventDefault()
                        modal.setModal({
                          modalProps: {
                            title: config.infoModals["OCA_DATA_UNAVAILABLE"].title,
                            body: config.infoModals["OCA_DATA_UNAVAILABLE"].body,
                            sources: config.infoModals["OCA_DATA_UNAVAILABLE"].sources,
                            documentationBody: config.infoModals["OCA_DATA_UNAVAILABLE"].documentationBody,
                            documentationSources: config.infoModals["OCA_DATA_UNAVAILABLE"].documentationSources,
                            size: 'lg',
                          },
                        })
                      })
                    }
                  >
                    Data unavailable. See why
                  </button>
                )
              }}
            </ModalContext.Consumer>
          )
        }}
        </ConfigContext.Consumer>
      )
    }
    if (props.error.status === 403 || props.error.status === 401) {
      return (
        <ModalContext.Consumer>
          {modal => {
            return (
              <button
                className="error-cta text-link"
                onClick={e => {
                  e.preventDefault()
                  if (props.error.status === 403) {
                    modal.setModal({
                      modalComponent: RequestAccessModal
                    })
                  }
                  else {
                    modal.setModal({
                      modalComponent: LoginModal,
                      modalProps: {
                        modalFooter: <LoginModalFooter modal={modal} />,
                        modal
                      },
                    })
                  }
                }}
                onKeyDown={e =>
                  spaceEnterKeyDownHandler(e, e => {
                    e.preventDefault()
                    if (props.error.status === 403) {
                      modal.setModal({
                        modalComponent: RequestAccessModal
                      })
                    }
                    else {
                      modal.setModal({
                        modalComponent: LoginModal,
                        modalProps: {
                          modalFooter: <LoginModalFooter modal={modal} />,
                          modal
                        },
                      })
                    }
                  })
                }
              >
                {props.error.status === 403 ? c.REQUEST_CTA : c.LOGIN_CTA}
              </button>
            )
          }}
        </ModalContext.Consumer>
      )
    } 
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
