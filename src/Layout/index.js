import React from 'react'
import PropTypes from 'prop-types'
import UserContext from 'Auth/UserContext'
import NavigationBar from 'Layout/NavigationBar'
import Header from 'Layout/Header'

const Layout = props => {
  return (
    <div className="layout">
      <UserContext.Consumer>
        {user => (
          <div>
            <NavigationBar user={user} />
            <Header user={user} />
          </div>
        )}
      </UserContext.Consumer>
      {props.children}
    </div>
  )
}

Layout.propTypes = {}

export default Layout
