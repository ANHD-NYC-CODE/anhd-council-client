import React from 'react'
import PropTypes from 'prop-types'
import ConfigContext from 'Config/ConfigContext'

import OwnershipSection from 'Lookup/LookupProfileSummary/OwnershipSection'
import RentStabilizationSection from 'Lookup/LookupProfileSummary/RentStabilizationSection'
import ProgramSection from 'Lookup/LookupProfileSummary/ProgramSection'
import PropertySummaryBody from 'Lookup/LookupProfileSummary/PropertySummaryBody'

import './style.scss'

const PrintLookupProfileSummary = props => (
  <div
    tabIndex="-1"
    role="button"
    className="print-lookup-profile-summary"
    onKeyDown={e => e.preventDefault()}
    onClick={e => e.preventDefault()}
  >
    <PropertySummaryBody print={true} onClick={e => e.preventDefault()} profile={props.profile} />
    <ConfigContext.Consumer>
      {config => {
        return (
          <div>
            <OwnershipSection profile={props.profile} dispatch={props.dispatch} request={props.request} />
            <ProgramSection config={config} profile={props.profile} />

            <RentStabilizationSection
              config={config}
              profile={props.profile}
              dispatch={props.dispatch}
              request={props.request}
            />
          </div>
        )
      }}
    </ConfigContext.Consumer>
  </div>
)

PrintLookupProfileSummary.propTypes = {
  profile: PropTypes.object,
}

export default PrintLookupProfileSummary
