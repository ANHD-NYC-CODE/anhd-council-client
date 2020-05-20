import React from 'react'
import PropTypes from 'prop-types'
import BaseLink from 'shared/components/BaseLink'

const ZoningSection = props => {
  return (
    <div className="property-summary-body property-section">
      <div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Zoning District(s)</span>
          <span className="profile-summary-body__value">
            {[props.profile.zonedist1, props.profile.zonedist2, props.profile.zonedist3, props.profile.zonedist4]
              .filter(x => !!x)
              .join(', ') || 'none'}
          </span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Overlay(s)</span>
          <span className="profile-summary-body__value">
            {[props.profile.overlay1, props.profile.overlay2].filter(x => !!x).join(', ') || 'none'}
          </span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Special District(s)</span>
          <span className="profile-summary-body__value">
            {[props.profile.spdist1, props.profile.spdist2, props.profile.spdist3].filter(x => !!x).join(', ') ||
              'none'}
          </span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Built Floor Area Ratio (FAR)</span>
          <span className="profile-summary-body__value">{parseFloat(props.profile.builtfar).toFixed(1)}</span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Maximum Residential FAR</span>
          <span className="profile-summary-body__value">{parseFloat(props.profile.residfar).toFixed(1)}</span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Maximum Commercial FAR</span>
          <span className="profile-summary-body__value">{parseFloat(props.profile.commfar).toFixed(1)}</span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Maximum Community Facility FAR</span>
          <span className="profile-summary-body__value">{parseFloat(props.profile.facilfar).toFixed(1)}</span>
        </div>
      </div>
      <div className="lookup-profile-summary__link">
        View more zoning information at{' '}
        <BaseLink
          className="text-link"
          href={`https://zola.planning.nyc.gov/lot/${props.profile.bbl.charAt(0)}/${props.profile.bbl.slice(
            1,
            6
          )}/${props.profile.bbl.slice(6, 10)}`}
          text="ZoLa"
        />
      </div>
    </div>
  )
}

ZoningSection.propTypes = {
  profile: PropTypes.object,
}
ZoningSection.defaultProps = {}

export default ZoningSection
