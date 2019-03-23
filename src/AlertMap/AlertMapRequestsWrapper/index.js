import React from 'react'
import PropTypes from 'prop-types'
import { setMapFilterDate } from 'Store/AppState/actions'

import { getRequestType } from 'Store/AppState/selectors'

import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'

import AlertMapShow from 'AlertMap/AlertMapShow'
import InnerLoader from 'shared/components/InnerLoader'

class AlertMapRequestsWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDateRange = this.toggleDateRange.bind(this)

    this.loadRequests = this.loadRequests.bind(this)
    this.switchSelectedRequest = this.switchSelectedRequest.bind(this)
    this.state = {
      selectedRequest: this.getInitialRequest(),
    }
  }

  componentDidMount() {
    if (this.props.appState.requests.length) {
      this.loadRequests(this.props.appState.requests)
    }
  }

  componentDidUpdate() {
    const uncalledRequests = this.props.appState.requests.filter(r => !r.called)
    if (uncalledRequests.length) {
      this.loadRequests(uncalledRequests)
    }
  }

  getInitialRequest() {
    return getRequestType(this.props.appState.requests, 'ADVANCED_SEARCH').length
      ? getRequestType(this.props.appState.requests, 'ADVANCED_SEARCH')[0]
      : getRequestType(this.props.appState.requests, 'MAP_FILTER')[0]
  }

  loadRequests(requests = []) {
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })

    this.setState({
      selectedRequest: this.getInitialRequest(),
    })
  }

  toggleDateRange(value) {
    this.props.dispatch(setMapFilterDate(value))

    const mapRequests = getRequestType(this.props.appState.requests, 'MAP_FILTER')
    mapRequests.forEach(request => {
      request.called = false
      request.paramMaps
        .filter(p => p.type === 'DATE')
        .forEach(paramMap => {
          paramMap.value = value
        })
    })

    this.loadRequests(mapRequests)
  }

  switchSelectedRequest(request) {
    this.setState({
      selectedRequest: request,
    })
  }

  render() {
    return this.props.appState.requests.length ? (
      <AlertMapShow
        toggleDateRange={this.toggleDateRange}
        selectedRequest={this.state.selectedRequest}
        switchSelectedRequest={this.switchSelectedRequest}
        {...this.props}
      />
    ) : (
      <InnerLoader />
    )
  }
}

AlertMapRequestsWrapper.propTypes = {
  mapFilterDate: PropTypes.string,
  requests: PropTypes.array,
}

export default AlertMapRequestsWrapper
