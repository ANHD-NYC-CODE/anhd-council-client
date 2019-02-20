import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'Layout'
import LeafletMap from 'LeafletMap'
import SearchModule from '../SearchModule'

class BuildingLookup extends React.Component {
  constructor(props) {
    super(props)

    this.configureForRoute = this.configureForRoute.bind(this)
  }

  configureForRoute(props) {
    console.log(props.path)
  }

  render() {
    return (
      <Layout>
        <h1>Building Lookup</h1>
        <SearchModule />
        <LeafletMap />
      </Layout>
    )
  }
}

BuildingLookup.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    path: state.router.location.pathname,
  }
}

export default connect(mapStateToProps)(BuildingLookup)
