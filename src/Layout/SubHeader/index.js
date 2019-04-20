import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button, Container, Navbar, Nav, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import logo from 'shared/images/portallogo-white.png'
import LoginModal from 'Auth/LoginModal'
import UserRequestModal from 'shared/components/modals/UserRequestModal'
import classnames from 'classnames'
import BaseLink from 'shared/components/BaseLink'
import './style.scss'
class SubHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      key: '',
    }
  }

  render() {
    return (
      <Container fluid>
        <Row className="sub-header touch-left">
          <Col className="d-flex justify-content-center" xs={12} md={4} lg={3}>
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
          <Col xs={12} md={8} lg={9}>
            <Row className="sub-header__wrapper--top">
              <Col xs={12} md={{ span: 6, offset: 6 }}>
                <Row className="sub-header__auth-row flex-column flex-sm-row">
                  <div className="d-flex">
                    <Col>
                      <Nav.Item>
                        <BaseLink
                          href="https://forms.gle/EAUkzgsAkHn8NgbTA"
                          className="text-secondary"
                          text="Feedback"
                        />
                      </Nav.Item>
                    </Col>
                    {this.props.auth.user ? (
                      <div className="d-flex">
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
                      </div>
                    ) : (
                      <Col>
                        <Nav.Item
                          onClick={e => {
                            e.preventDefault()
                            this.props.modal.setModal({
                              modalComponent: LoginModal,
                              modalProps: {
                                modalFooter: (
                                  <Modal.Footer>
                                    <Row>
                                      <Col xs={12}>
                                        <Button
                                          block
                                          variant="outline-primary"
                                          onClick={e => {
                                            e.preventDefault()
                                            this.props.modal.setModal({
                                              modalComponent: UserRequestModal,
                                            })
                                          }}
                                        >
                                          Request an account
                                        </Button>
                                      </Col>
                                      <Col xs={12}>
                                        <BaseLink href="https://api.displacementalert.org/password_reset">
                                          <Button block variant="outline-secondary">
                                            Reset Password
                                          </Button>
                                        </BaseLink>
                                      </Col>
                                    </Row>
                                  </Modal.Footer>
                                ),
                              },
                            })
                          }}
                        >
                          <a className="text-secondary" href="#">
                            Login
                          </a>
                        </Nav.Item>
                      </Col>
                    )}
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="sub-header__wrapper--bottom">
              <Col xs={12}>
                <Nav
                  className="sub-header__nav-row flex-column flex-sm-row"
                  variant="pills"
                  activeKey={this.state.key}
                  onSelect={key => this.setState({ key })}
                >
                  <Link
                    className={classnames('sub-header__nav-tab', {
                      active: this.props.pathname.match(/(lookup|property)/),
                    })}
                    to={
                      this.props.currentProperty
                        ? addressResultToPath({
                            bbl: this.props.currentProperty,
                            bin: this.props.currentBuilding,
                          })
                        : '/lookup'
                    }
                  >
                    <div className="sub-header__nav-tab--inner">
                      <Nav.Item>Property Lookup</Nav.Item>
                    </div>
                  </Link>
                  <Link
                    className={classnames('sub-header__nav-tab', {
                      active: this.props.pathname.match(/(map|council|community)/),
                    })}
                    to={`${
                      this.props.currentGeographyType && this.props.currentGeographyId
                        ? '/' + getGeographyPath(this.props.currentGeographyType) + '/' + this.props.currentGeographyId
                        : '/map'
                    }`}
                  >
                    <div className="sub-header__nav-tab--inner">
                      <Nav.Item>District Dashboard</Nav.Item>
                    </div>
                  </Link>
                  <Link
                    to="/search"
                    className={classnames('sub-header__nav-tab', {
                      active: this.props.pathname.match(/(search)/),
                    })}
                  >
                    <div className="sub-header__nav-tab--inner">
                      <Nav.Item>Custom Search</Nav.Item>
                    </div>
                  </Link>
                </Nav>
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
    pathname: state.router.location.pathname,
  }
}

export default connect(mapStateToProps)(SubHeader)
