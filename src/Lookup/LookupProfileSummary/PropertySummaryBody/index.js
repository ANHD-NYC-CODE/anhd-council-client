import React from 'react'
import PropTypes from 'prop-types'
import BaseLink from 'shared/components/BaseLink'
import './style.scss'

import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'
import { geographyToLink } from 'shared/utilities/routeUtils'

const PropertySummaryBody = props => {
  return (
    <div className="property-summary-body property-section">
      <div className="lookup-profile-summary__group">
        <span className="profile-summary-body__label">BBL</span>
        <span className="profile-summary-body__value">{props.profile.bbl}</span>
      </div>
      {!props.print && (
        <div>
          <div className="lookup-profile-summary__group">
            <span className="profile-summary-body__label">Council District</span>
            <span className="d-flex profile-summary-body__value profile-summary__geography">
              {councilIdToString(props.profile.council, false)} (
              <BaseLink href={geographyToLink('COUNCIL', props.profile.council)}>Visit</BaseLink>)
            </span>
          </div>
          <div className="lookup-profile-summary__group">
            <span className="profile-summary-body__label">Community District</span>
            <span className="d-flex profile-summary-body__value profile-summary__geography">
              {`${communityIdToString(props.profile.cd)}`} (
              <BaseLink href={geographyToLink('COMMUNITY', props.profile.cd)}>Visit</BaseLink>)
            </span>
          </div>
        </div>
      )}
      <div className="lookup-profile-summary__group">
        <span className="profile-summary-body__label">Total Units</span>
        <span className="profile-summary-body__value">{props.profile.unitstotal || 0}</span>
      </div>
      <div className="lookup-profile-summary__group">
        <span className="profile-summary-body__label">Residential Units</span>
        <span className="profile-summary-body__value">{props.profile.unitsres || 0}</span>
      </div>
      <div className="lookup-profile-summary__group">
        <span className="profile-summary-body__label">Year Built</span>
        <span className="profile-summary-body__value">{props.profile.yearbuilt}</span>
      </div>
    </div>
  )
}

PropertySummaryBody.propTypes = {
  profile: PropTypes.object,
  showGeographyLinks: PropTypes.bool,
}

export default PropertySummaryBody
