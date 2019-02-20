import React from 'react'
import PropTypes from 'prop-types'

import { history } from 'Store/configureStore'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import Main from 'Main'
import BuildingLookup from 'BuildingLookup'
import DistrictMap from 'DistrictMap'
import AdvancedSearch from 'AdvancedSearch'

import Page404 from 'shared/components/Page404'

class Router extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/buildings/:id" render={() => <BuildingLookup />} />
          <Route exact path="/districts" render={() => <DistrictMap />} />
          <Route exact path="/districts/:id" render={() => <DistrictMap />} />
          <Route exact path="/advanced-search" render={() => <AdvancedSearch />} />
          <Route exact path="/login" render={() => <Main showLoginModal={true} />} />
          <Route exact path="/logout" render={() => <Main />} />
          <Route render={() => <Page404 />} />
        </Switch>
      </ConnectedRouter>
    )
  }
}

Router.propTypes = {}

export default Router
