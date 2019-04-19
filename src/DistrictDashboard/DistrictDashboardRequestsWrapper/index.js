import React from 'react'
import PropTypes from 'prop-types'
import { setAppState, setMapFilterDate } from 'Store/AppState/actions'

import {
  getDefaultRequest,
  getRequestType,
  getManyRequestTypes,
  getDefaultResultsFilter,
  getRequestByConstant,
} from 'Store/AppState/selectors'

import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import DistrictDashboardShow from 'DistrictDashboard/DistrictDashboardShow'
import InnerLoader from 'shared/components/Loaders/InnerLoader'

class DistrictDashboardRequestsWrapper extends React.PureComponent {
  constructor(props) {
    super(props)
    this.toggleDateRange = this.toggleDateRange.bind(this)

    this.loadRequests = this.loadRequests.bind(this)
    this.getInitialRequest = this.getInitialRequest.bind(this)
    this.switchSelectedFilter = this.switchSelectedFilter.bind(this)
  }

  componentDidMount() {
    if (this.props.mapRequests.length) {
      this.loadRequests(this.props.mapRequests)
    }
  }

  componentDidUpdate() {
    const uncalledRequests = this.props.mapRequests.filter(r => !r.called)
    if (uncalledRequests.length) {
      this.loadRequests(uncalledRequests)
    }
  }

  getInitialRequest() {
    return getRequestType(this.props.mapRequests, 'ADVANCED_SEARCH').length
      ? getRequestType(this.props.mapRequests, 'ADVANCED_SEARCH')[0]
      : getDefaultRequest(this.props.mapRequests)
  }

  loadRequests(requests = []) {
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })

    const request =
      this.props.appState.selectedRequests.find(request => request.type === 'ADVANCED_SEARCH') ||
      this.props.appState.selectedRequests.find(request => request.type === 'GEOGRAPHY_HOUSING_TYPE') ||
      this.props.appState.selectedRequests.find(request => request.type === 'MAP_FILTER')
        ? this.props.appState.selectedRequests[0]
        : this.getInitialRequest()
    this.props.dispatch(
      setAppState({
        selectedRequests: [request],
        selectedResultsFilter:
          this.props.appState.selectedResultsFilter || request.type === 'ADVANCED_SEARCH'
            ? undefined
            : getDefaultResultsFilter(this.props.config.resourceModels['PROPERTY']),
      })
    )
  }

  toggleDateRange(value) {
    this.props.dispatch(setMapFilterDate(value))

    const mapRequests = getRequestType(this.props.mapRequests, 'MAP_FILTER')
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

  switchSelectedFilter(filter) {
    this.props.dispatch(
      setAppState({
        selectedResultsFilter: filter,
      })
    )
  }

  render() {
    return this.props.mapRequests.length ? (
      <DistrictDashboardShow
        geographyRequests={getManyRequestTypes(this.props.mapRequests, ['MAP_FILTER', 'ADVANCED_SEARCH'])}
        housingTypeRequests={getRequestType(this.props.mapRequests, 'GEOGRAPHY_HOUSING_TYPE')}
        propertySummaryRequest={getRequestByConstant(this.props.mapRequests, 'GEOGRAPHY_HOUSING_TYPE_ALL')[0]}
        toggleDateRange={this.toggleDateRange}
        selectedRequest={this.props.appState.selectedRequest}
        switchSelectedFilter={this.switchSelectedFilter}
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
  config: PropTypes.object,
  mapFilterDate: PropTypes.string,
  requests: PropTypes.array,
}

export default DistrictDashboardRequestsWrapper
