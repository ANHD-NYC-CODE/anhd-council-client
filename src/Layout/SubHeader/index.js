import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import logo from 'shared/images/portallogo.png'
import LoginModal from 'Auth/LoginModal'

import './style.scss'
class SubHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.print) return null
    return (
      <Navbar className="sub-header touch-left">
        <Col xs={4}>
          <Navbar.Brand as="li">
            <Link to="/">
              <img
                src={logo}
                className="sub-header__logo d-inline-block align-top"
                alt="Displacement Alert Portal Logo"
              />
            </Link>
          </Navbar.Brand>
        </Col>
        <Col xs={8}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link as="li">
                <Link
                  to={
                    this.props.currentProperty
                      ? addressResultToPath({ bbl: this.props.currentProperty, bin: this.props.currentBuilding })
                      : '/lookup'
                  }
                >
                  Building Lookup
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="li">
                <Link
                  to={`${
                    this.props.currentGeographyType && this.props.currentGeographyId
                      ? '/' + getGeographyPath(this.props.currentGeographyType) + '/' + this.props.currentGeographyId
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
            <Nav.Item>
              {this.props.user && (
                <Nav.Link as="li">
                  <Link className="text-secondary" to="/profile">
                    {this.props.user.username}
                  </Link>
                </Nav.Link>
              )}
              {this.props.user ? (
                <Nav.Link as="li">
                  <Link className="text-secondary" to="/logout">
                    Logout
                  </Link>
                </Nav.Link>
              ) : (
                <Nav.Link
                  as="a"
                  className="text-secondary"
                  onClick={() =>
                    this.props.modal.setModal({
                      modalComponent: LoginModal,
                    })
                  }
                >
                  Login
                </Nav.Link>
              )}
            </Nav.Item>
          </Nav>
        </Col>
      </Navbar>
    )
  }
}

SubHeader.propTypes = {
  dispatch: PropTypes.func,
  modal: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    currentGeographyType: state.appState.currentGeographyType,
    currentGeographyId: state.appState.currentGeographyId,
    currentProperty: state.appState.currentProperty,
    currentBuilding: state.appState.currentBuilding,
    print: state.appState.printView,
  }
}

export default connect(mapStateToProps)(SubHeader)
