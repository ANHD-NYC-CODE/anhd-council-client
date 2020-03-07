import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { setAppState } from 'Store/AppState/actions'
import StandardizedInput from 'shared/classes/StandardizedInput'
import BaseLink from 'shared/components/BaseLink'
import MainGeographySelect from 'shared/components/MainGeographySelect'

import { Row, Col } from 'react-bootstrap'

class DistrictDashboardIndex extends React.Component {
  constructor(props) {
    super(props)
    this.submitGeography = this.submitGeography.bind(this)
    this.cancelChangeGeography = this.cancelChangeGeography.bind(this)
    this.handleChangeGeographyType = this.handleChangeGeographyType.bind(this)
    this.handleChangeGeographyId = this.handleChangeGeographyId.bind(this)
  }

  submitGeography({ e, geographyType, geographyId } = {}) {
    e = new StandardizedInput(e)
    const type = geographyType || this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
    const id =
      geographyId || e.value || this.props.appState.changingGeographyId || this.props.appState.currentGeographyId

    this.props.dispatch(
      setGeographyAndRequestsAndRedirect({
        geographyType: type,
        geographyId: id,
        redirect: true,
        requests: this.props.config.createMapRequests(type, id),
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

  handleChangeGeographyId(e) {
    const geographyId = new StandardizedInput(e).value
    if (parseInt(geographyId) <= 0) return
    this.props.dispatch(
      setAppState({
        changingGeography: true,
        changingGeographyType: this.props.appState.changingGeographyType || this.props.appState.currentGeographyType,
        changingGeographyId: String(geographyId),
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
      <div id="main" className="main max-width-wrapper">
        <Helmet>
          <title>DAP Portal | District Dashboard</title>
        </Helmet>
        <Row>
          <Col>
            <h4 className="text-center text-black mt-4 mb-4">District Dashboard</h4>
          </Col>
          <Col className="px-md-4 px-0 py-3 py-lg-4" xs={12}>
            <p className="text-black text-center py-3">View data about a district or zip code:</p>
            <div className="mb-4">
              <MainGeographySelect
                appState={this.props.appState}
                selectClass="main-geography-select"
                inputSize="md"
                submitButtonVariant="dark"
                cancelChangeGeography={this.cancelChangeGeography}
                changingGeographyType={this.props.appState.changingGeographyType}
                changingGeographyId={this.props.appState.changingGeographyId}
                confirmChange={false}
                currentGeographyType={
                  this.props.appState.changingGeographyType || this.props.appState.currentGeographyType
                }
                currentGeographyId={this.props.appState.currentGeographyId}
                dispatch={this.props.dispatch}
                handleChangeGeography={this.submitGeography}
                handleChangeGeographyType={this.handleChangeGeographyType}
                handleChangeGeographyId={this.handleChangeGeographyId}
                placeholder="Select"
                showSubmit={
                  (!this.props.appState.changingGeography &&
                    this.props.appState.currentGeographyType &&
                    this.props.appState.currentGeographyId > 0) ||
                  (this.props.appState.changingGeographyType && this.props.appState.changingGeographyId > 0)
                }
              />
            </div>
            <p className="text-black text-center my-5">
              You can also{' '}
              <BaseLink className="text-link" href="/lookup">
                find information about a building:
              </BaseLink>
              {' or '}
              <BaseLink className="text-link" href="/search">
                create a Custom Search
              </BaseLink>
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

DistrictDashboardIndex.propTypes = {
  appState: PropTypes.object,
  auth: PropTypes.object,
  config: PropTypes.object,
  dispatch: PropTypes.func,
  showLoginModal: PropTypes.bool,
  path: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    appState: state.appState,
  }
}

export default connect(mapStateToProps)(DistrictDashboardIndex)
