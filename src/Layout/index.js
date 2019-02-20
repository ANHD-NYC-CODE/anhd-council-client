import React from 'react'
import PropTypes from 'prop-types'
import UserContext from 'Auth/UserContext'
import Header from 'Layout/Header'

const Layout = props => {
  return (
    <div className="layout">
      <UserContext.Consumer>{user => <Header user={user} />}</UserContext.Consumer>
      {props.children}
    </div>
  )
}

Layout.propTypes = {}

export default Layout
