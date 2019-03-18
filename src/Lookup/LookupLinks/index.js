import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
const LookupLinks = props => {
  return (
    <Card className="lookup-links">
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>
              <BaseLink
                href={`https://whoownswhat.justfix.nyc/bbl/${props.bbl}`}
                text="Other Properties owned by this landlord (Who Owns What)"
              />
            </Card.Text>
          </Col>
        </Row>

        <Row>
          <Col>
            <BaseLink
              href={`https://zola.planning.nyc.gov/lot/${props.bbl.charAt(0)}/${props.bbl.slice(
                1,
                6
              )}/${props.bbl.slice(6, 10)}`}
              text="Zola"
            />
          </Col>
          <Col>
            <BaseLink href={'http://www.oasisnyc.net/map.aspx'} text="Oasis" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

LookupLinks.propTypes = {
  bbl: PropTypes.string,
}

export default LookupLinks
