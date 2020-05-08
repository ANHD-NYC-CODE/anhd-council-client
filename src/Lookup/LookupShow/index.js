import React from 'react'
import PropTypes from 'prop-types'
import { getCurrentBuilding } from 'Lookup/utilities'
import LookupTabs from 'Lookup/LookupTabs'

import * as c from 'shared/constants'
import LookupAddressDisplay from 'Lookup/LookupAddressDisplay'
import BaseLink from 'shared/components/BaseLink'
import { geographyToLink } from 'shared/utilities/routeUtils'

import LayoutContext from 'Layout/LayoutContext'
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { fireSwitchLookupTableEvent } from 'Store/Analytics/actions'
import { Badge, Button } from 'react-bootstrap'
import { setAppState } from 'Store/AppState/actions'
import LookupTable from 'Lookup/LookupTable'
import BuildingSelect from 'Lookup/BuildingSelect'
import PrintLookup from 'Lookup/PrintLookup'
import LookupLinks from 'Lookup/LookupLinks'
import { push } from 'connected-react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import LookupSidebar from 'Lookup/LookupSidebar'

import './style.scss'
class LookupShow extends React.PureComponent {
  constructor(props) {
    super(props)

    if (this.props.propertyError && this.props.propertyError.status === 404) {
      this.props.trigger404Error(`Property with bbl: ${this.props.bbl} not found.`)
    }

    this.switchTable = this.switchTable.bind(this)
    this.handleClearLookup = this.handleClearLookup.bind(this)
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
      !this.props.loadingState[this.props.profileRequest.requestConstant] &&
      this.props.bin &&
      Object.keys(this.props.propertyResult).length &&
      !this.props.propertyResult.buildings.some(b => b.bin === this.props.bin)
    ) {
      this.props.trigger404Error(
        <div>
          {`Building with bin: ${this.props.bin} not found at property with bbl: ${this.props.bbl}.`}
          <br />
          <a href={`/property/${this.props.bbl}`}>View property instead.</a>
        </div>
      )
    }

    if (this.props.propertyError && this.props.propertyError.status === 404) {
      this.props.trigger404Error(`Property with bbl: ${this.props.bbl} not found.`)
    }

    // Redirect user back to tax lot if landing on page from 1 building address
    if (
      !this.props.loadingState[this.props.profileRequest.requestConstant] &&
      (this.props.propertyResult.buildings || []).length == 1 &&
      this.props.bin
    ) {
      this.props.changeLookup(this.props.propertyResult.bbl, undefined)
    }
  }

  handleClearLookup() {
    this.props.dispatch(setAppState({ currentProperty: undefined, currentBuilding: undefined }))
    this.props.dispatch(push('/lookup'))
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
    console.log(this.props.propertyResult)
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
              <div className="lookup-show__content-wrapper">
                <LookupSidebar
                  appState={this.props.appState}
                  error={this.props.errorState[this.props.profileRequest.requestConstant]}
                  loading={this.props.loadingState[this.props.profileRequest.requestConstant]}
                  profileRequest={this.props.profileRequest}
                  propertyResult={this.props.propertyResult}
                />
                <div className="lookup-show__content">
                  <div className="lookup-show__row-wrapper">
                    <div className="lookup-show__top-row">
                      <LookupAddressDisplay handleClear={this.handleClearLookup} profile={this.props.propertyResult} />
                      {this.props.appState.linkLookupBackToDashboard && (
                        <BaseLink
                          className="lookup-show__back-to-dashboard"
                          href={geographyToLink(
                            this.props.appState.currentGeographyType,
                            this.props.appState.currentGeographyId
                          )}
                        >
                          <Button className="icon-button--right" variant="dark" size="sm">
                            Back to dashboard <FontAwesomeIcon icon={faChevronRight} size="sm" />
                          </Button>
                        </BaseLink>
                      )}
                    </div>
                    <div className="lookup-show__building-row">
                      <BuildingSelect
                        bbl={this.props.bbl}
                        bin={this.props.bin}
                        changeLookup={this.props.changeLookup}
                        propertyResult={this.props.propertyResult}
                      />
                    </div>
                  </div>
                  <LookupTabs
                    appState={this.props.appState}
                    dispatch={this.props.dispatch}
                    isBuildingView={!!this.props.bin}
                    errorState={this.props.errorState}
                    loadingState={this.props.loadingState}
                    requests={this.props.requests}
                    lookupRequests={this.props.lookupRequests}
                    switchTable={this.switchTable}
                  />
                  <div className="lookup-show__tables">
                    {this.props.lookupRequests.map((request, index) => {
                      return (
                        <LookupTable
                          badge={
                            request.level === 'PROPERTY' || !this.props.bin ? (
                              <Badge className="tab-color--primary">Tax Lot Data</Badge>
                            ) : (
                              <Badge className="tab-color--secondary">Building Data</Badge>
                            )
                          }
                          loading={this.props.loadingState[request.requestConstant]}
                          property={this.props.propertyResult}
                          bin={this.props.appState.currentBuilding}
                          caption={request.resourceModel.label}
                          key={`lookup-table-${request.resourceModel.resourceConstant}`}
                          visible={this.props.appState.selectedRequest === request}
                          request={request}
                        />
                      )
                    })}
                  </div>
                  <div className="lookup-show__links">
                    <LookupLinks property={this.props.propertyResult} bin={this.props.appState.currentBuilding} />
                  </div>
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
  appState: PropTypes.object,
  loadingState: PropTypes.object,
  dispatch: PropTypes.func,
  bin: PropTypes.string,
  requests: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  changeLookup: PropTypes.func,
  propertyResult: PropTypes.object,
  profileRequest: PropTypes.object,
}

export default LookupShow
