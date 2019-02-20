import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class BuildingLookup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="buildingLookup">
        <h1>Building Lookup</h1>
      </div>
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
