import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BuildingSearchModule from '../BuildingSearchModule'
import BoundarySelect from 'shared/components/BoundarySelect'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main">
        <BuildingSearchModule />
        <BoundarySelect
          confirmChange={false}
          currentBoundaryType={this.props.appState.currentBoundaryType}
          currentBoundaryId={this.props.appState.currentBoundaryId}
          dispatch={this.props.dispatch}
        />
      </div>
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
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(Main)
