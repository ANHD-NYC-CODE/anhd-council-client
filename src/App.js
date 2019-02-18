import React from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store/configureStore'

import Header from 'Navigation/Header'
import LeafletMap from 'LeafletMap'
import UserContext from 'Auth/UserContext'
import { refreshTokens } from 'Store/Auth/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    // Refresh the access token on app load
    if (props.auth.refresh_token) {
      props.dispatch(refreshTokens(props.auth))
    }
  }
  render() {
    return (
      <div className="App">
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(App)
