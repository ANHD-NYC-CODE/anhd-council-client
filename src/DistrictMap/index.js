import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as a from 'Store/Council/actions'
import * as c from 'Store/Council/constants'

import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import { createMatchSelector } from 'connected-react-router'
import { resourceRouteChanged } from 'shared/utilities/routeUtils'

import { push } from 'connected-react-router'

import Layout from 'Layout'
import LeafletMap from 'LeafletMap'
import Select from 'react-select'
import { Row, Col, Form } from 'react-bootstrap'

import DistrictMapShow from 'DistrictMap/Show'

class DistrictMap extends React.Component {
  constructor(props) {
    super(props)

    this.fetchCouncils = this.fetchCouncils.bind(this)
    this.fetchCouncilById = this.fetchCouncilById.bind(this)
    this.handleDistrictChange = this.handleDistrictChange.bind(this)
    this.syncToStore = this.syncToStore.bind(this)

    this.fetchCouncils(props)
    this.fetchCouncilById(props)
    this.syncToStore(props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCouncils(nextProps)
    this.fetchCouncilById(nextProps)
    this.syncToStore(nextProps)
  }

  fetchCouncils(props) {
    if (!props.loading && !((props.districts || {}).length || props.error)) {
      this.props.dispatch(a.getCouncils())
    }
  }

  syncToStore(props) {
    if (!props.id && props.district) {
      this.handleDistrictChange({ value: props.district.coundist })
    }
  }

  fetchCouncilById(props) {
    if (!!props.id && (!(props.district || props.error) || resourceRouteChanged(this.props, props))) {
      this.props.dispatch(a.getCouncil(props.id))
    }
  }

  handleDistrictChange(district) {
    this.props.dispatch(push(`/districts/${district.value}`))
  }

  render() {
    const options = this.props.districts
      ? this.props.districts.map(council => ({ value: council.coundist, label: `District ${council.coundist}` }))
      : []
    return (
      <Layout>
        <Row>
          <Col sm={12} md={4}>
            <h1>District Map</h1>
            <LeafletMap />
            <Form.Group>
              <Form.Label>Select your district</Form.Label>
              <Select options={options} onChange={this.handleDistrictChange} />
            </Form.Group>
          </Col>
          <Col sm={12} md={8}>
            <div style={{ maxHeight: '400px', overflow: 'scroll' }}>{JSON.stringify(this.props.district, null, 2)}</div>

            {this.props.id && <DistrictMapShow id={this.props.id} />}
          </Col>
        </Row>
      </Layout>
    )
  }
}

DistrictMap.propTypes = {
  dispatch: PropTypes.func,
}

const loadingSelector = createLoadingSelector([c.GET_COUNCILS])
const errorSelector = createErrorSelector([c.GET_COUNCILS])

const mapStateToProps = state => {
  const matchSelector = createMatchSelector({ path: '/districts/:id' })
  const match = matchSelector(state)

  return {
    districts: state.council.districts,
    district: state.council.district,
    districtHousing: state.council.districtHousing,
    loading: loadingSelector(state),
    error: errorSelector(state),
    id: match ? match.params.id : null,
  }
}

export default connect(mapStateToProps)(DistrictMap)
