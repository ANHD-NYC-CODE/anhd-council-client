import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Helmet from 'react-helmet'
import AddressSearch from 'Lookup/AddressSearch'
import MainGeographySelect from 'shared/components/MainGeographySelect'
import { setGeographyAndRequestsAndRedirect } from 'Store/AppState/actions'
import { setAppState } from 'Store/AppState/actions'
import StandardizedInput from 'shared/classes/StandardizedInput'
import IntroductionBlock from 'shared/components/IntroductionBlock'
import LoginModal from 'shared/components/modals/LoginModal'
import LoginModalFooter from 'shared/components/forms/LoginForm/LoginModalFooter'
import ConfigContext from 'Config/ConfigContext'
import BaseLink from 'shared/components/BaseLink'

import { Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Row, Col } from 'react-bootstrap'

class LookupIndex extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="main" className="main layout-width-wrapper">
        <Helmet>
          <title>DAP Portal | Property Lookup</title>
        </Helmet>
        <Row>
          <Col>
            <h4 className="text-center text-black mt-4 mb-4">Property Lookup</h4>
          </Col>
          <Col className="px-md-4 px-0 py-3 py-lg-4" xs={12}>
            <p className="text-black text-center py-3">Enter an address to find information about a building:</p>
            <div className="mb-4">
              <div>
                <ConfigContext.Consumer>
                  {config => {
                    return (
                      <AddressSearch
                        config={config}
                        inputClass="home-search-bar"
                        inputSize="md"
                        containerClass="main-address-search"
                        placeholder="Enter an address"
                      />
                    )
                  }}
                </ConfigContext.Consumer>
              </div>
            </div>
            <p className="text-black text-center my-5">
              You can also{' '}
              <BaseLink className="font-weight-bold" href="/map">
                view data about a district or zip code
              </BaseLink>
              {' or '}
              <BaseLink className="font-weight-bold" href="/search">
                create a Custom Search
              </BaseLink>
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

LookupIndex.propTypes = {
  appState: PropTypes.object,
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

export default connect(mapStateToProps)(LookupIndex)
