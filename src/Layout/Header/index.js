import React from 'react'
import PropTypes from 'prop-types'
import { Row, Nav, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = props => {
  return (
    <div className="header">
      <Row>
        <Col sm={12} md={6}>
          <Nav variant="tabs" defaultActiveKey="/buildings">
            <Nav.Item>
              <Nav.Link as="li">
                <Link to="buildings">Building Lookup</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="li">
                <Link to="districts">District Alerts</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="li">
                <Link to="search">Advanced Search</Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </div>
  )
}

Header.propTypes = {}

export default Header
