import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'Layout'

class DistrictMap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <h1>District Map</h1>
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
