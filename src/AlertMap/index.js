import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as c from 'Store/Council/constants'
import moment from 'moment'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { push, createMatchSelector } from 'connected-react-router'
import { setMapFilterDate, setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { pathToGeographyConstant } from 'shared/utilities/routeUtils'
import { getRequestType, getManyRequestTypes } from 'Store/AppState/selectors'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'

import GeographySelect from 'shared/components/GeographySelect'
import { Card, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import LeafletMap from 'LeafletMap'
import RequestWrapper from 'shared/components/RequestWrapper'
import RequestSummary from 'shared/components/RequestSummary'
import SummaryResultCard from 'shared/components/SummaryResultCard'
import HousingTypeSummaryResultCard from 'AlertMap/HousingTypeSummaryResultCard'

import GeographyProfile from 'AlertMap/GeographyProfile'
import { alertMapFilterdates } from 'shared/utilities/componentUtils'
class AlertMap extends React.Component {
  constructor(props) {
    super(props)
    this.loadRequests = this.loadRequests.bind(this)
    this.switchTable = this.switchTable.bind(this)
    this.toggleView = this.toggleView.bind(this)
    this.toggleDateRange = this.toggleDateRange.bind(this)
    this.changeGeographyAndId = this.changeGeographyAndId.bind(this)
    this.state = {
      view: 1,
      selectedRequest: props.requests.length ? getRequestType(this.props.requests, 'MAP_FILTER')[0] : undefined,
    }

    if (!props.geographyType) {
      props.dispatch(push('/map'))
    } else if (
      props.appState.currentGeographyType !== props.geographyType ||
      props.appState.currentGeographyId !== props.geographyId
    ) {
      props.dispatch(
        setGeographyAndRequestsAndRedirect({
          geographyType: pathToGeographyConstant(props.geographyType),
          geographyId: props.geographyId,
          replaceHistory: true,
        })
      )
    } else if (props.requests) {
      this.loadRequests(props.requests)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.appState.currentGeographyType !== nextProps.geographyType ||
      nextProps.appState.currentGeographyId !== nextProps.geographyId
    ) {
      nextProps.dispatch(
        setGeographyAndRequestsAndRedirect({
          geographyType: pathToGeographyConstant(nextProps.geographyType),
          geographyId: nextProps.geographyId,
          replaceHistory: true,
        })
      )
    } else if (nextProps.requests) {
      this.loadRequests(nextProps.requests)
    }
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

  toggleView(value) {
    this.setState({
      view: value,
    })
  }

  loadRequests(requests = []) {
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })

    this.setState({
      selectedRequest: getRequestType(requests, ['MAP_FILTER'])[0],
    })
  }

  switchTable(request) {
    this.setState({
      selectedRequest: request,
    })
  }

  changeGeographyAndId(type, value) {
    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: type,
        geographyId: value,
      })
    )
  }

  render() {
    const geographyRequests = getManyRequestTypes(this.props.requests, ['MAP_FILTER', 'ADVANCED_SEARCH'])

    const housingTypeRequests = getRequestType(this.props.requests, 'GEOGRAPHY_HOUSING_TYPE')
    return (
      <div>
        <Row>
          <GeographySelect
            confirmChange={true}
            currentGeographyType={this.props.appState.currentGeographyType}
            currentGeographyId={this.props.appState.currentGeographyId}
            dispatch={this.props.dispatch}
            onChange={this.changeGeographyAndId}
          />
        </Row>
        <Row>
          <Col xs={12} sm={6} md={4}>
            {!!this.props.requests.length && (
              <ToggleButtonGroup
                name="dateRange"
                type="radio"
                value={this.props.appState.mapFilterDate}
                onChange={this.toggleDateRange}
              >
                <ToggleButton value={alertMapFilterdates()[2]}>{`Past 3 Years (${moment(
                  alertMapFilterdates()[2]
                ).format('YYYY')})`}</ToggleButton>
                <ToggleButton value={alertMapFilterdates()[1]}>{`Past Year (${moment(alertMapFilterdates()[1]).format(
                  'YYYY'
                )})`}</ToggleButton>
                <ToggleButton value={alertMapFilterdates()[0]}>{`Past Month (${moment(alertMapFilterdates()[0]).format(
                  'MM/YYYY'
                )})`}</ToggleButton>
              </ToggleButtonGroup>
            )}
          </Col>
          <Col xs={12} sm={6} md={8}>
            <Row>
              {geographyRequests.map((request, index) => {
                return (
                  <Col xs={12} sm={6} lg={4} key={`request-summary-${index}`}>
                    <RequestSummary
                      request={request}
                      onClick={r => this.switchTable(r)}
                      resultsComponent={SummaryResultCard}
                    />
                  </Col>
                )
              })}
              {!!this.props.requests.length && !geographyRequests.some(r => r.type === 'ADVANCED_SEARCH') && (
                <Col xs={12} sm={6} lg={4}>
                  <Card>
                    <Card.Body>
                      <BaseLink href="/search" text="+ Add Custom Filter" />
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={3}>
            {housingTypeRequests.map((request, index) => {
              return (
                <Col xs={12} sm={6} lg={4} key={`request-summary-${index}`}>
                  <RequestSummary
                    request={request}
                    onClick={r => this.switchTable(r)}
                    resultsComponent={HousingTypeSummaryResultCard}
                  />
                </Col>
              )
            })}
          </Col>
          <Col xs={12} lg={6}>
            {!!this.props.requests.length && (
              <ToggleButtonGroup name="view" type="radio" value={this.state.view} onChange={this.toggleView}>
                <ToggleButton value={1}>Map View</ToggleButton>
                <ToggleButton value={2}>Table View</ToggleButton>
              </ToggleButtonGroup>
            )}
            {this.state.view === 1 ? (
              <LeafletMap />
            ) : (
              this.props.requests.map((request, index) => {
                return (
                  <RequestWrapper
                    key={`request-wrapper-${index}`}
                    visible={this.state.selectedRequest === request}
                    request={request}
                  />
                )
              })
            )}
          </Col>
          <Col sm={12} lg={3}>
            <GeographyProfile
              geographyType={this.props.appState.currentGeographyType}
              geographyId={this.props.appState.currentGeographyId}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

AlertMap.propTypes = {
  dispatch: PropTypes.func,
}

const loadingSelector = createLoadingSelector([c.GET_COUNCILS])
const errorSelector = createErrorSelector([c.GET_COUNCILS])

const mapStateToProps = state => {
  const pathMatch = state.router.location.pathname.match(/(council|community)/)
  const path = pathMatch ? pathMatch[0] : undefined
  const matchSelector = createMatchSelector({
    path: `/${path}/:id`,
  })
  const match = matchSelector(state)
  return {
    appState: state.appState,
    loading: loadingSelector(state),
    error: errorSelector(state),
    geographyId: match ? match.params.id : undefined,
    geographyType: path ? path.toUpperCase() : undefined,
    router: state.router,
    requests: getManyRequestTypes(state.appState.requests, ['MAP_FILTER', 'ADVANCED_SEARCH', 'GEOGRAPHY_HOUSING_TYPE']),
  }
}

export default connect(mapStateToProps)(AlertMap)
