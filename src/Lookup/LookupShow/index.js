import React from 'react'
import PropTypes from 'prop-types'
import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'
import { getCurrentBuilding } from 'Lookup/utilities'

import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'
import LayoutContext from 'Layout/LayoutContext'

import { Row, Col, InputGroup } from 'react-bootstrap'

import RequestTableWrapper from 'shared/components/RequestTableWrapper'
import BuildingSelect from 'Lookup/BuildingSelect'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import LookupLinks from 'Lookup/LookupLinks'
import PrintLookup from 'Lookup/PrintLookup'
import PrintButton from 'shared/components/PrintButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
class LookupShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRequest: props.lookupRequests.length ? props.lookupRequests[0] : undefined,
    }

    if (this.props.propertyError && this.props.propertyError.status === 404) {
      this.props.trigger404Error(`Property with bbl: ${this.props.bbl} not found.`)
    }

    this.switchTable = this.switchTable.bind(this)
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
    this.setState({
      selectedRequest: request,
    })
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
              <Col className="lookup-show__property-column px-lg-2 px-xl-5" xs={12} lg={4}>
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
                    <RequestTableWrapper request={this.props.profileRequest} visible={true} />
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
                      selectedRequest={this.props.profileRequest}
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
              <Col xs={12} lg={8}>
                <Row className="mt-2 mb-4 mt-lg-4 mb-lg-2 px-xl-5">
                  <Col>
                    <Row>
                      <Col>
                        <Row>
                          <Col xs={9}>
                            <h3 className="text-muted font-weight-bold text-uppercase">
                              {this.props.bin ? 'Building Data' : 'Property Data'}
                            </h3>
                          </Col>
                          <Col xs={3}>
                            <PrintButton textClass="text-muted d-none d-md-block" title={this.getPrintTitle()} />
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
                        <h4 className="text-muted font-weight-bold">
                          {this.props.bin && !!Object.keys(this.props.propertyResult).length
                            ? `${
                                getCurrentBuilding(this.props.propertyResult.buildings, this.props.bin).house_number
                              } ${getCurrentBuilding(this.props.propertyResult.buildings, this.props.bin).stname}`
                            : this.props.propertyResult.address}
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
                        <Row>
                          {this.props.lookupRequests.map((request, index) => {
                            return (
                              <Col xs={12} sm={6} md={4} lg={12} key={`rs-col-${index}`}>
                                <RequestSummaryWrapper
                                  key={`request-summary-${this.props.appState.requests.indexOf(request)}`}
                                  onClick={r => this.switchTable(r)}
                                  selected={this.state.selectedRequest === request}
                                  request={request}
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
                                  key={`request-wrapper-${this.props.appState.requests.indexOf(request)}`}
                                  visible={this.state.selectedRequest === request}
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
