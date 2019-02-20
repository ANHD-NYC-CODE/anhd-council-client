import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createMatchSelector } from 'connected-react-router'
import { getBuilding } from 'Store/Building/actions'
import { requestWithAuth } from 'shared/utilities/authUtils'
import Layout from 'Layout'
import LeafletMap from 'LeafletMap'
import BuildingSearchModule from '../BuildingSearchModule'
import { Row, Col } from 'react-bootstrap'

class BuildingLookup extends React.Component {
  constructor(props) {
    super(props)

    this.configureForRoute = this.configureForRoute.bind(this)

    this.configureForRoute(props)
  }

  componentWillReceiveProps(nextProps) {
    this.configureForRoute(nextProps)
  }

  configureForRoute(props) {
    if (props.id && (!props.building.currentBuilding || props.building.currentBuilding.bin !== props.id)) {
      props.dispatch(requestWithAuth(getBuilding(props.id)))
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
            <p>{JSON.stringify(this.props.building)}</p>
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

const mapStateToProps = state => {
  const matchSelector = createMatchSelector({ path: '/buildings/:id' })
  const match = matchSelector(state)

  return {
    id: match ? match.params.id : null,
    building: state.building,
  }
}

export default connect(mapStateToProps)(BuildingLookup)
