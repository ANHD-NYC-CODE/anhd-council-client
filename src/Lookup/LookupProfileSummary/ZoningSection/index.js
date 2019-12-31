import React from 'react'
import PropTypes from 'prop-types'

const ZoningSection = props => {
  return (
    <div className="property-summary-body property-section">
      <div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Zoning District(s)</span>
          <span className="profile-summary-body__value">
            {[props.profile.zonedist1, props.profile.zonedist2, props.profile.zonedist3, props.profile.zonedist4]
              .filter(x => !!x)
              .join(', ')}
          </span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Overlay(s)</span>
          <span className="profile-summary-body__value">
            {[props.profile.overlay1, props.profile.overlay2].filter(x => !!x).join(', ')}
          </span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Special District(s)</span>
          <span className="profile-summary-body__value">
            {[props.profile.spdist1, props.profile.spdist2, props.profile.spdist3].filter(x => !!x).join(', ')}
          </span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Built Floor Area Ratio (FAR)</span>
          <span className="profile-summary-body__value">{props.profile.builtfar}</span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Maximum Residential FAR</span>
          <span className="profile-summary-body__value">{props.profile.residfar}</span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Maximum Commercial FAR</span>
          <span className="profile-summary-body__value">{props.profile.commfar}</span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Maximum Community Facility FAR</span>
          <span className="profile-summary-body__value">{props.profile.facilfar}</span>
        </div>
      </div>
    </div>
  )
}

ZoningSection.propTypes = {
  profile: PropTypes.object,
}
ZoningSection.defaultProps = {}

export default ZoningSection
