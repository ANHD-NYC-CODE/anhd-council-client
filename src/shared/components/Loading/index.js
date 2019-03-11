import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingReducerSelector } from 'Store/Loading/selectors'
import { ProgressBar } from 'react-bootstrap'
class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.createLoadingSelectors = this.createLoadingSelectors.bind(this)

    this.unLoadLoadingSelectors = this.unLoadLoadingSelectors.bind(this)

    this.lengthCompleted = this.lengthCompleted.bind(this)

    this.createLoadingSelectors(props)
  }

  componentWillUnMountProps(props) {
    this.unLoadLoadingSelectors(props)
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
    console.log(this.lengthCompleted(this.props))
    return (
      <div className="loading">
        <h5>Loading</h5>
        {this.props.monitoredRequests.map((request, index) => {
          return (
            <div key={`loading-request-monitor-${index}`}>
              {this[request](this.props.loadingReducer) ? (
                <div>
                  <b>{request}:</b>
                  <p>Status:</p>
                  <p className="text-debug">Loading... </p>
                  <hr />
                </div>
              ) : (
                <div>
                  <b>{request}:</b>
                  <p>Status:</p>
                  <b className="text-success">Done!</b>
                  <hr />
                </div>
              )}
            </div>
          )
        })}
        <ProgressBar
          striped
          animated
          active
          variant="success"
          now={(this.lengthCompleted(this.props) / this.props.monitoredRequests.length) * 100}
        />
        ;
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
