import { ConnectedRouter } from 'connected-react-router'
import { faMapSigns } from '@fortawesome/free-solid-svg-icons'
import { Route, Switch } from 'react-router'
import React from 'react'
import ReactGA from 'react-ga'

import { history } from 'Store/configureStore'
import * as b from 'shared/constants/geographies'
import AdvancedSearch from 'AdvancedSearch'
import ConfigContext from 'Config/ConfigContext'
import DistrictDashboard from 'DistrictDashboard'
import Layout from 'Layout'
import Lookup from 'Lookup'
import Main from 'Main'
import ModalContext from 'Modal/ModalContext'
import PageError from 'shared/components/PageError'
import UserContext from 'Auth/UserContext'

class Router extends React.Component {
  constructor(props) {
    super(props)

    history.listen(() => {
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
