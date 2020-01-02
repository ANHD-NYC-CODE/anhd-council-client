import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'
import { setAppState } from 'Store/AppState/actions'
import { getDefaultRequest, getRequestType, getManyRequestTypes, getRequestByConstant } from 'Store/AppState/selectors'
import { fireMapDateRangeSelectEvent } from 'Store/Analytics/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'
import DistrictDashboardShow from 'DistrictDashboard/DistrictDashboardShow'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
import { fireFilterSelectEvent } from 'Store/Analytics/actions'
import { setHousingTypeResultsIndex, setHousingTypeResultFilter, setMapFilterDate } from 'Store/DashboardState/actions'

class DistrictDashboardRequestsWrapper extends React.PureComponent {
  constructor(props) {
    super(props)
    this.toggleDateRange = this.toggleDateRange.bind(this)

    this.loadRequests = this.loadRequests.bind(this)
    this.getInitialRequest = this.getInitialRequest.bind(this)
    this.switchSelectedFilter = this.switchSelectedFilter.bind(this)
    this.endChangingState = this.endChangingState.bind(this)
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
    return getRequestType(this.props.mapRequests, c.ADVANCED_SEARCH).length
      ? getRequestType(this.props.mapRequests, c.ADVANCED_SEARCH)[0]
      : getDefaultRequest(this.props.mapRequests)
  }

  loadRequests(requests = []) {
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })

    this.props.dispatch(
      setHousingTypeResultFilter(
        this.props.dashboardState.housingTypeResultFilter || this.props.dashboardState.resultFilters[0]
      )
    )
  }

  toggleDateRange(value) {
    this.props.dashboardState.resultFilters
      .filter(rf => rf.category === 'AMOUNT')
      .forEach(rf => {
        rf.annotationStart = value
      })

    this.props.dispatch(fireMapDateRangeSelectEvent(value))
    this.props.dispatch(setMapFilterDate(value))
  }

  endChangingState() {
    this.props.dispatch(
      setAppState({
        changingGeography: false, // end changing state
        changingGeographyType: undefined,
        changingGeographyId: undefined,
      })
    )
  }

  switchSelectedFilter(filter, index) {
    this.endChangingState()
    this.props.dispatch(setHousingTypeResultFilter(filter))
    this.props.dispatch(setHousingTypeResultsIndex(index))
    this.props.dispatch(fireFilterSelectEvent(filter))
  }

  render() {
    return this.props.mapRequests.length ? (
      <DistrictDashboardShow
        endChangingState={this.endChangingState}
        geographyRequests={getManyRequestTypes(this.props.mapRequests, ['MAP_FILTER', c.ADVANCED_SEARCH])}
        housingTypeRequests={getRequestType(this.props.mapRequests, 'GEOGRAPHY_HOUSING_TYPE')}
        propertySummaryRequest={getRequestByConstant(this.props.mapRequests, c.GEOGRAPHY_HOUSING_TYPE_ALL)[0]}
        toggleDateRange={this.toggleDateRange}
        switchSelectedFilter={this.switchSelectedFilter}
        housingTypeResultFilter={this.props.dashboardState.housingTypeResultFilter}
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
  requests: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  totalPropertyResults: PropTypes.array,
}

export default DistrictDashboardRequestsWrapper
