import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import portalLogo from 'shared/images/portallogo-2020.png'
import anhdLogo from 'shared/images/anhdlogo.png'

import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import UserMessageModal from 'shared/components/modals/UserMessageModal'

import classnames from 'classnames'
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
      <div className="sub-header">
        <Nav className=" layout-width-wrapper">
          <Navbar className="w-100">
            <Nav className="sub-header__brand">
              <Navbar.Brand className="d-flex align-items-center justify-content-center">
                <Link to="/">
                  <img src={portalLogo} className="sub-header__logo" alt="Displacement Alert Portal Logo" />
                </Link>
                <a href="https://www.anhd.org">
                  <img src={anhdLogo} className="sub-header__logo" alt="ANHD Logo" />
                </a>
              </Navbar.Brand>
            </Nav>
          </Navbar>
          <Navbar className="sub-header__wrapper--top" />
          <Navbar className="sub-header__wrapper--bottom full-bleed--mobile">
            <Nav className="" variant="tabs" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
              <Link
                data-test-id="subheader__home-link"
                className={classnames('sub-header__nav-tab tab--dark-inverse', {
                  active: this.props.pathname.match(/^\/$/),
                })}
                to={'/'}
              >
                <div className="sub-header__nav-tab--inner">
                  <Nav.Item>Home</Nav.Item>
                </div>
              </Link>
              {this.props.auth.user ? 
                (<Link
                  data-test-id="subheader__home-link"
                  className={classnames('sub-header__nav-tab tab--dark-inverse', {
                    active: this.props.pathname.match(/me/),
                  })}
                  to={'/me'}
                >
                  <div className="sub-header__nav-tab--inner">
                    <Nav.Item>My Dashboard</Nav.Item>
                  </div>
                </Link>) : ("")
              }
              <Link
                data-test-id="subheader__pl-link"
                className={classnames('sub-header__nav-tab tab--dark-inverse', {
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
                data-test-id="subheader__dd-link"
                className={classnames('sub-header__nav-tab tab--dark-inverse', {
                  active: this.props.pathname.match(/(map|council|community|state-assembly|state-senate|zipcode)/),
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
                data-test-id="subheader__search-link"
                to="/search"
                className={classnames('sub-header__nav-tab tab--dark-inverse', {
                  active: this.props.pathname.match(/(search)/),
                })}
              >
                <div className="sub-header__nav-tab--inner">
                  <Nav.Item>Custom Search</Nav.Item>
                </div>
              </Link>
              {/*
              link navs
              */}

              <Nav className="sub-header__wrapper--top__links">
                <Nav.Item
                  onClick={e => {
                    e.preventDefault()
                    this.props.modal.setModal({
                      modalComponent: UserMessageModal,
                      modalProps: {
                        size: 'lg',
                      },
                    })
                  }}
                >
                  <button className="blank-button text-gray-900">Contact us / Report an issue</button>
                </Nav.Item>
                {/* <Nav.Item>
                <BaseLink
                  href="https://forms.gle/EAUkzgsAkHn8NgbTA"
                  className="blank-button text-gray-900"
                  text="Feedback"
                />
              </Nav.Item> */}
                {this.props.auth.user ? (
                  <div className="d-flex auth-user">
                    <Nav.Item className="text-gray-900">{this.props.auth.user.username}</Nav.Item>
                    <Nav.Item
                      onClick={e => {
                        e.preventDefault()
                        this.props.auth.logoutUser()
                      }}
                    >
                      <button className="blank-button text-gray-900">Logout</button>
                    </Nav.Item>
                  </div>
                ) : (
                  <Nav.Item
                    onClick={e => {
                      e.preventDefault()
                      this.props.modal.setModal({
                        modalComponent: LoginModal,
                        modalProps: {
                          modalFooter: <LoginModalFooter modal={this.props.modal} />,
                        },
                      })
                    }}
                  >
                    <button className="blank-button text-gray-900" id="nav-login-button">
                      Login / Sign up
                    </button>
                  </Nav.Item>
                )}
              </Nav>
            </Nav>
          </Navbar>
        </Nav>
        <hr className="sub-header__nav-line" />
      </div>
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
