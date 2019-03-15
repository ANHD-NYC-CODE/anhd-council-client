import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as c from 'Store/Council/constants'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { push, createMatchSelector } from 'connected-react-router'
import GeographySelect from 'shared/components/GeographySelect'

import LeafletMap from 'LeafletMap'
import { Row, Col } from 'react-bootstrap'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { pathToGeographyConstant } from 'shared/utilities/routeUtils'
import { lookupRequests } from 'Store/AppState/selectors'
import RequestWrapper from 'shared/components/RequestWrapper'

class AlertMap extends React.Component {
  constructor(props) {
    super(props)

    if (!props.geographyType) {
      props.dispatch(push('/map'))
    } else if (!props.appState.currentGeographyType && props.geographyType) {
      props.dispatch(
        setGeographyAndRequestsAndRedirect({
          geographyType: pathToGeographyConstant(props.geographyType),
          geographyId: props.geographyId,
        })
      )
    } else {
      return
      // Request geography profile
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.appState.currentGeographyType && nextProps.geographyType) {
      nextProps.dispatch(
        setGeographyAndRequestsAndRedirect({
          geographyType: pathToGeographyConstant(nextProps.geographyType),
          geographyId: nextProps.geographyId,
        })
      )
    } else {
      return
      // Request geography profile
    }
  }

  render() {
    return (
      <Row>
        <Col sm={12} md={4}>
          <LeafletMap />
          <GeographySelect
            confirmChange={true}
            currentGeographyType={this.props.appState.currentGeographyType}
            currentGeographyId={this.props.appState.currentGeographyId}
            dispatch={this.props.dispatch}
          />
        </Col>
        <Col sm={12} md={8}>
          {this.props.mapRequests.map((request, index) => {
            return <RequestWrapper key={`map-request-wrapper-${index}`} request={request} />
          })}
        </Col>
      </Row>
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
    districts: state.council.districts,
    district: state.council.district,
    districtHousing: state.council.districtHousing,
    loading: loadingSelector(state),
    error: errorSelector(state),
    geographyId: match ? match.params.id : null,
    geographyType: path,
    router: state.router,
    mapRequests: lookupRequests(state, 'MAP_FILTER'),
  }
}

export default connect(mapStateToProps)(AlertMap)
