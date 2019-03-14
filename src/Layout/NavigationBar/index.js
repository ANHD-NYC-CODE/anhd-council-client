import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.scss'
const NavigationBar = props => {
  return (
    <div className="navigation-bar">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav.Link as="span">
          <Link className="text-light" to="/">
            Home
          </Link>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link as="li">
            <a
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
              href="https://map.displacementalert.org/"
            >
              DAP Map
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
              href="https://reports.displacementalert.org/"
            >
              District Reports
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.displacementalert.org/watchlist"
            >
              Watch List
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <Link className="text-light" to="/">
              Portal
            </Link>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.displacementalert.org/about"
            >
              About
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.displacementalert.org/contact-us"
            >
              Contact
            </a>
          </Nav.Link>
          <Nav className="mr-auto">
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

NavigationBar.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(NavigationBar)
