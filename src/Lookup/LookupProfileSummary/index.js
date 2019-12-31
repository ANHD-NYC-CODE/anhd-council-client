import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
import ConfigContext from 'Config/ConfigContext'
import TableAlert from 'shared/components/BaseTable/TableAlert'

import PropertySummaryBody from 'Lookup/LookupProfileSummary/PropertySummaryBody'
import OwnershipSection from 'Lookup/LookupProfileSummary/OwnershipSection'
import RentStabilizationSection from 'Lookup/LookupProfileSummary/RentStabilizationSection'
import ProgramSection from 'Lookup/LookupProfileSummary/ProgramSection'
import ZoningSection from 'Lookup/LookupProfileSummary/ZoningSection'
import ToggleableSection from 'Lookup/LookupProfileSummary/ToggleableSection'

import LeafletMap from 'LeafletMap'

import PrintLookupProfileSummary from 'Lookup/PrintLookupProfileSummary'
import LayoutContext from 'Layout/LayoutContext'
import './style.scss'

const LookupProfileSummary = props => {
  if (props.loading) {
    return <InnerLoader />
  } else if (props.error) {
    return <TableAlert message={props.error.message} />
  } else if (Object.keys(props.propertyResult).length) {
    return (
      <LayoutContext.Consumer>
        {layout => {
          return layout.print ? (
            <PrintLookupProfileSummary profile={props.propertyResult} />
          ) : (
            <div className="lookup-profile-summary">
              <div className="lookup-profile-summary__body">
                <ConfigContext.Consumer>
                  {config => {
                    return (
                      <div>
                        <PropertySummaryBody config={config} profile={props.propertyResult} />
                        <ToggleableSection title="Rent Stabilization">
                          <RentStabilizationSection
                            config={config}
                            profile={props.propertyResult}
                            request={props.request}
                          />
                        </ToggleableSection>
                        <ToggleableSection title="Ownership">
                          <OwnershipSection profile={props.propertyResult} request={props.request} />
                        </ToggleableSection>
                        <ToggleableSection title="Programs/Statuses">
                          <ProgramSection config={config} profile={props.propertyResult} />
                        </ToggleableSection>
                        <ToggleableSection title="Zoning">
                          <ZoningSection profile={props.propertyResult} />
                        </ToggleableSection>
                        <ToggleableSection startsOpen={true} title="Location">
                          <LeafletMap
                            appState={props.appState}
                            currentGeographyType={props.appState.currentGeographyType}
                            center={
                              props.propertyResult.lat
                                ? [props.propertyResult.lat, props.propertyResult.lng]
                                : undefined
                            }
                            results={props.propertyResult}
                            iconConfig="SINGLE"
                            zoom={17}
                          />
                        </ToggleableSection>
                      </div>
                    )
                  }}
                </ConfigContext.Consumer>
              </div>
            </div>
          )
        }}
      </LayoutContext.Consumer>
    )
  } else {
    return null
  }
}
LookupProfileSummary.propTypes = {
  appState: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  propertyResult: {},
}

LookupProfileSummary.propTypes = {
  propertyResult: PropTypes.object,
}

export default LookupProfileSummary
