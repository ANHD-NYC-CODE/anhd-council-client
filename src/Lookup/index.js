import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import * as c from 'Store/Building/constants'
import * as d from 'shared/constants/datasets'
import { lookupRequests } from 'Store/AppState/selectors'
import { setLookupAndRequestsAndRedirect } from 'Store/AppState/actions'
import { makeRequest } from 'Store/Request/actions'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { getBuildingResource } from 'Store/Building/actions'
import { constructActionKey } from 'shared/utilities/actionUtils'
import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'
import { Row, Col, Jumbotron } from 'react-bootstrap'
import RecordsFetchModule from 'shared/components/RecordsFetchModule'
import BuildingHistoryTable from 'Lookup/BuildingHistoryTable'

import RequestWrapper from 'shared/components/RequestWrapper'

class Lookup extends React.Component {
  constructor(props) {
    super(props)

    if (!props.bbl) {
      props.dispatch(push('/lookup'))
    } else if (!props.appState.currentProperty && props.bbl) {
      props.dispatch(setLookupAndRequestsAndRedirect({ bbl: props.bbl, bin: props.bin }))
    } else {
      props.dispatch(makeRequest(props.propertyProfileRequest))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.appState.currentProperty && nextProps.bbl) {
      nextProps.dispatch(setLookupAndRequestsAndRedirect({ bbl: nextProps.bbl, bin: nextProps.bin }))
    } else {
      nextProps.dispatch(makeRequest(nextProps.propertyProfileRequest))
    }
  }

  render() {
    console.log(this.props.lookupRequests)
    return (
      <Row>
        <Col sm={12} md={5}>
          <AddressSearch />
          {!!this.props.propertyProfileRequest && <RequestWrapper request={this.props.propertyProfileRequest} />}
          <LeafletMap />
        </Col>
        <Col sm={12} md={7}>
          {this.props.lookupRequests.map((request, index) => {
            console.log(request)
            return <RequestWrapper key={`lookup-request-wrapper-${index}`} request={request} />
          })}
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
    propertyProfileRequest: lookupRequests(state, 'LOOKUP_PROFILE')[0],
    lookupRequests: lookupRequests(state, 'LOOKUP_FILTER'),
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(Lookup)
