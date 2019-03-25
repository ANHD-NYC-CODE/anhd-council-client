import React from 'react'
import PropTypes from 'prop-types'
import SummaryResultCard from 'shared/components/SummaryResultCard'
import { getCurrentBuilding } from 'Lookup/utilities'

import LeafletMap from 'LeafletMap'
import AddressSearch from 'Lookup/AddressSearch'
import LayoutContext from 'Layout/LayoutContext'

import { Row, Col } from 'react-bootstrap'

import RequestWrapper from 'shared/components/RequestWrapper'
import BuildingSelect from 'Lookup/BuildingSelect'
import RequestSummary from 'shared/components/RequestSummary'
import LookupLinks from 'Lookup/LookupLinks'
import PrintLookup from 'Lookup/PrintLookup'
import PrintButton from 'shared/components/PrintButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class LookupShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRequest: props.lookupRequests.length ? props.lookupRequests[0] : undefined,
    }

    this.switchTable = this.switchTable.bind(this)
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
            <Row>
              <Col xs={12} lg={4}>
                <Row className="mt-4">
                  <Col xs={12}>
                    <h3 className="text-muted font-weight-bold text-uppercase">Property Info</h3>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col
                    className="d-flex flex-column align-content-center justify-content-center"
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                  >
                    <FontAwesomeIcon size="lg" icon={faSearch} />
                  </Col>
                  <Col xs={11} sm={11} md={11} lg={11}>
                    <AddressSearch />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <RequestWrapper request={this.props.profileRequest} visible={true} />
                  </Col>
                </Row>
                <Row>
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
                <Row>
                  <Col>
                    <LookupLinks request={this.props.profileRequest} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} lg={8}>
                <Row className="mt-2 mb-4 mt-lg-4 mb-lg-2">
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
                            <PrintButton textClass="text-muted" title={this.getPrintTitle()} />
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
                    <Row>
                      <Col xs={12} lg={3}>
                        <Row>
                          {this.props.lookupRequests.map((request, index) => {
                            return (
                              <Col xs={12} sm={6} md={4} lg={12} key={`rs-col-${index}`}>
                                <RequestSummary
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
                      <Col xs={12} lg={9}>
                        <Row>
                          {this.props.lookupRequests.map((request, index) => {
                            return (
                              <Col xs={12} key={`rw-col-${index}`} className="request-wrapper-container">
                                <RequestWrapper
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
