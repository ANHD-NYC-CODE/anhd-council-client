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
      <Col>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Total Units</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">{props.profile.unitstotal || 0}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Residential Units</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">{props.profile.unitsres || 0}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Year Built</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">{props.profile.yearbuilt}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Zoning District(s)</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">
              {[props.profile.zonedist1, props.profile.zonedist2, props.profile.zonedist3, props.profile.zonedist4]
                .filter(x => !!x)
                .join(', ')}
            </span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Overlay(s)</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">
              {[props.profile.overlay1, props.profile.overlay2].filter(x => !!x).join(', ')}
            </span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Special District(s)</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">
              {[props.profile.spdist1, props.profile.spdist2, props.profile.spdist3].filter(x => !!x).join(', ')}
            </span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Built Floor Area Ratio (FAR)</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">{props.profile.builtfar}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Maximum Residential FAR</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">{props.profile.residfar}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Maximum Commercial FAR</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">{props.profile.commfar}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col xs={8}>
            <label className="profile-summary-body__label">Maximum Community Facility FAR</label>
          </Col>
          <Col xs={4}>
            <span className="profile-summary-body__value">{props.profile.facilfar}</span>
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
