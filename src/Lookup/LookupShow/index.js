import React from 'react'
import PropTypes from 'prop-types'
import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'
import { getCurrentBuilding } from 'Lookup/utilities'

import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'
import LayoutContext from 'Layout/LayoutContext'
import { addressResultToPath } from 'shared/utilities/routeUtils'
import { boroCodeToName } from 'shared/utilities/languageUtils'
import BaseLink from 'shared/components/BaseLink'
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { Button, Row, Col, InputGroup } from 'react-bootstrap'
import { setAppState } from 'Store/AppState/actions'
import RequestTableWrapper from 'shared/components/RequestTableWrapper'
import BuildingSelect from 'Lookup/BuildingSelect'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import LookupLinks from 'Lookup/LookupLinks'
import PrintLookup from 'Lookup/PrintLookup'
import PrintButton from 'shared/components/PrintButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

import './style.scss'
class LookupShow extends React.Component {
  constructor(props) {
    super(props)

    if (this.props.propertyError && this.props.propertyError.status === 404) {
      this.props.trigger404Error(`Property with bbl: ${this.props.bbl} not found.`)
    }

    this.switchTable = this.switchTable.bind(this)
  }

  componentDidMount() {
    scrollSpy.update()
    scroll.scrollToTop({
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
    this.props.dispatch(
      setAppState({
        selectedRequest: this.props.lookupRequests[0],
      })
    )
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  componentDidUpdate() {
    if (
      this.props.bin &&
      Object.keys(this.props.propertyResult).length &&
      !this.props.propertyResult.buildings.some(b => b.bin === this.props.bin)
    ) {
      this.props.trigger404Error(
        `Building with bin: ${this.props.bin} not found at property with bbl: ${this.props.bbl}.`
      )
    }
    if (this.props.propertyError && this.props.propertyError.status === 404) {
      this.props.trigger404Error(`Property with bbl: ${this.props.bbl} not found.`)
    }
  }

  switchTable(request) {
    this.props.dispatch(
      setAppState({
        selectedRequest: request,
      })
    )
  }

  isBuildingView() {
    return !!this.props.bin
  }

  getPrintTitle() {
    let address, reportType
    if (!Object.keys(this.props.propertyResult).length) return
    if (this.isBuildingView()) {
      reportType = 'building'
      const building = getCurrentBuilding(this.props.propertyResult.buildings, this.props.bin)
      address = `${building.house_number} ${building.stname}`
    } else {
      reportType = 'property'
      address = this.props.propertyResult.address
    }

    return `${address}, ${this.props.propertyResult.borough} ${this.props.propertyResult.zipcode} ${reportType} summary`
  }

  render() {
    return (
      <LayoutContext.Consumer>
        {layout =>
          layout.print ? (
            <PrintLookup
              appState={this.props.appState}
              bin={this.props.bin}
              layout={layout}
              lookupRequests={this.props.lookupRequests}
              propertyResult={this.props.propertyResult}
              profileRequest={this.props.profileRequest}
            />
          ) : (
            <Row className="lookup-show">
              <Col className="layout__left-column lookup-show__property-column px-lg-2 px-xl-5" xs={12} lg={5}>
                <Row className="mt-4">
                  <Col xs={12}>
                    <h3 className="text-light-gray font-weight-bold text-uppercase">Property Info</h3>
                  </Col>
                </Row>
                <Row className="mt-2 mb-4">
                  <Col>
                    <InputGroup className="lookup-show__address-group flex-nowrap">
                      <InputGroup.Append className="flex-column justify-content-center">
                        <FontAwesomeIcon className=" mr-2 text-white" size="2x" icon={faSearch} />
                      </InputGroup.Append>
                      <AddressSearch />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <RequestTableWrapper
                      caption={this.props.profileRequest.resourceModel.label}
                      request={this.props.profileRequest}
                      visible={true}
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <LeafletMap
                      appState={this.props.appState}
                      currentGeographyType={this.props.appState.currentGeographyType}
                      center={
                        this.props.propertyResult.lat
                          ? [this.props.propertyResult.lat, this.props.propertyResult.lng]
                          : undefined
                      }
                      displayedRequest={this.props.appState.requests.find(request => request.type === 'LOOKUP_PROFILE')}
                      iconConfig="SINGLE"
                      zoom={15}
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <LookupLinks request={this.props.profileRequest} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} lg={7}>
                <Row className="mt-2 mb-4 mt-lg-4 mb-lg-2 px-xl-3">
                  <Col>
                    <Row>
                      <Col>
                        <Row>
                          <Col xs={9}>
                            <h3 className="lookup-show__data-header text-muted font-weight-bold text-uppercase">
                              <FontAwesomeIcon icon={this.props.bin ? faBuilding : faLayerGroup} size="1x" />
                              {this.props.bin ? 'Building Data' : 'Property Data'}
                            </h3>
                          </Col>
                          <Col xs={3}>
                            <PrintButton textClass="text-dark d-none d-md-block" title={this.getPrintTitle()} />
                          </Col>
                        </Row>
                        <BuildingSelect
                          bbl={this.props.bbl}
                          bin={this.props.bin}
                          changeLookup={this.props.changeLookup}
                          request={this.props.profileRequest}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col>
                        <h4 className="lookup-show__data-address font-weight-bold">
                          {this.props.bin && !!Object.keys(this.props.propertyResult).length
                            ? `${
                                getCurrentBuilding(this.props.propertyResult.buildings, this.props.bin).house_number
                              } ${getCurrentBuilding(this.props.propertyResult.buildings, this.props.bin).stname}`
                            : this.props.propertyResult.address}
                          {!!Object.keys(this.props.propertyResult).length &&
                            `, ${boroCodeToName(this.props.propertyResult.borough)}`}
                        </h4>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <h6 className="font-weight-bold">Select Filter ></h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} lg={4}>
                        {this.props.bin && (
                          <Row className="mb-2">
                            <Col xs={12}>
                              <BaseLink
                                className="text-left d-inline-block mb-2"
                                href={`${addressResultToPath({ bbl: this.props.bbl })}`}
                                onClick={() => this.props.changeLookup(this.props.bbl)}
                              >
                                <Button className="text-left" variant="outline-primary">
                                  View Sales, Evictions, and Foreclosures.
                                </Button>
                              </BaseLink>
                            </Col>
                          </Row>
                        )}
                        <Row>
                          {this.props.lookupRequests.map((request, index) => {
                            return (
                              <Col xs={12} sm={6} md={4} lg={12} key={`rs-col-${index}`}>
                                <RequestSummaryWrapper
                                  key={`request-summary-${this.props.appState.requests.indexOf(request)}`}
                                  onClick={() => this.switchTable(request)}
                                  selected={this.props.appState.selectedRequest === request}
                                  request={request}
                                  label={request.resourceModel.label}
                                  resultsComponent={SummaryResultCard}
                                />
                              </Col>
                            )
                          })}
                        </Row>
                      </Col>
                      <Col xs={12} lg={8}>
                        <Row>
                          {this.props.lookupRequests.map((request, index) => {
                            return (
                              <Col xs={12} key={`rw-col-${index}`} className="request-wrapper-container">
                                <RequestTableWrapper
                                  caption={request.resourceModel.label}
                                  key={`request-wrapper-${this.props.appState.requests.indexOf(request)}`}
                                  visible={this.props.appState.selectedRequest === request}
                                  request={request}
                                />
                              </Col>
                            )
                          })}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        }
      </LayoutContext.Consumer>
    )
  }
}

LookupShow.defaultProps = {
  propertyResult: {},
}

LookupShow.propTypes = {
  dispatch: PropTypes.func,
  bin: PropTypes.string,
  requests: PropTypes.array,
  changeLookup: PropTypes.func,
  propertyResult: PropTypes.object,
}

export default LookupShow
