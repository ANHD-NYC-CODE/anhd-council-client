import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import './style.scss'
const NavigationBar = props => {
  return (
    <div className="navigation-bar">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link as="li">
            <a className="text-muted" target="" rel="noopener noreferrer" href="https://www.displacementalert.org/">
              Home
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a className="text-muted" target="" rel="noopener noreferrer" href="https://map.displacementalert.org/">
              DAP Map
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a className="text-muted" target="" rel="noopener noreferrer" href="https://reports.displacementalert.org/">
              District Reports
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-muted"
              target=""
              rel="noopener noreferrer"
              href="https://www.displacementalert.org/watchlist"
            >
              Watch List
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-portal-orange"
              target=""
              rel="noopener noreferrer"
              href="https://portal.displacementalert.org"
            >
              Portal
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-muted"
              target=""
              rel="noopener noreferrer"
              href="https://www.displacementalert.org/about"
            >
              About
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-muted"
              target=""
              rel="noopener noreferrer"
              href="https://www.displacementalert.org/contact-us"
            >
              Contact
            </a>
          </Nav.Link>
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
