import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as c from 'Store/Council/constants'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { push, createMatchSelector } from 'connected-react-router'

import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { pathToGeographyConstant } from 'shared/utilities/routeUtils'
import { lookupRequests } from 'Store/AppState/selectors'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { makeRequest } from 'Store/Request/actions'

import GeographySelect from 'shared/components/GeographySelect'
import { Row, Col } from 'react-bootstrap'
import LeafletMap from 'LeafletMap'
import RequestWrapper from 'shared/components/RequestWrapper'
import RequestSummary from 'shared/components/RequestSummary'

class AlertMap extends React.Component {
  constructor(props) {
    super(props)

    this.loadRequests = this.loadRequests.bind(this)
    this.switchTable = this.switchTable.bind(this)

    this.state = {
      selectedRequest: [].concat(props.mapRequests, props.housingTypeRequests).length
        ? [].concat(props.mapRequests, props.housingTypeRequests)[0]
        : undefined,
    }

    if (!props.geographyType) {
      props.dispatch(push('/map'))
    } else if (!props.appState.currentGeographyType && props.geographyType) {
      props.dispatch(
        setGeographyAndRequestsAndRedirect({
          geographyType: pathToGeographyConstant(props.geographyType),
          geographyId: props.geographyId,
          replaceHistory: true,
        })
      )
    } else if (props.mapRequests) {
      this.loadRequests(props)

      // Request geography profile
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.appState.currentGeographyType && nextProps.geographyType) {
      nextProps.dispatch(
        setGeographyAndRequestsAndRedirect({
          geographyType: pathToGeographyConstant(nextProps.geographyType),
          geographyId: nextProps.geographyId,
          replaceHistory: true,
        })
      )
    } else if (nextProps.mapRequests) {
      this.loadRequests(nextProps)

      // Request geography profile
    }
  }

  loadRequests(props) {
    const requests = [].concat(props.mapRequests, props.housingTypeRequests)
    requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })

    if (!this.state.selectedRequest) {
      this.setState({
        selectedRequest: requests[0],
      })
    }
  }

  switchTable(request) {
    this.setState({
      selectedRequest: request,
    })
  }

  render() {
    return (
      <div>
        <Row>
          <GeographySelect
            confirmChange={true}
            currentGeographyType={this.props.appState.currentGeographyType}
            currentGeographyId={this.props.appState.currentGeographyId}
            dispatch={this.props.dispatch}
          />
        </Row>
        <Row>
          <Col xs={12} sm={6} md={4}>
            Request Summary + Editing
          </Col>
          <Col xs={12} sm={6} md={8}>
            <Row>
              {this.props.mapRequests.map((request, index) => {
                return (
                  <Col xs={12} sm={6} lg={4} key={`request-summary-${index}`}>
                    <RequestSummary request={request} onClick={r => this.switchTable(r)} />
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={3}>
            {this.props.housingTypeRequests.map((request, index) => {
              return (
                <Col xs={12} sm={6} lg={4} key={`request-summary-${index}`}>
                  <RequestSummary request={request} onClick={r => this.switchTable(r)} />
                </Col>
              )
            })}
          </Col>
          <Col xs={12} lg={5}>
            {[].concat(this.props.mapRequests, this.props.housingTypeRequests).map((request, index) => {
              return (
                <RequestWrapper
                  key={`request-wrapper-${index}`}
                  visible={this.state.selectedRequest === request}
                  request={request}
                />
              )
            })}
            <LeafletMap />
          </Col>
          <Col sm={12} lg={4}>
            Geography Profile
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
  const path = pathMatch ? pathMatch[0] : null
  const matchSelector = createMatchSelector({
    path: `/${path}/:id`,
  })
  const match = matchSelector(state)
  return {
    appState: state.appState,
    loading: loadingSelector(state),
    error: errorSelector(state),
    geographyId: match ? match.params.id : null,
    geographyType: path,
    router: state.router,
    mapRequests: lookupRequests(state, 'MAP_FILTER'),
    housingTypeRequests: lookupRequests(state, 'GEOGRAPHY_HOUSING_TYPE'),
  }
}

export default connect(mapStateToProps)(AlertMap)
