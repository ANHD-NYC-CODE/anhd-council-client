import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMatchSelector } from 'connected-react-router'
import * as a from 'Store/Building/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import * as c from 'Store/Building/constants'
import Layout from 'Layout'
import LeafletMap from 'LeafletMap'
import BuildingSearchModule from '../BuildingSearchModule'
import { Row, Col, Jumbotron } from 'react-bootstrap'

class BuildingLookup extends React.Component {
  constructor(props) {
    super(props)

    this.getBuildingById = this.getBuildingById.bind(this)

    if (props.id && !props.getBuildingLoading) {
      this.getBuildingById(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id && !nextProps.getBuildingLoading) {
      this.getBuildingById(nextProps)
    }
  }

  getBuildingById(props) {
    if (!(props.building || {}).currentBuilding || props.building.currentBuilding.bin !== props.id) {
      props.dispatch(requestWithAuth(a.getBuilding(props.id)))
      props.dispatch(requestWithAuth(a.getBuildingHpdViolations(props.id)))
    }
  }

  render() {
    return (
      <Layout>
        <h1>Building Lookup</h1>

        <Row>
          <Col sm={12} md={4}>
            <BuildingSearchModule />
            <LeafletMap />
          </Col>
          <Col sm={12} md={8}>
            <h2>Building Info</h2>
            <Jumbotron style={{ maxHeight: '500px' }}>
              {this.props.getBuildingLoading ? (
                <div>Loading</div>
              ) : (
                JSON.stringify(this.props.building.currentBuilding, null, 2)
              )}
            </Jumbotron>
            <h2>Building History</h2>
            <Jumbotron
              style={{ maxHeight: '500px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              <h4>HPD Violations</h4>
              {this.props.getHPDViolationsLoading || !this.props.hpdViolations ? (
                <div>Loading</div>
              ) : (
                <div>
                  <h5>Total: {this.props.hpdViolations.length}</h5>
                  <div>{JSON.stringify(this.props.hpdViolations, null, 2)}</div>
                </div>
              )}
            </Jumbotron>
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

const getBuildingLS = createLoadingSelector([c.GET_BUILDING])
const getBuildingES = createErrorSelector([c.GET_BUILDING])
const getHPDViolationLS = createLoadingSelector([c.GET_BUILDING_HPD_VIOLATIONS])
const getHPDViolationES = createErrorSelector([c.GET_BUILDING_HPD_VIOLATIONS])

const mapStateToProps = state => {
  const matchSelector = createMatchSelector({ path: '/buildings/:id' })
  const match = matchSelector(state)

  return {
    id: match ? match.params.id : null,
    building: state.building,
    hpdViolations: state.building.hpdViolations,
    getBuildingLoading: getBuildingLS(state),
    getBuildingError: getBuildingES(state),
    getHPDViolationLoading: getHPDViolationLS(state),
    getHPDViolationError: getHPDViolationES(state),
  }
}

export default connect(mapStateToProps)(BuildingLookup)
