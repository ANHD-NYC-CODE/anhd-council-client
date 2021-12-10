import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import React from 'react'
import ReactGA from 'react-ga'

import { history } from 'Store/configureStore'
import * as b from 'shared/constants/geographies'
import AdvancedSearch from 'AdvancedSearch'
import ConfigContext from 'Config/ConfigContext'
import DistrictDashboard from 'DistrictDashboard'
import MyDashboard from 'MyDashboard'
import Layout from 'Layout'
import Lookup from 'Lookup'
import Main from 'Main'
import ModalContext from 'Modal/ModalContext'
import UserContext from 'Auth/UserContext'
import DataAccessPolicy from 'policies/DataAccessPolicy'

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
                  <Route exact path="/policies/data-access-policy" render={() => <DataAccessPolicy />} />
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
                  <Route exact path="/district-dashboard" render={() => <DistrictDashboard config={config} />} />
                  {Object.keys(b).filter(key => key !== "CITY_GEOGRAPHY" || key !== "BOROUGH_GEOGRAPHY").map((gKey, index) => {
                    const geography = b[gKey]
                    return (
                      <Route
                        key={`district-dashboard-geography-route-${index}`}
                        exact
                        path={`/district-dashboard/${geography.frontEndPath}/:id`}
                        render={() => <DistrictDashboard config={config} />}
                      />
                    )
                  })}
                  <Route exact path="/me" render={() => <MyDashboard config={config}/>} />
                  <Route exact path="/search" render={() => <AdvancedSearch config={config} search={true} />} />
                  {Object.keys(b).map((gKey, index) => {
                    const geography = b[gKey]
                    return (
                      <Route
                        key={`search-geography-route-${index}`}
                        exact
                        path={`/search/${geography.frontEndPath}/:id`}
                        render={() => <AdvancedSearch config={config} />}
                      />
                    )
                  })}
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
