import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { geographySelectionToString } from 'shared/utilities/languageUtils'
import { communityToCommunityProfileLink } from 'shared/utilities/routeUtils'
import BaseLink from 'shared/components/BaseLink'
const GeographyProfile = props => {
  return (
    <Card className="geography-links">
      <Card.Body>
        <Card.Title>
          {geographySelectionToString({ type: props.currentGeographyType, id: props.currentGeographyId })}
        </Card.Title>
        {renderLinks(props)}
      </Card.Body>
    </Card>
  )
}

const renderLinks = props => {
  switch (props.currentGeographyType) {
    case 'COUNCIL':
      return (
        <Col>
          <Row>
            <Button
              as={BaseLink}
              href={'https://www1.nyc.gov/site/planning/data-maps/nyc-population/census-2010.page'}
              text="Census & Demographic Data"
            />
          </Row>
          <Row>
            <Button
              as={BaseLink}
              href="https://popfactfinder.planning.nyc.gov/#12.25/40.724/-73.9868"
              text="Population Fact Finder Map"
            />
          </Row>
        </Col>
      )
    case 'COMMUNITY':
      return (
        <Col>
          <Row>
            <Button
              as={BaseLink}
              href={`https://communityprofiles.planning.nyc.gov${communityToCommunityProfileLink(
                props.currentGeographyId
              )}`}
              text="NYC Planning Community Profile"
            />
          </Row>
          <Row>
            <Button
              as={BaseLink}
              href={'https://www1.nyc.gov/site/planning/data-maps/nyc-population/census-2010.page'}
              text="Census & Demographic Data"
            />
          </Row>
          <Row>
            <Button
              as={BaseLink}
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
  currentGeographyId: PropTypes.string,
}

export default GeographyProfile
