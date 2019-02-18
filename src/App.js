import React from 'react'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store/configureStore'

import Header from 'Navigation/Header'
import LeafletMap from 'LeafletMap'
import UserContext from 'Auth/UserContext'
import { USER_STORAGE } from 'shared/constants/actions'
import { getUserProfile } from 'Store/Auth/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem(USER_STORAGE)
    if (token) {
      props.dispatch(getUserProfile())
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
                <UserContext.Provider value={this.props.user}>
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
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(App)
