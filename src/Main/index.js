import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LeafletMap from 'LeafletMap'
import Layout from 'Layout'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <LeafletMap />
      </Layout>
    )
  }
}

Main.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func,
  showLoginModal: PropTypes.bool,
  path: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    path: state.router.location.pathname,
  }
}

export default connect(mapStateToProps)(Main)
