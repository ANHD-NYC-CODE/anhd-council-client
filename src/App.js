import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './Store/configureStore'

const store = configureStore({})

import Header from './navigation/Header'
import LeafletMap from './LeafletMap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <div>
                    <Header />
                    <LeafletMap />
                  </div>
                )}
              />
              <Route render={() => <div>404</div>} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </div>
    )
  }
}

export default App
