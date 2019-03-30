import React from 'react'
import PropTypes from 'prop-types'

import { history } from 'Store/configureStore'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import Main from 'Main'
import Lookup from 'Lookup'
import AlertMap from 'AlertMap'
import AdvancedSearch from 'AdvancedSearch'
import { faMapSigns } from '@fortawesome/free-solid-svg-icons'
import ConfigContext from 'Config/ConfigContext'
import PageError from 'shared/components/PageError'
import Layout from 'Layout'
class Router extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <ConfigContext.Consumer>
          {config => {
            return (
              <Layout>
                <Switch>
                  <Route exact path="/" render={() => <Main />} />
                  <Route
                    exact
                    path="/lookup"
                    render={router => <Lookup key={router.location.pathname} config={config} />}
                  />
                  <Route exact path="/property/:bbl/building/:bin" render={() => <Lookup config={config} />} />
                  <Route exact path="/property/:bbl" render={() => <Lookup config={config} />} />
                  <Route exact path="/building/:bin" render={() => <Lookup config={config} />} />
                  <Route exact path="/map" render={() => <AlertMap config={config} />} />
                  <Route exact path="/council/:id" render={() => <AlertMap config={config} />} />
                  <Route exact path="/community/:id" render={() => <AlertMap config={config} />} />
                  <Route exact path="/search" render={() => <AdvancedSearch />} />
                  <Route
                    render={() => (
                      <PageError
                        title="Oops! 404 Page Not Found."
                        message="Sorry, an error has occured. Page not found!"
                        icon={faMapSigns}
                      />
                    )}
                  />
                </Switch>
              </Layout>
            )
          }}
        </ConfigContext.Consumer>
      </ConnectedRouter>
    )
  }
}

Router.propTypes = {}

export default Router
