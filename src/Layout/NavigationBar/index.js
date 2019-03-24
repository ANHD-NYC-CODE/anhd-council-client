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
        <Nav.Link as="li">
          <Link className="text-muted" to="/">
            Home
          </Link>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link as="li">
            <a
              className="text-muted"
              target="_blank"
              rel="noopener noreferrer"
              href="https://map.displacementalert.org/"
            >
              DAP Map
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-muted"
              target="_blank"
              rel="noopener noreferrer"
              href="https://reports.displacementalert.org/"
            >
              District Reports
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-muted"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.displacementalert.org/watchlist"
            >
              Watch List
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <Link className="text-portal-orange" to="/">
              Portal
            </Link>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-muted"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.displacementalert.org/about"
            >
              About
            </a>
          </Nav.Link>
          <Nav.Link as="li">
            <a
              className="text-muted"
              target="_blank"
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
