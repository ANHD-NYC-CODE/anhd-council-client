import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, Button } from 'react-bootstrap'
import Auth from 'Auth'
import UserContext from 'Auth/UserContext'

const Header = props => {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">DAP Council</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            {props.user && <Nav.Link>{props.user.username}</Nav.Link>}

            <Auth />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.object,
}

export default Header
