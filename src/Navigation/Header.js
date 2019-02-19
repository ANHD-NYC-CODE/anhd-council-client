import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = props => {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">DAP Council</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as="li">
              <Link className="text-light" to="/">
                Home
              </Link>
            </Nav.Link>
            {props.user && (
              <Nav.Link as="li">
                <Link className="text-light" to="/profile">
                  {props.user.username}
                </Link>
              </Nav.Link>
            )}
            {props.user ? (
              <Nav.Link as="li">
                <Link className="text-light" to="/logout">
                  Logout
                </Link>
              </Nav.Link>
            ) : (
              <Nav.Link as="li">
                <Link className="text-light" to="/login">
                  Login
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Header)
