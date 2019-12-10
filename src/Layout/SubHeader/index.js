import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Navbar, Nav, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import logo from 'shared/images/dapportal_beta.png'
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
      <Nav className="sub-header">
        <Navbar className="sub-header__wrapper--top layout-width-wrapper--padded touch-left">
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
              <a className="text-gray-900" href="#">
                Report a bug
              </a>
            </Nav.Item>
            <Nav.Item>
              <BaseLink href="https://forms.gle/EAUkzgsAkHn8NgbTA" className="text-gray-900" text="Feedback" />
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
                  <a className="text-gray-900" href="#">
                    Logout
                  </a>
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
                <a className="text-gray-900" href="#" id="nav-login-button">
                  Login / Sign up
                </a>
              </Nav.Item>
            )}
          </Nav>
        </Navbar>
        <Navbar className="sub-header__wrapper--bottom layout-width-wrapper">
          <Nav className="" variant="tabs" activeKey={this.state.key} onSelect={key => this.setState({ key })}>
            <Link
              className={classnames('sub-header__nav-tab', {
                active: this.props.pathname.match(/^\/$/),
              })}
              to={'/'}
            >
              <div className="sub-header__nav-tab--inner">
                <Nav.Item>Home</Nav.Item>
              </div>
            </Link>
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
        </Navbar>
      </Nav>
    )
    // return (
    //   <Container fluid>
    //     <Row className="sub-header touch-left">
    //       <Col className="d-flex justify-content-center" xs={12} md={4} lg={3}>
    //         <Navbar.Brand as="li">
    //           <Link to="/">
    //             <img
    //               src={logo}
    //               className="sub-header__logo d-inline-block align-top"
    //               alt="Displacement Alert Portal Logo"
    //             />
    //           </Link>
    //         </Navbar.Brand>
    //       </Col>
    //       <Col xs={12} md={8} lg={9}>
    //         <Row className="sub-header__wrapper--top">
    //           <Col xs={12} md={{ span: 10, offset: 2 }}>
    //             <Row className="sub-header__auth-row flex-column flex-sm-row">
    //               <div className="d-flex">
    //                 <Col>
    //                   <Nav.Item
    //                     onClick={e => {
    //                       e.preventDefault()
    //                       this.props.modal.setModal({
    //                         modalComponent: BugReportModal,
    //                         modalProps: {
    //                           size: 'lg',
    //                         },
    //                       })
    //                     }}
    //                   >
    //                     <a className="text-gray-900" href="#">
    //                       Report a bug
    //                     </a>
    //                   </Nav.Item>
    //                 </Col>
    //                 <Col>
    //                   <Nav.Item>
    //                     <BaseLink
    //                       href="https://forms.gle/EAUkzgsAkHn8NgbTA"
    //                       className="text-gray-900"
    //                       text="Feedback"
    //                     />
    //                   </Nav.Item>
    //                 </Col>
    //                 {this.props.auth.user ? (
    //                   <div className="d-flex">
    //                     <Col>
    //                       <Nav.Item className="text-gray-900">{this.props.auth.user.username}</Nav.Item>
    //                     </Col>
    //                     <Col>
    //                       <Nav.Item
    //                         onClick={e => {
    //                           e.preventDefault()
    //                           this.props.auth.logoutUser()
    //                         }}
    //                       >
    //                         <a className="text-gray-900" href="#">
    //                           Logout
    //                         </a>
    //                       </Nav.Item>
    //                     </Col>
    //                   </div>
    //                 ) : (
    //                   <Col>
    //                     <Nav.Item
    //                       onClick={e => {
    //                         e.preventDefault()
    //                         this.props.modal.setModal({
    //                           modalComponent: LoginModal,
    //                           modalProps: {
    //                             modalFooter: <LoginModalFooter modal={this.props.modal} />,
    //                           },
    //                         })
    //                       }}
    //                     >
    //                       <a className="text-gray-900" href="#" id="nav-login-button">
    //                         Login / Sign up
    //                       </a>
    //                     </Nav.Item>
    //                   </Col>
    //                 )}
    //               </div>
    //             </Row>
    //           </Col>
    //         </Row>
    //         <Row className="sub-header__wrapper--bottom">
    //           <Col xs={12}>
    //             <Nav
    //               className="sub-header__nav-row flex-column flex-sm-row"
    //               variant="pills"
    //               activeKey={this.state.key}
    //               onSelect={key => this.setState({ key })}
    //             >
    //               <Link
    //                 className={classnames('sub-header__nav-tab', {
    //                   active: this.props.pathname.match(/(lookup|property)/),
    //                 })}
    //                 to={
    //                   this.props.currentProperty
    //                     ? addressResultToPath({
    //                         bbl: this.props.currentProperty,
    //                         bin: this.props.currentBuilding,
    //                       })
    //                     : '/lookup'
    //                 }
    //               >
    //                 <div className="sub-header__nav-tab--inner">
    //                   <Nav.Item>Property Lookup</Nav.Item>
    //                 </div>
    //               </Link>
    //               <Link
    //                 className={classnames('sub-header__nav-tab', {
    //                   active: this.props.pathname.match(/(map|council|community)/),
    //                 })}
    //                 to={`${
    //                   this.props.currentGeographyType && this.props.currentGeographyId
    //                     ? '/' + getGeographyPath(this.props.currentGeographyType) + '/' + this.props.currentGeographyId
    //                     : '/map'
    //                 }`}
    //               >
    //                 <div className="sub-header__nav-tab--inner">
    //                   <Nav.Item>District Dashboard</Nav.Item>
    //                 </div>
    //               </Link>
    //               <Link
    //                 to="/search"
    //                 className={classnames('sub-header__nav-tab', {
    //                   active: this.props.pathname.match(/(search)/),
    //                 })}
    //               >
    //                 <div className="sub-header__nav-tab--inner">
    //                   <Nav.Item>Custom Search</Nav.Item>
    //                 </div>
    //               </Link>
    //             </Nav>
    //           </Col>
    //         </Row>
    //       </Col>
    //     </Row>
    //   </Container>
    // )
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
