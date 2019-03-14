import React from 'react'
import PropTypes from 'prop-types'
import UserContext from 'Auth/UserContext'
import NavigationBar from 'Layout/NavigationBar'
import Header from 'Layout/Header'
import Footer from 'Layout/Footer'
import './style.scss'
import { Container } from 'react-bootstrap'

export const Layout = props => {
  return (
    <div className="layout">
      <div className="footer-push">
        <UserContext.Consumer>
          {user => (
            <div>
              <NavigationBar user={user} />
              <Header user={user} />
            </div>
          )}
        </UserContext.Consumer>
        <Container fluid={true}>{props.children}</Container>
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {}

export default Layout
