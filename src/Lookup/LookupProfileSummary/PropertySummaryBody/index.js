import React from 'react'
import PropTypes from 'prop-types'
import BaseLink from 'shared/components/BaseLink'
import './style.scss'
import InfoModalButton from 'shared/components/InfoModalButton'

import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'
import { geographyToLink } from 'shared/utilities/routeUtils'

const PropertySummaryBody = props => {
  return (
    <div className="property-summary-body property-section">
      <div className="lookup-profile-summary__group">
        <span className="profile-summary-body__label">
          BBL <InfoModalButton className="lookup-profile-summary__info" modalConstant="LOOKUP_BBL" />
        </span>
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
          <div className="lookup-profile-summary__group">
            <span className="profile-summary-body__label">State Assembly</span>
            <span className="d-flex profile-summary-body__value profile-summary__geography">
              {props.profile.stateassembly} (
              <BaseLink href={geographyToLink('STATE_ASSEMBLY', props.profile.stateassembly)}>Visit</BaseLink>)
            </span>
          </div>
          <div className="lookup-profile-summary__group">
            <span className="profile-summary-body__label">State Senate</span>
            <span className="d-flex profile-summary-body__value profile-summary__geography">
              {props.profile.statesenate} (
              <BaseLink href={geographyToLink('STATE_SENATE', props.profile.statesenate)}>Visit</BaseLink>)
            </span>
          </div>
          <div className="lookup-profile-summary__group">
            <span className="profile-summary-body__label">Zip Code</span>
            <span className="d-flex profile-summary-body__value profile-summary__geography">
              {props.profile.zipcode} (
              <BaseLink href={geographyToLink('ZIPCODE', props.profile.zipcode)}>Visit</BaseLink>)
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
