import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import * as c from 'Store/Building/constants'
import { lookupRequests } from 'Store/AppState/selectors'
import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'
import { makeRequest } from 'Store/Request/actions'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'

import { Row, Col } from 'react-bootstrap'
import { requestWithAuth } from 'shared/utilities/authUtils'

import RequestWrapper from 'shared/components/RequestWrapper'

import RequestSummary from 'shared/components/RequestSummary'

class Lookup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRequestIndex: props.requests.length ? 0 : undefined,
    }

    this.switchTable = this.switchTable.bind(this)
    this.loadRequests = this.loadRequests.bind(this)
    if (!props.bbl) {
      props.dispatch(push('/lookup'))
    } else if ((!props.appState.currentProperty && props.bbl) || props.appState.currentProperty !== props.bbl) {
      props.dispatch(setLookupAndRequestsAndRedirect({ bbl: props.bbl, bin: props.bin, replaceHistory: true }))
    } else if (props.requests) {
      this.loadRequests(props)
      props.dispatch(makeRequest(props.profileRequest))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.appState.currentProperty && nextProps.bbl) {
      nextProps.dispatch(
        setLookupAndRequestsAndRedirect({ bbl: nextProps.bbl, bin: nextProps.bin, replaceHistory: true })
      )
    } else if (nextProps.requests) {
      this.loadRequests(nextProps)
      nextProps.dispatch(makeRequest(nextProps.profileRequest))
    }
  }

  loadRequests(props) {
    props.requests.forEach(request => {
      this.props.dispatch(requestWithAuth(makeRequest(request)))
    })

    if (!this.state.selectedRequestIndex) {
      this.setState({
        selectedRequestIndex: 0,
      })
    }
  }

  switchTable(e, index) {
    this.setState({
      selectedRequestIndex: index,
    })
  }

  render() {
    return (
      <Row>
        <Col xs={12} lg={4}>
          <AddressSearch />
          {this.props.profileRequest && <RequestWrapper request={this.props.profileRequest} visible={true} />}
          <LeafletMap />
        </Col>
        <Col xs={12} lg={8}>
          <Row>
            <Col xs={12} lg={3}>
              <Row>
                {this.props.requests.map((request, index) => {
                  return (
                    <Col xs={12} sm={6} md={4} lg={12} key={`request-summary-${index}`}>
                      <RequestSummary request={request} onClick={e => this.switchTable(e, index)} />
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col xs={12} lg={9}>
              <Row>
                {this.props.requests.map((request, index) => {
                  return (
                    <Col xs={12} key={`request-wrapper-${index}`}>
                      <RequestWrapper visible={this.state.selectedRequestIndex === index} request={request} />
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
    bin: match ? match.params.bin : null,
    bbl: match ? match.params.bbl : null,
    building: state.building,
    loading: loadingSelector(state),
    error: errorSelector(state),
    requests: lookupRequests(state, 'LOOKUP_FILTER'),
    profileRequest: lookupRequests(state, 'LOOKUP_PROFILE')[0],
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(Lookup)
