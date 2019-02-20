import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'Layout'

class BuildingLookup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <h1>Building Lookup</h1>
      </Layout>
    )
  }
}

BuildingLookup.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    store: state,
  }
}

export default connect(mapStateToProps)(BuildingLookup)
