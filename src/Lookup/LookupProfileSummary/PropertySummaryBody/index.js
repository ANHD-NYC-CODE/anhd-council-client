import React from 'react'
import PropTypes from 'prop-types'
import { boroCodeToName, constructAddressString } from 'shared/utilities/languageUtils'
import './style.scss'
import { Card, Row, Col } from 'react-bootstrap'
const PropertySummaryBody = props => {
  return (
    <Row className="property-summary-body p-2">
      <Col xs={12}>
        <Row>
          <Col>
            <h5>
              {constructAddressString({
                street: props.profile.address,
                borough: boroCodeToName(props.profile.borough),
                zip: props.profile.zipcode,
              })}
            </h5>
          </Col>
        </Row>
      </Col>
      <Col xs={6}>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">Owner Name: </label>
          <span className="profile-summary-body__value">{props.profile.ownername}</span>
        </Card.Text>

        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">Year Built: </label>
          <span className="profile-summary-body__value">{props.profile.yearbuilt}</span>
        </Card.Text>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">Zoning: </label>
          <span className="profile-summary-body__value">{props.profile.zonedist1}</span>
        </Card.Text>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">Rent Programs: </label>
          <span className="profile-summary-body__value">
            {props.profile.coresubsidyrecords.length
              ? props.profile.coresubsidyrecords.map(record => record.programname).join(' ')
              : ''}
          </span>
        </Card.Text>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">NYCHA? </label>
          <span className="profile-summary-body__value">{props.profile.nycha ? 'Yes' : 'No'}</span>
        </Card.Text>
      </Col>
      <Col xs={6}>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">BBL: </label>
          <span className="profile-summary-body__value">{props.profile.bbl}</span>
        </Card.Text>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">Total Units: </label>
          <span className="profile-summary-body__value">{props.profile.unitstotal || 0}</span>
        </Card.Text>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">Residential Units: </label>
          <span className="profile-summary-body__value">{props.profile.unitsres || 0}</span>
        </Card.Text>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">Stabilized Units: </label>
          <span className="profile-summary-body__value">{props.profile.unitsrentstabilized || 0}</span>
        </Card.Text>
        <Card.Text className="lookup-profile-summary__group">
          <label className="profile-summary-body__label">Tax Lien? </label>
          <span className="profile-summary-body__value">{props.profile.taxliens || 'No'}</span>
        </Card.Text>
      </Col>
    </Row>
  )
}

PropertySummaryBody.propTypes = {
  profile: PropTypes.object,
  showGeographyLinks: PropTypes.bool,
}

export default PropertySummaryBody
