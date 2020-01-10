import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import { geographySelectionToString } from 'shared/utilities/languageUtils'
import { communityToCommunityProfileLink } from 'shared/utilities/routeUtils'
import BaseLink from 'shared/components/BaseLink'

import './style.scss'

const GeographyProfile = props => {
  return (
    <div className="geography-links">
      <Card.Body>
        <h4>{geographySelectionToString({ type: props.currentGeographyType, id: props.currentGeographyId })}</h4>
        <h6>External Links:</h6>
        {renderLinks(props)}
      </Card.Body>
    </div>
  )
}

const renderLinks = props => {
  switch (props.currentGeographyType) {
    case 'COUNCIL':
      return (
        <Col>
          <Row className="mb-2">
            <BaseLink
              href={`https://council.nyc.gov/district-${props.currentGeographyId}/`}
              text="City Council Website"
            />
          </Row>
          <Row className="mb-2">
            <BaseLink
              href={'https://www1.nyc.gov/site/planning/data-maps/nyc-population/census-2010.page'}
              text="Census & Demographic Data"
            />
          </Row>
          <Row className="mb-2">
            <BaseLink
              href="https://popfactfinder.planning.nyc.gov/#12.25/40.724/-73.9868"
              text="Population Fact Finder Map"
            />
          </Row>
        </Col>
      )
    case 'COMMUNITY':
      return (
        <Col>
          <Row className="mb-2">
            <BaseLink
              href={`https://communityprofiles.planning.nyc.gov${communityToCommunityProfileLink(
                props.currentGeographyId
              )}`}
              text="NYC Planning Community Profile"
            />
          </Row>
          <Row className="mb-2">
            <BaseLink
              href={'https://www1.nyc.gov/site/planning/data-maps/nyc-population/census-2010.page'}
              text="Census & Demographic Data"
            />
          </Row>
          <Row className="mb-2">
            <BaseLink
              href="https://popfactfinder.planning.nyc.gov/#12.25/40.724/-73.9868"
              text="Population Fact Finder Map"
            />
          </Row>
        </Col>
      )
    default:
      return (
        <Col>
          <Row className="mb-2">
            <BaseLink
              href={'https://www1.nyc.gov/site/planning/data-maps/nyc-population/census-2010.page'}
              text="Census & Demographic Data"
            />
          </Row>
          <Row className="mb-2">
            <BaseLink
              href="https://popfactfinder.planning.nyc.gov/#12.25/40.724/-73.9868"
              text="Population Fact Finder Map"
            />
          </Row>
        </Col>
      )
  }
}

GeographyProfile.propTypes = {
  currentGeographyType: PropTypes.string,
  currentGeographyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default GeographyProfile
