import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Row, Nav, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getBoundaryPath } from 'shared/utilities/componentUtils'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar className="sub-header">
        <Col sm={12} md={6}>
          <Nav variant="tabs" defaultActiveKey="/buildings">
            <Nav.Item>
              <Nav.Link as="li">
                <Link to="/buildings">Building Lookup</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="li">
                <Link
                  to={`${
                    this.props.currentBoundaryType && this.props.currentBoundaryId
                      ? '/' + getBoundaryPath(this.props.currentBoundaryType) + '/' + this.props.currentBoundaryId
                      : '/map'
                  }`}
                >
                  Alert Map
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="li">
                <Link to="/search">Advanced Search</Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Navbar>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    currentBoundaryType: state.appState.currentBoundaryType,
    currentBoundaryId: state.appState.currentBoundaryId,
  }
}

export default connect(mapStateToProps)(Header)
