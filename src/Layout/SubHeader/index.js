import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getGeographyPath, addressResultToPath } from 'shared/utilities/routeUtils'
import logo from 'shared/images/portallogo.png'
import './style.scss'
class SubHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.print) return null
    return (
      <Navbar className="sub-header touch-left">
        <Navbar.Brand as="li">
          <Link to="/">
            <img
              src={logo}
              className="sub-header__logo d-inline-block align-top"
              alt="Displacement Alert Portal Logo"
            />
          </Link>
        </Navbar.Brand>
        <Col sm={12} md={6}>
          <Nav variant="tabs" defaultActiveKey="/buildings">
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
          </Nav>
        </Col>
      </Navbar>
    )
  }
}

SubHeader.propTypes = {
  dispatch: PropTypes.func,
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
