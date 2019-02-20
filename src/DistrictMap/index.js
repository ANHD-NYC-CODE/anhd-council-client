import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'Layout'
import LeafletMap from 'LeafletMap'
import Select from 'react-select'
import { Row, Col, Form } from 'react-bootstrap'
class DistrictMap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const options = [1, 2, 3, 4, 5].map(option => ({ value: option, label: `District ${option}` }))
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

const mapStateToProps = state => {
  return {
    store: state,
  }
}

export default connect(mapStateToProps)(DistrictMap)
