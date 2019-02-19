import React from 'react'
import PropTypes from 'prop-types'

import { history } from 'Store/configureStore'
import { refreshTokens } from 'Store/Auth/actions'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import Main from 'Main'
import Page404 from 'shared/components/Page404'

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
          <Route exact path="/" render={() => <Main />} />
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
