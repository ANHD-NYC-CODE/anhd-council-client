import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from 'Navigation/Header'
import LeafletMap from 'LeafletMap'
import UserContext from 'Auth/UserContext'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <UserContext.Provider value={this.props.auth.user}>
        <UserContext.Consumer>
          {user => <Header openLoginModal={this.openLoginModal} user={user} />}
        </UserContext.Consumer>
        <LeafletMap />
      </UserContext.Provider>
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
