import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/Loaders/InnerLoader'
import ConfigContext from 'Config/ConfigContext'
import TableAlert from 'shared/components/BaseTable/TableAlert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import PropertySummaryBody from 'Lookup/LookupProfileSummary/PropertySummaryBody'
import OwnershipSection from 'Lookup/LookupProfileSummary/OwnershipSection'
import RentStabilizationSection from 'Lookup/LookupProfileSummary/RentStabilizationSection'
import ProgramSection from 'Lookup/LookupProfileSummary/ProgramSection'
import ZoningSection from 'Lookup/LookupProfileSummary/ZoningSection'
import LocationSection from 'Lookup/LookupProfileSummary/LocationSection'
import ExpandableSection from 'shared/components/ExpandableSection'

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
                        <ExpandableSection
                          aboveFoldElement={
                            <div className="lookup-sidebar__header">
                              <h5>Property Info</h5>
                            </div>
                          }
                          className="lookup-profile-summary__section-header"
                          iconClass="lookup-profile-summary__expandable-icon"
                          collapseIcon={<FontAwesomeIcon size="lg" icon={faChevronUp} />}
                          expandIcon={<FontAwesomeIcon size="lg" icon={faChevronDown} />}
                          startsOpen={window.matchMedia('(min-width: 576px)').matches}
                        >
                          <PropertySummaryBody config={config} profile={props.propertyResult} />
                        </ExpandableSection>
                        <ExpandableSection
                          aboveFoldElement={<h5>Rent Stabilization</h5>}
                          className="lookup-profile-summary__section-header"
                          iconClass="lookup-profile-summary__expandable-icon"
                          collapseIcon={<FontAwesomeIcon size="lg" icon={faChevronUp} />}
                          expandIcon={<FontAwesomeIcon size="lg" icon={faChevronDown} />}
                        >
                          <RentStabilizationSection
                            config={config}
                            profile={props.propertyResult}
                            request={props.request}
                          />
                        </ExpandableSection>
                        <ExpandableSection
                          aboveFoldElement={<h5>Ownership</h5>}
                          className="lookup-profile-summary__section-header"
                          iconClass="lookup-profile-summary__expandable-icon"
                          collapseIcon={<FontAwesomeIcon size="lg" icon={faChevronUp} />}
                          expandIcon={<FontAwesomeIcon size="lg" icon={faChevronDown} />}
                        >
                          <OwnershipSection profile={props.propertyResult} request={props.request} />
                        </ExpandableSection>
                        <ExpandableSection
                          aboveFoldElement={<h5>Programs/Statuses</h5>}
                          className="lookup-profile-summary__section-header"
                          iconClass="lookup-profile-summary__expandable-icon"
                          collapseIcon={<FontAwesomeIcon size="lg" icon={faChevronUp} />}
                          expandIcon={<FontAwesomeIcon size="lg" icon={faChevronDown} />}
                        >
                          <ProgramSection config={config} profile={props.propertyResult} />
                        </ExpandableSection>
                        <ExpandableSection
                          aboveFoldElement={<h5>Zoning</h5>}
                          className="lookup-profile-summary__section-header"
                          iconClass="lookup-profile-summary__expandable-icon"
                          collapseIcon={<FontAwesomeIcon size="lg" icon={faChevronUp} />}
                          expandIcon={<FontAwesomeIcon size="lg" icon={faChevronDown} />}
                        >
                          <ZoningSection profile={props.propertyResult} />
                        </ExpandableSection>
                        <ExpandableSection
                          aboveFoldElement={<h5>Location</h5>}
                          className="lookup-profile-summary__section-header"
                          iconClass="lookup-profile-summary__expandable-icon"
                          collapseIcon={<FontAwesomeIcon size="lg" icon={faChevronUp} />}
                          expandIcon={<FontAwesomeIcon size="lg" icon={faChevronDown} />}
                          startsOpen={window.matchMedia('(min-width: 576px)').matches}
                        >
                          <LocationSection
                            appState={props.appState}
                            lat={props.propertyResult.lat}
                            lng={props.propertyResult.lng}
                            propertyResult={props.propertyResult}
                          />
                        </ExpandableSection>
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
  propertyResult: PropTypes.object,
}

LookupProfileSummary.defaultProps = {
  appState: {},
  loading: true,
  error: null,
  propertyResult: {},
}

export default LookupProfileSummary
