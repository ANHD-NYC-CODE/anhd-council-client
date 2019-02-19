import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { history } from 'Store/configureStore'
import { refreshTokens } from 'Store/Auth/actions'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import Header from 'Navigation/Header'
import LeafletMap from 'LeafletMap'
import UserContext from 'Auth/UserContext'

class Router extends React.Component {
  constructor(props) {
    super(props)

    // Refresh the access token on app load
    if (props.auth && props.auth.refresh) {
      props.dispatch(refreshTokens(props.auth.refresh.token))
    }
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <UserContext.Provider value={this.props.auth.user}>
                <UserContext.Consumer>{user => <Header user={user} />}</UserContext.Consumer>
                <LeafletMap />
              </UserContext.Provider>
            )}
          />
          <Route render={() => <div>404</div>} />
        </Switch>
      </ConnectedRouter>
    )
  }
}

Router.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Router)
