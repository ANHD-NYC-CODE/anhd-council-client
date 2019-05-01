import React from 'react'
import PropTypes from 'prop-types'
import { boroCodeToName, constructAddressString } from 'shared/utilities/languageUtils'
import BaseLink from 'shared/components/BaseLink'
import './style.scss'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'
import { geographyToLink } from 'shared/utilities/routeUtils'

const PropertySummaryBody = props => {
  return (
    <Row className="property-summary-body property-section">
      <Col xs={12}>
        <Row>
          <Col>
            <Row>
              <Col>
                <h6 className="font-weight-bold text-muted">Primary tax lot address</h6>
              </Col>
            </Row>
            <h5>
              {constructAddressString({
                street: props.profile.address,
                borough: boroCodeToName(props.profile.borough),
                zip: props.profile.zipcode,
              })}
            </h5>
          </Col>
        </Row>
        <hr />
        <Row className="lookup-profile-summary__group">
          <Col>
            <label className="profile-summary-body__label">BBL </label>
          </Col>
          <Col>
            <span className="profile-summary-body__value">{props.profile.bbl}</span>
          </Col>
        </Row>
        {!props.print && (
          <div>
            <Row>
              <Col>
                <label className="profile-summary-body__label">Council District</label>
              </Col>
              <Col>
                <span className="d-flex profile-summary__geography">
                  <BaseLink
                    className="profile-summary-body__value "
                    href={geographyToLink('COUNCIL', props.profile.council)}
                  >
                    {councilIdToString(props.profile.council, false)}
                    <FontAwesomeIcon className="ml-2" icon={faLocationArrow} size="xs" />
                  </BaseLink>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="profile-summary-body__label">Community District</label>
              </Col>
              <Col>
                <span className="d-flex  profile-summary__geography">
                  <BaseLink
                    className="profile-summary-body__value "
                    href={geographyToLink('COMMUNITY', props.profile.cd)}
                  >
                    {`${communityIdToString(props.profile.cd)}`}
                    <FontAwesomeIcon className="ml-2" icon={faLocationArrow} size="xs" />
                  </BaseLink>
                </span>
              </Col>
            </Row>
            <hr />
          </div>
        )}
      </Col>

      <Col xs={6}>
        <Row className="lookup-profile__geography-link">
          <Col>
            <label className="profile-summary-body__label">Year Built</label>
            <span className="profile-summary-body__value">{props.profile.yearbuilt}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col>
            <label className="profile-summary-body__label">Zoning</label>
            <span className="profile-summary-body__value">{props.profile.zonedist1}</span>
          </Col>
        </Row>
      </Col>
      <Col xs={6}>
        <Row className="lookup-profile-summary__group">
          <Col>
            <label className="profile-summary-body__label">Total Units</label>
            <span className="profile-summary-body__value">{props.profile.unitstotal || 0}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col>
            <label className="profile-summary-body__label">Residential Units</label>
            <span className="profile-summary-body__value">{props.profile.unitsres || 0}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

PropertySummaryBody.propTypes = {
  profile: PropTypes.object,
  showGeographyLinks: PropTypes.bool,
}

export default PropertySummaryBody
