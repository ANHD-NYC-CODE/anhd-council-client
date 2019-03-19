import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import * as c from 'Store/Building/constants'
import { getRequestType, getManyRequestTypes } from 'Store/AppState/selectors'
import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'
import { makeRequest } from 'Store/Request/actions'
import SummaryResultCard from 'shared/components/SummaryResultCard'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'

import { Row, Col } from 'react-bootstrap'
import { requestWithAuth } from 'shared/utilities/authUtils'

import RequestWrapper from 'shared/components/RequestWrapper'
import BuildingSelect from 'Lookup/BuildingSelect'
import RequestSummary from 'shared/components/RequestSummary'
import LookupLinks from 'Lookup/LookupLinks'
class Lookup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRequest: props.requests.length ? getRequestType(props.requests, 'LOOKUP_FILTER')[0] : undefined,
    }

    this.switchTable = this.switchTable.bind(this)
    this.loadRequests = this.loadRequests.bind(this)
    if (!props.bbl) {
      props.dispatch(push('/lookup'))
    } else if ((!props.appState.currentProperty && props.bbl) || props.appState.currentProperty !== props.bbl) {
      props.dispatch(setLookupAndRequestsAndRedirect({ bbl: props.bbl, bin: props.bin, replaceHistory: true }))
    } else if ((!props.appState.currentBuilding && props.bin) || props.appState.currentBuilding !== props.bin) {
      props.dispatch(setLookupAndRequestsAndRedirect({ bbl: props.bbl, replaceHistory: true }))
    } else if (props.requests) {
      this.loadRequests(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.appState.currentProperty && nextProps.bbl) {
      nextProps.dispatch(
        setLookupAndRequestsAndRedirect({ bbl: nextProps.bbl, bin: nextProps.bin, replaceHistory: true })
      )
    } else if (
      (!nextProps.appState.currentBuilding && nextProps.bin) ||
      nextProps.appState.currentBuilding !== nextProps.bin
    ) {
      nextProps.dispatch(setLookupAndRequestsAndRedirect({ bbl: nextProps.bbl, replaceHistory: true }))
    } else if (nextProps.requests) {
      this.loadRequests(nextProps)
    }
  }

  loadRequests(props) {
    props.requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })

    this.setState({
      selectedRequest: getRequestType(props.requests, 'LOOKUP_FILTER')[0],
    })
  }

  switchTable(request) {
    this.setState({
      selectedRequest: request,
    })
  }

  render() {
    return (
      <Row>
        <Col xs={12} lg={4}>
          <Row>
            <Col>
              <AddressSearch />
            </Col>
          </Row>
          <Row>
            <Col>
              {getRequestType(this.props.requests, 'LOOKUP_PROFILE').length && (
                <RequestWrapper request={getRequestType(this.props.requests, 'LOOKUP_PROFILE')[0]} visible={true} />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <LeafletMap />
            </Col>
          </Row>
          <Row>
            <Col>
              {getRequestType(this.props.requests, 'LOOKUP_PROFILE').length && (
                <LookupLinks request={getRequestType(this.props.requests, 'LOOKUP_PROFILE')[0]} />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={8}>
          <Row>
            <Col xs={12} lg={3}>
              <Row>
                {getRequestType(this.props.requests, 'LOOKUP_FILTER').map((request, index) => {
                  return (
                    <Col xs={12} sm={6} md={4} lg={12} key={`request-summary-${index}`}>
                      <RequestSummary
                        request={request}
                        onClick={r => this.switchTable(r)}
                        resultsComponent={SummaryResultCard}
                      />
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col xs={12} lg={9}>
              <Row>
                <Col>
                  {getRequestType(this.props.requests, 'LOOKUP_PROFILE').length && (
                    <BuildingSelect
                      dispatch={this.props.dispatch}
                      request={getRequestType(this.props.requests, 'LOOKUP_PROFILE')[0]}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                {getRequestType(this.props.requests, 'LOOKUP_FILTER').map((request, index) => {
                  return (
                    <Col xs={12} key={`request-wrapper-${index}`}>
                      <RequestWrapper visible={this.state.selectedRequest === request} request={request} />
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

Lookup.propTypes = {
  dispatch: PropTypes.func,
  bin: PropTypes.string,
}

const loadingSelector = createLoadingSelector([c.GET_BUILDING])
const errorSelector = createErrorSelector([c.GET_BUILDING])

const mapStateToProps = state => {
  const propertyMatchSelector = createMatchSelector({ path: '/property/:bbl' })
  const propertyBuildingMatchSelector = createMatchSelector({ path: '/property/:bbl/building/:bin' })
  const match = propertyBuildingMatchSelector(state) || propertyMatchSelector(state)
  return {
    bin: match ? match.params.bin : undefined,
    bbl: match ? match.params.bbl : undefined,
    building: state.building,
    loading: loadingSelector(state),
    error: errorSelector(state),
    requests: getManyRequestTypes(state.appState.requests, ['LOOKUP_FILTER', 'LOOKUP_PROFILE']),
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(Lookup)
