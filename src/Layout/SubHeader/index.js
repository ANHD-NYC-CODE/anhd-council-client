import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Navbar, Nav, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import logo from 'shared/images/portallogo.png'
import LoginModal from 'Auth/LoginModal'

import './style.scss'
class SubHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      key: '',
    }
  }

  render() {
    if (this.props.print) return null
    return (
      <Container fluid>
        <Row className="sub-header touch-left">
          <Col xs={12} md={4}>
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
          <Col xs={12} md={8}>
            <Row className="sub-header__wrapper--top">
              <Col xs={12} md={{ span: 4, offset: 8 }}>
                {this.props.auth.user ? (
                  <Row className="flex-column flex-sm-row">
                    <Col>
                      <Nav.Item className="text-secondary">{this.props.auth.user.username}</Nav.Item>
                    </Col>
                    <Col>
                      <Nav.Item
                        onClick={e => {
                          e.preventDefault()
                          this.props.auth.logoutUser()
                        }}
                      >
                        <a className="text-secondary" href="#">
                          Logout
                        </a>
                      </Nav.Item>
                    </Col>
                  </Row>
                ) : (
                  <Nav.Item
                    onClick={e => {
                      e.preventDefault()
                      this.props.modal.setModal({
                        modalComponent: LoginModal,
                      })
                    }}
                  >
                    <a className="text-secondary" href="#">
                      Login
                    </a>
                  </Nav.Item>
                )}
              </Col>
            </Row>
            <Row className="sub-header__wrapper--bottom">
              <Col xs={12}>
                <Row className="">
                  <Nav className="flex-column flex-sm-row" variant="tabs">
                    <Nav.Item>
                      <Link
                        to={
                          this.props.currentProperty
                            ? addressResultToPath({
                                bbl: this.props.currentProperty,
                                bin: this.props.currentBuilding,
                              })
                            : '/lookup'
                        }
                      >
                        Building Lookup
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link
                        to={`${
                          this.props.currentGeographyType && this.props.currentGeographyId
                            ? '/' +
                              getGeographyPath(this.props.currentGeographyType) +
                              '/' +
                              this.props.currentGeographyId
                            : '/map'
                        }`}
                      >
                        Alert Map
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link to="/search">Advanced Search</Link>
                    </Nav.Item>
                  </Nav>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

SubHeader.propTypes = {
  dispatch: PropTypes.func,
  modal: PropTypes.object,
  auth: PropTypes.object,
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
