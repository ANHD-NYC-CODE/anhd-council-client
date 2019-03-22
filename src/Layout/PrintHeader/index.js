import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Row } from 'react-bootstrap'
import logo from 'shared/images/portallogo.png'

const PrintHeader = props => {
  return (
    <div className="print-header">
      <Row>
        <Navbar className="print-header__navbar touch-left">
          <Navbar.Brand as="li">
            <img
              src={logo}
              className="print-header__logo d-inline-block align-top"
              alt="Displacement Alert Portal Logo"
            />
          </Navbar.Brand>
        </Navbar>
      </Row>
      <Row>
        <h1>{props.title}</h1>
      </Row>
    </div>
  )
}

PrintHeader.propTypes = {}

export default PrintHeader
