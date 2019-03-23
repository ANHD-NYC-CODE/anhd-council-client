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
                <Row>
                  <Col>
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
                      <Col>
                        <Row>
                          <Col xs={8}>
                            <h4>Building Info</h4>
                          </Col>
                          <Col xs={4}>
                            <PrintButton title={this.getPrintTitle()} />
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
