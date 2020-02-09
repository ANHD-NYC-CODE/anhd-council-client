import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import logo from 'shared/images/portallogo.png'
import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import BugReportModal from 'shared/components/modals/BugReportModal'

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
      <div className="sub-header">
        <Nav className=" layout-width-wrapper">
          <Navbar className="sub-header__wrapper--top">
            <Nav className="mr-auto">
              <Navbar.Brand className="mr-auto">
                <Link to="/">
                  <img src={logo} className="sub-header__logo" alt="Displacement Alert Portal Logo" />
                </Link>
              </Navbar.Brand>
            </Nav>
            <Nav className="sub-header__wrapper--top__links">
              <Nav.Item
                onClick={e => {
                  e.preventDefault()
                  this.props.modal.setModal({
                    modalComponent: BugReportModal,
                    modalProps: {
                      size: 'lg',
                    },
                  })
                }}
              >
                <button className="blank-button text-gray-900">Report a bug</button>
              </Nav.Item>
              <Nav.Item>
                <BaseLink
                  href="https://forms.gle/EAUkzgsAkHn8NgbTA"
                  className="blank-button text-gray-900"
                  text="Feedback"
                />
              </Nav.Item>
              {this.props.auth.user ? (
                <div className="d-flex">
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
          </Navbar>
          <Navbar className="sub-header__wrapper--bottom full-bleed--mobile">
            <Nav className="" variant="tabs" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
              <Link
                className={classnames('sub-header__nav-tab tab--dark-inverse', {
                  active: this.props.pathname.match(/^\/$/),
                })}
                to={'/'}
              >
                <div className="sub-header__nav-tab--inner">
                  <Nav.Item>Home</Nav.Item>
                </div>
              </Link>
              <Link
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
                to="/search"
                className={classnames('sub-header__nav-tab tab--dark-inverse', {
                  active: this.props.pathname.match(/(search)/),
                })}
              >
                <div className="sub-header__nav-tab--inner">
                  <Nav.Item>Custom Search</Nav.Item>
                </div>
              </Link>
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
