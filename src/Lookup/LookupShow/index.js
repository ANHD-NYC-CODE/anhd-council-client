import React from 'react'
import PropTypes from 'prop-types'
import SummaryResultCard from 'shared/components/ResultCard/SummaryResultCard'
import { getCurrentBuilding } from 'Lookup/utilities'
import * as c from 'shared/constants'
import LookupAddressDisplay from 'Lookup/LookupAddressDisplay'
import BaseLink from 'shared/components/BaseLink'
import { geographyToLink } from 'shared/utilities/routeUtils'

import LayoutContext from 'Layout/LayoutContext'
import { boroCodeToName } from 'shared/utilities/languageUtils'
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { fireSwitchLookupTableEvent } from 'Store/Analytics/actions'
import { Badge, Row, Col, Button } from 'react-bootstrap'
import { setAppState } from 'Store/AppState/actions'
import RequestTableWrapper from 'shared/components/RequestTableWrapper'
import BuildingSelect from 'Lookup/BuildingSelect'
import RequestSummaryWrapper from 'shared/components/RequestSummaryWrapper'
import PrintLookup from 'Lookup/PrintLookup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import LookupSidebar from 'Lookup/LookupSidebar'

import classnames from 'classnames'
import './style.scss'
class LookupShow extends React.PureComponent {
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

    // Redirect user back to tax lot if landing on page from 1 building address
    if ((this.props.propertyResult.buildings || []).length == 1 && this.props.bin) {
      this.props.changeLookup(this.props.propertyResult.bbl, undefined)
    }
  }

  switchTable(request) {
    this.props.dispatch(fireSwitchLookupTableEvent(request.resourceModel.label))
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
            <div className="lookup-show layout-width-wrapper">
              <div className="lookup-show__top-row">
                <div>
                  <LookupAddressDisplay profile={this.props.propertyResult} />
                </div>
                <div>
                  {this.props.appState.currentGeographyType && this.props.appState.currentGeographyId && (
                    <BaseLink
                      href={geographyToLink(
                        this.props.appState.currentGeographyType,
                        this.props.appState.currentGeographyId
                      )}
                    >
                      <Button className="icon-button--right" variant="dark">
                        Back to dashboard <FontAwesomeIcon icon={faChevronRight} size="sm" />
                      </Button>
                    </BaseLink>
                  )}
                </div>
              </div>
              <div className="lookup-show__content-wrapper full-bleed--mobile">
                <LookupSidebar
                  appState={this.props.appState}
                  profileRequest={this.props.profileRequest}
                  propertyResult={this.props.propertyResult}
                />
                <div className="lookup-show__content">
                  <Row className="mt-2 mb-4 mt-lg-4 mb-lg-2 px-xl-3">
                    <Col>
                      <Row>
                        <Col />
                      </Row>

                      <Row className="mb-2">
                        <Col>
                          <h6 className="lookup-show__datatype-header mb-0">
                            {this.props.bin && !!Object.keys(this.props.propertyResult).length
                              ? 'Building Address'
                              : 'Tax Lot Address'}
                          </h6>
                          {this.props.bin && (
                            <small className="text-muted">* buildings may have alternate addresses</small>
                          )}
                          <h4 className="lookup-show__data-address font-weight-bold">
                            {this.props.bin && !!Object.keys(this.props.propertyResult).length
                              ? `${
                                  getCurrentBuilding(this.props.propertyResult.buildings, this.props.bin).house_number
                                } ${getCurrentBuilding(this.props.propertyResult.buildings, this.props.bin).stname}`
                              : this.props.propertyResult.address}
                            {!!Object.keys(this.props.propertyResult).length &&
                              `, ${boroCodeToName(this.props.propertyResult.borough)}`}{' '}
                          </h4>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} lg={4}>
                          <Row className="mb-4">
                            <Col>
                              <BuildingSelect
                                bbl={this.props.bbl}
                                bin={this.props.bin}
                                changeLookup={this.props.changeLookup}
                                propertyResult={this.props.propertyResult}
                              />
                            </Col>
                          </Row>
                          <Row className={classnames({ 'mb-4': this.props.bin })}>
                            {
                              // Property level requests
                            }
                            <Col xs={12}>
                              <h6 className="lookup-show__datatype-header">Tax Lot Level Data</h6>
                            </Col>
                            {this.props.lookupRequests
                              .filter(r => r.level === 'PROPERTY')
                              .map((request, index) => {
                                return (
                                  <Col
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={12}
                                    key={`rs-col-${index}-${request.resourceModel.resourceConstant}`}
                                  >
                                    <RequestSummaryWrapper
                                      key={`request-summary-${this.props.appState.requests.indexOf(request)}`}
                                      summaryBackgroundColorClass={'acris-yellow property-card'}
                                      onClick={() => this.switchTable(request)}
                                      selected={this.props.appState.selectedRequest === request}
                                      request={request}
                                      results={this.props.requests[request.requestConstant]}
                                      totalResults={this.props.requests[request.requestConstant]}
                                      label={request.resourceModel.label}
                                      resultsComponent={SummaryResultCard}
                                    />
                                  </Col>
                                )
                              })}
                          </Row>

                          <Row>
                            {
                              // Building level requests
                            }
                            {this.props.bin && (
                              <Col>
                                <h6 className="lookup-show__datatype-header">Building Level Data</h6>
                              </Col>
                            )}

                            {this.props.lookupRequests
                              .filter(r => r.level === 'BUILDING')
                              .map((request, index) => {
                                return (
                                  <Col
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={12}
                                    key={`rs-col-${index}-${request.resourceModel.resourceConstant}`}
                                  >
                                    <RequestSummaryWrapper
                                      summaryBackgroundColorClass={
                                        request.level === 'PROPERTY' || !this.props.bin
                                          ? 'acris-yellow property-card'
                                          : 'building-pink building-card'
                                      }
                                      key={`request-summary-${this.props.appState.requests.indexOf(request)}`}
                                      onClick={() => this.switchTable(request)}
                                      selected={this.props.appState.selectedRequest === request}
                                      request={request}
                                      results={this.props.requests[request.requestConstant]}
                                      totalResults={this.props.requests[request.requestConstant]}
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
                                <Col
                                  xs={12}
                                  key={`rw-col-${index}-${request.resourceModel.resourceConstant}`}
                                  className="request-wrapper-container"
                                >
                                  <RequestTableWrapper
                                    badge={
                                      request.level === 'PROPERTY' || !this.props.bin ? (
                                        <Badge className="acris-yellow">Tax Lot Data</Badge>
                                      ) : (
                                        <Badge className="building-pink building-card">Building Data</Badge>
                                      )
                                    }
                                    showUpdate={true}
                                    property={this.props.propertyResult}
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
                </div>
              </div>
            </div>
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
  profileRequest: PropTypes.object,
}

export default LookupShow
