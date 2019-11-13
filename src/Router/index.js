import React from 'react'
import PropTypes from 'prop-types'
import * as b from 'shared/constants/geographies'

import { history } from 'Store/configureStore'
import ModalContext from 'Modal/ModalContext'
import UserContext from 'Auth/UserContext'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import Main from 'Main'
import Lookup from 'Lookup'
import DistrictDashboard from 'DistrictDashboard'
import AdvancedSearch from 'AdvancedSearch'
import { faMapSigns } from '@fortawesome/free-solid-svg-icons'
import ConfigContext from 'Config/ConfigContext'
import PageError from 'shared/components/PageError'
import Layout from 'Layout'
import ReactGA from 'react-ga'
class Router extends React.Component {
  constructor(props) {
    super(props)

    history.listen((location, action) => {
      ReactGA.pageview(window.location.pathname + window.location.search)
    })
  }
  render() {
    return (
      <ConnectedRouter history={history}>
        <ConfigContext.Consumer>
          {config => {
            return (
              <Layout>
                <Switch>
                  <Route exact path="/" render={() => <Main config={config} />} />

                  <Route
                    exact
                    path="/login"
                    render={() => (
                      <ModalContext.Consumer>
                        {modal => {
                          return (
                            <UserContext.Consumer>
                              {auth => {
                                return <Main config={config} login={true} user={auth.user} modal={modal} />
                              }}
                            </UserContext.Consumer>
                          )
                        }}
                      </ModalContext.Consumer>
                    )}
                  />

                  <Route
                    exact
                    path="/lookup"
                    render={router => <Lookup key={router.location.pathname} config={config} />}
                  />
                  <Route exact path="/property/:bbl/building/:bin" render={() => <Lookup config={config} />} />
                  <Route exact path="/property/:bbl" render={() => <Lookup config={config} />} />
                  <Route exact path="/building/:bin" render={() => <Lookup config={config} />} />
                  <Route exact path="/map" render={() => <DistrictDashboard config={config} />} />
                  {Object.keys(b).map((gKey, index) => {
                    const geography = b[gKey]
                    return (
                      <Route
                        key={`geography-route-${index}`}
                        exact
                        path={`/${geography.frontEndPath}/:id`}
                        render={() => <DistrictDashboard config={config} />}
                      />
                    )
                  })}
                  <Route exact path="/search" render={() => <AdvancedSearch config={config} />} />
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
