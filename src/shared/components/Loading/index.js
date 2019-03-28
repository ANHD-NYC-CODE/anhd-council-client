import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingReducerSelector } from 'Store/Loading/selectors'
import { ProgressBar } from 'react-bootstrap'
import NavigationBar from 'Layout/NavigationBar'
import InnerLoader from 'shared/components/InnerLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import logo from 'shared/images/portallogo.png'

import classnames from 'classnames'
import './style.scss'
class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.createLoadingSelectors = this.createLoadingSelectors.bind(this)

    this.unLoadLoadingSelectors = this.unLoadLoadingSelectors.bind(this)

    this.lengthCompleted = this.lengthCompleted.bind(this)

    this.createLoadingSelectors(props)
  }

  componentWillUnmount() {
    this.unLoadLoadingSelectors(this.props)
  }

  createLoadingSelectors(props) {
    props.monitoredRequests.forEach(request => {
      this[request] = createLoadingReducerSelector([request])
    })
  }

  unLoadLoadingSelectors(props) {
    props.monitoredRequests.forEach(request => {
      this[request] = null
    })
  }

  lengthCompleted(props) {
    return props.monitoredRequests
      .map(request => {
        return !this[request](props.loadingReducer)
      })
      .filter(p => p).length
  }

  render() {
    return (
      <div className="loading">
        <NavigationBar />
        <div className="loading__wrapper d-flex flex-column align-items-center justify-content-center">
          <InnerLoader
            className={classnames('loading__background', {
              'bg-nyc-blue-lighten-10': this.lengthCompleted(this.props) === 1,
              'bg-nyc-blue-lighten-15': this.lengthCompleted(this.props) === 2,
              'bg-nyc-blue-lighten-20': this.lengthCompleted(this.props) === 3,
            })}
            height="calc(100vh - 40px)"
          />
          <div className="my-6 loading__requests">
            <div className="loading__logo-container">
              <img
                src={logo}
                className="sub-header__logo d-inline-block align-top mb-2"
                alt="Displacement Alert Portal Logo"
              />
            </div>
            {this.props.monitoredRequests.map((request, index) => {
              return (
                <div key={`loading-request-monitor-${index}`}>
                  {this[request](this.props.loadingReducer) ? (
                    <div className="text-right">
                      <b className="text-white">{request.replace('GET_', '')}:</b>
                      <b className="text-white">
                        {' '}
                        <FontAwesomeIcon icon={faSpinner} />
                      </b>
                    </div>
                  ) : (
                    <div className="text-right">
                      <b className="text-white">{request.replace('GET_', '')}:</b>
                      <b className="text-success">
                        <FontAwesomeIcon icon={faCheck} />
                      </b>
                    </div>
                  )}
                </div>
              )
            })}
            <ProgressBar
              striped
              animated
              active="true"
              variant="success"
              now={(this.lengthCompleted(this.props) / this.props.monitoredRequests.length) * 100}
            />
          </div>
        </div>
      </div>
    )
  }
}

Loading.propTypes = {
  dispatch: PropTypes.func,
  monitoredRequests: PropTypes.array,
}

const mapStateToProps = state => {
  return {
    loadingReducer: state.loading,
  }
}

export default connect(mapStateToProps)(Loading)
