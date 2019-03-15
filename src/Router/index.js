import React from 'react'
import PropTypes from 'prop-types'

import { history } from 'Store/configureStore'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import Main from 'Main'
import Lookup from 'Lookup'
import AlertMap from 'AlertMap'
import AdvancedSearch from 'AdvancedSearch'

import PageError from 'shared/components/PageError'
import Layout from 'Layout'
class Router extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Main />} />
            <Route exact path="/lookup" render={() => <Lookup />} />
            <Route exact path="/property/:bbl/building/:bin" render={() => <Lookup />} />
            <Route exact path="/property/:bbl" render={() => <Lookup />} />
            <Route exact path="/building/:bin" render={() => <Lookup />} />
            <Route exact path="/map" render={() => <AlertMap />} />
            <Route exact path="/council/:id" render={() => <AlertMap />} />
            <Route exact path="/community/:id" render={() => <AlertMap />} />
            <Route exact path="/search" render={() => <AdvancedSearch />} />
            <Route exact path="/login" render={() => <Main showLoginModal={true} />} />
            <Route exact path="/logout" render={() => <Main />} />
            <Route
              render={() => (
                <PageError
                  title="Oops! 404 Not Found."
                  message="Sorry, an error has occured, Requested page not found!"
                />
              )}
            />
          </Switch>
        </Layout>
      </ConnectedRouter>
    )
  }
}

Router.propTypes = {}

export default Router
