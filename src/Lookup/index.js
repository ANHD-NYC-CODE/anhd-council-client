import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, createMatchSelector } from 'connected-react-router'
import * as a from 'Store/Building/actions'
import * as c from 'Store/Building/constants'
import * as d from 'shared/constants/datasets'
import { lookupRequests } from 'Store/AppState/selectors'
import { setLookupAndRequestsAndRedirect, makeDataRequest } from 'Store/AppState/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { getBuildingResource } from 'Store/Building/actions'
import { constructActionKey } from 'shared/utilities/actionUtils'
import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'
import { Row, Col, Jumbotron } from 'react-bootstrap'
import RecordsFetchModule from 'shared/components/RecordsFetchModule'
import BuildingHistoryTable from 'Lookup/BuildingHistoryTable'

class Lookup extends React.Component {
  constructor(props) {
    super(props)

    console.log(props.bbl, props.appState.currentProperty)
    if (!props.bbl) {
      props.dispatch(push('/lookup'))
    } else if (!props.appState.currentProperty && props.bbl) {
      props.dispatch(setLookupAndRequestsAndRedirect({ bbl: props.bbl, bin: props.bin }))
    } else {
      props.dispatch(makeDataRequest(props.propertyProfileRequest))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.appState.currentProperty && nextProps.bbl) {
      nextProps.dispatch(setLookupAndRequestsAndRedirect({ bbl: nextProps.bbl, bin: nextProps.bin }))
    } else {
      nextProps.dispatch(makeDataRequest(nextProps.propertyProfileRequest))
    }
  }

  render() {
    return (
      <Row>
        <h1>Building Lookup</h1>
        <Col sm={12} md={5}>
          <AddressSearch />
          <LeafletMap />
        </Col>
        <Col sm={12} md={7}>
          {this.props.bin && (
            <div>
              <h2>Building Info</h2>
              <Jumbotron style={{ maxHeight: '500px' }}>
                {this.props.loading ? <div>Loading</div> : JSON.stringify(this.props.building.currentBuilding, null, 2)}
              </Jumbotron>
              <h2>Building History</h2>
              <RecordsFetchModule
                actionKey={constructActionKey([c.GET_BUILDING_RESOURCE, d.HPDVIOLATIONS.constant])}
                id={this.props.bin}
                dataset={d.HPDVIOLATIONS}
                recordsFetch={getBuildingResource}
                reducerPath="building"
                render={(title, records, loading, error) => (
                  <BuildingHistoryTable loading={loading} error={error} title={title} records={records} />
                )}
                title="HPD Violations"
              />
              <RecordsFetchModule
                actionKey={constructActionKey([c.GET_BUILDING_RESOURCE, d.DOBVIOLATIONS.constant])}
                id={this.props.bin}
                dataset={d.DOBVIOLATIONS}
                recordsFetch={getBuildingResource}
                reducerPath="building"
                render={(title, records, loading, error) => (
                  <BuildingHistoryTable loading={loading} error={error} title={title} records={records} />
                )}
                title="DOB Violations"
              />
            </div>
          )}
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
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(Lookup)
