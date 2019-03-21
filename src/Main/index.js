import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddressSearch from 'Lookup/AddressSearch'
import GeographySelect from 'shared/components/GeographySelect'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { setAppState } from 'Store/AppState/actions'
import { StandardizedInput } from 'shared/classes/StandardizedInput'

import { Form, Row, Col, Jumbotron } from 'react-bootstrap'
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.submitGeography = this.submitGeography.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)

    if (this.props.appState.changingGeography) {
      this.props.dispatch(
        setAppState({ changingGeography: false, changingGeographyType: undefined, changingGeographyId: undefined })
      )
    }
  }

  submitGeography({ e, geographyType, geographyId } = {}) {
    e = new StandardizedInput(e)
    const type = geographyType || this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
    const id = geographyId || e.value

    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: type,
        geographyId: id,
        redirect: true,
      })
    )

    this.cancelChangeGeography()
  }

  handleChangeGeographyType(e) {
    this.props.dispatch(
      setAppState({
        changingGeography: true,
        changingGeographyType: new StandardizedInput(e).value,
        changingGeographyId: -1,
      })
    )
  }

  cancelChangeGeography() {
    this.props.dispatch(
      setAppState({
        changingGeography: false,
        changingGeographyType: undefined,
        changingGeographyId: undefined,
      })
    )
  }

  render() {
    return (
      <div className="main">
        <Row>
          <Col className="touch-left" xs={12} sm={12} md={6} lg={5}>
            <Jumbotron>
              <h4>Welcome to DAP Portal</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id lobortis diam. Praesent neque purus,
                mattis eu interdum eget, maximus a purus. Quisque interdum auctor ligula vel commodo. Aliquam est arcu,
                gravida at ultrices vitae, mattis non massa. Curabitur posuere, ex nec rhoncus lobortis, est mi luctus
                massa, in tempor dui est vel erat.
              </p>
              <p>
                Morbi sed mauris eu dui pharetra finibus. Nunc convallis hendrerit porta. Etiam maximus sed risus eu
                scelerisque. Duis pretium tortor felis. Morbi tempor tincidunt erat, ullamcorper sollicitudin nibh
                tempus at. Nullam placerat efficitur lectus in commodo. Ut sit amet lorem ut nisi scelerisque mollis vel
                at nunc. Maecenas sed malesuada nunc.
              </p>
            </Jumbotron>
          </Col>
          <Col xs={12} sm={12} md={6} lg={7}>
            <h5>Select a district to begin, or search for a building address.</h5>
            <Form autoComplete="off">
              <Form.Group>
                <AddressSearch placeholder="Building Lookup Tool" />
              </Form.Group>
              <Form.Group>
                <GeographySelect
                  cancelChangeGeography={this.cancelChangeGeography}
                  changing={this.props.appState.changingGeography}
                  confirmChange={false}
                  currentGeographyType={
                    this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
                  }
                  currentGeographyId={this.props.appState.changingGeographyId || this.props.appState.currentGeographyId}
                  dispatch={this.props.dispatch}
                  handleChangeGeography={this.submitGeography}
                  handleChangeGeographyType={this.handleChangeGeographyType}
                  placeholder="District Alerts Map"
                  showSubmit={
                    !this.props.appState.changingGeography &&
                    this.props.appState.currentGeographyType &&
                    this.props.appState.currentGeographyId > 0
                  }
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

Main.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func,
  showLoginModal: PropTypes.bool,
  path: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(Main)
