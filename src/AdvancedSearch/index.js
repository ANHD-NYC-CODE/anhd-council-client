import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'Layout'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <h1>Advanced Search</h1>
      </Layout>
    )
  }
}

AdvancedSearch.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    store: state,
  }
}

export default connect(mapStateToProps)(AdvancedSearch)
