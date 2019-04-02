import React from 'react'
import PropTypes from 'prop-types'
import { setMapFilterDate } from 'Store/AppState/actions'

import { getRequestType, getManyRequestTypes, getRequestByConstant } from 'Store/AppState/selectors'

import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import { setAppState } from 'Store/AppState/actions'
import DistrictDashboardShow from 'DistrictDashboard/DistrictDashboardShow'
import InnerLoader from 'shared/components/Loaders/InnerLoader'

class DistrictDashboardRequestsWrapper extends React.PureComponent {
  constructor(props) {
    super(props)
    this.toggleDateRange = this.toggleDateRange.bind(this)

    this.loadRequests = this.loadRequests.bind(this)
    this.getInitialRequest = this.getInitialRequest.bind(this)
    this.getInitialResultsFilter = this.getInitialResultsFilter.bind(this)
    this.switchSelectedRequest = this.switchSelectedRequest.bind(this)
  }

  componentDidMount() {
    if (this.props.requests.length) {
      this.loadRequests(this.props.requests)
    }
  }

  componentDidUpdate() {
    const uncalledRequests = this.props.requests.filter(r => !r.called)
    if (uncalledRequests.length) {
      this.loadRequests(uncalledRequests)
    }
  }

  getInitialRequest() {
    return getRequestType(this.props.requests, 'ADVANCED_SEARCH').length
      ? getRequestType(this.props.requests, 'ADVANCED_SEARCH')[0]
      : getRequestType(this.props.requests, 'MAP_FILTER')[0]
  }

  getInitialResultsFilter() {
    return Object.values(this.props.config.resourceModels)
      .find(model => model.resourceConstant === 'PROPERTY')
      .ownResultFilters.find(orf => orf.id === 'HOUSING_TYPE_RESIDENTIAL')
  }

  loadRequests(requests = []) {
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })

    this.props.dispatch(
      setAppState({
        selectedRequest:
          this.props.appState.selectedRequest === 'ADVANCED_SEARCH' ||
          this.props.appState.selectedRequest === 'GEOGRAPHY_HOUSING_TYPE' ||
          this.props.appState.switchSelectedRequest === 'MAP_FILTER'
            ? this.props.appState.selectedRequest
            : this.getInitialRequest(),
        selectedResultsFilter: this.props.appState.selectedResultsFilter || this.getInitialResultsFilter(),
      })
    )
  }

  toggleDateRange(value) {
    this.props.dispatch(setMapFilterDate(value))

    const mapRequests = getRequestType(this.props.requests, 'MAP_FILTER')
    if (!mapRequests.length) return
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

  switchSelectedRequest(request, filter) {
    this.props.dispatch(
      setAppState({
        selectedRequest: request,
        selectedResultsFilter: filter,
      })
    )
  }

  render() {
    return this.props.requests.length ? (
      <DistrictDashboardShow
        geographyRequests={getManyRequestTypes(this.props.requests, ['MAP_FILTER', 'ADVANCED_SEARCH'])}
        housingTypeRequests={getRequestType(this.props.requests, 'GEOGRAPHY_HOUSING_TYPE')}
        propertySummaryRequest={getRequestByConstant(this.props.requests, 'GEOGRAPHY_HOUSING_TYPE_ALL')[0]}
        toggleDateRange={this.toggleDateRange}
        selectedRequest={this.props.appState.selectedRequest}
        switchSelectedRequest={this.switchSelectedRequest}
        selectedResultsFilter={this.props.appState.selectedResultsFilter}
        {...this.props}
      />
    ) : (
      <InnerLoader />
    )
  }
}

DistrictDashboardRequestsWrapper.propTypes = {
  appState: PropTypes.object,
  mapFilterDate: PropTypes.string,
  requests: PropTypes.array,
}

export default DistrictDashboardRequestsWrapper
