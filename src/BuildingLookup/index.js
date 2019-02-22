import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMatchSelector } from 'connected-react-router'
import * as a from 'Store/Building/actions'
import * as c from 'Store/Building/constants'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { resourceRouteChanged } from 'shared/utilities/routeUtils'
import { getBuildingResource } from 'Store/Building/actions'
import Layout from 'Layout'
import LeafletMap from 'LeafletMap'
import BuildingSearchModule from '../BuildingSearchModule'
import { Row, Col, Jumbotron } from 'react-bootstrap'
import RecordsFetchModule from 'shared/components/RecordsFetchModule'
import BuildingHistoryTable from 'BuildingLookup/BuildingHistoryTable'

class BuildingLookup extends React.Component {
  constructor(props) {
    super(props)

    this.fetchBuildingById = this.fetchBuildingById.bind(this)

    if (props.id && !props.loading) {
      this.fetchBuildingById(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id && !nextProps.loading) {
      this.fetchBuildingById(nextProps)
    }
  }

  fetchBuildingById(props) {
    if (!(props.building || {}).currentBuilding || resourceRouteChanged(this.props, props)) {
      props.dispatch(requestWithAuth(a.getBuilding(props.id)))
    }
  }

  render() {
    return (
      <Layout>
        <h1>Building Lookup</h1>

        <Row>
          <Col sm={12} md={5}>
            <BuildingSearchModule />
            <LeafletMap />
          </Col>
          <Col sm={12} md={7}>
            <h2>Building Info</h2>
            <Jumbotron style={{ maxHeight: '500px' }}>
              {this.props.loading ? <div>Loading</div> : JSON.stringify(this.props.building.currentBuilding, null, 2)}
            </Jumbotron>
            <h2>Building History</h2>
            <RecordsFetchModule
              id={this.props.id}
              recordsConstant="GET_BUILDING_HPD_VIOLATIONS"
              recordsFetch={getBuildingResource}
              reducerPath="building.GET_BUILDING_HPD_VIOLATIONS"
              render={(title, records) => <BuildingHistoryTable title={title} records={records} />}
              title="HPD Violations"
            />
            <RecordsFetchModule
              id={this.props.id}
              recordsConstant="GET_BUILDING_DOB_VIOLATIONS"
              recordsFetch={getBuildingResource}
              reducerPath="building.GET_BUILDING_DOB_VIOLATIONS"
              render={(title, records) => <BuildingHistoryTable title={title} records={records} />}
              title="DOB Violations"
            />
          </Col>
        </Row>
      </Layout>
    )
  }
}

BuildingLookup.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.string,
}

const loadingSelector = createLoadingSelector([c.GET_BUILDING])
const errorSelector = createErrorSelector([c.GET_BUILDING])

const mapStateToProps = state => {
  const matchSelector = createMatchSelector({ path: '/buildings/:id' })
  const match = matchSelector(state)

  return {
    id: match ? match.params.id : null,
    building: state.building,
    loading: loadingSelector(state),
    error: errorSelector(state),
  }
}

export default connect(mapStateToProps)(BuildingLookup)
