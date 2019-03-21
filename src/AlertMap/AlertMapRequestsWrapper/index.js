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
    if (props.requests.length) {
      this.loadRequests(props.requests)
    }
  }

  componentDidUpdate() {
    const uncalledRequests = this.props.requests.filter(r => !r.called)
    if (uncalledRequests.length) {
      this.loadRequests(uncalledRequests)
    }
  }

  loadRequests(requests = []) {
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })
  }

  toggleDateRange(value) {
    this.props.dispatch(setMapFilterDate(value))

    const mapRequests = getRequestType(this.props.requests, 'MAP_FILTER')
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

  render() {
    return this.props.requests.length ? (
      <AlertMapShow
        toggleDateRange={this.toggleDateRange}
        {...this.props}
        cancelChangeGeography={this.props.cancelChangeGeography}
        handleChangeGeography={this.props.handleChangeGeography}
        handleChangeGeographyType={this.props.handleChangeGeographyType}
        handleChangeGeographyId={this.props.handleChangeGeographyId}
        selectedGeoJsonId={this.props.selectedGeoJsonId}
        changingGeography={this.props.changingGeography}
        changingGeographyType={this.props.changingGeographyType}
        changingGeographyId={this.props.changingGeographyId}
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
