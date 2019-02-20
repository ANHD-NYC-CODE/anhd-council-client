import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCouncils } from 'Store/Council/actions'
import { createLoadingSelector } from 'Store/Loading/selectors'
import { createErrorSelector } from 'Store/Error/selectors'
import * as c from 'Store/Council/constants'

import Layout from 'Layout'
import LeafletMap from 'LeafletMap'
import Select from 'react-select'
import { Row, Col, Form } from 'react-bootstrap'
class DistrictMap extends React.Component {
  constructor(props) {
    super(props)

    this.fetchCouncils = this.fetchCouncils.bind(this)

    this.fetchCouncils(props)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.fetchCouncils(nextProps)
    }
  }

  fetchCouncils(props) {
    if (!((props.districts || {}).length || props.error)) {
      this.props.dispatch(getCouncils())
    }
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
              <Select options={options} />
            </Form.Group>
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
  return {
    districts: state.council.districts,
    loading: loadingSelector(state),
    error: errorSelector(state),
  }
}

export default connect(mapStateToProps)(DistrictMap)
