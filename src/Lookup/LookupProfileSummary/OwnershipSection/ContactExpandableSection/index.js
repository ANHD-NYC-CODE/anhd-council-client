import React from 'react'
import PropTypes from 'prop-types'
import {
  addStringIfPresent,
  splitCamelCase,
  capitalizeWords,
  expandHpdRegistrationAbbreviations,
} from 'shared/utilities/languageUtils'

import { Row, Col } from 'react-bootstrap'
import ExpandableSection from 'shared/components/ExpandableSection'

import './style.scss'

const constructContactBusinessAddress = contact => {
  if (!contact) return null
  const tokens = [
    capitalizeWords(contact.corporationname),
    capitalizeWords(contact.businesshousenumber),
    capitalizeWords(contact.businessapartment),
    addStringIfPresent(capitalizeWords(contact.businessstreetname), ','),
    capitalizeWords(contact.businesscity),
    contact.businessstate,
    capitalizeWords(contact.businesszip),
  ].filter(t => t)
  return tokens.join(' ')
}

const ContactExpandableSection = props => {
  return (
    <ExpandableSection
      className="contact-expandable-section"
      aboveFoldElement={
        <Row className="ownership-section__hpdcontact-row">
          <Col xs={6} className="profile-summary-body__label">
            {capitalizeWords(splitCamelCase(props.contact.type))}:
          </Col>
          {props.contact && <Col>{capitalizeWords([props.contact.firstname, props.contact.lastname].join(' '))}</Col>}
        </Row>
      }
    >
      <Row className="contact-expandable-section__below-fold-info">
        <Col>
          <Row>
            <Col xs={1} />
            <Col xs={5}>Title:</Col>
            <Col xs={5}>{capitalizeWords(expandHpdRegistrationAbbreviations(props.contact.title)) || 'n/a'}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="contact-expandable-section__below-fold-info">
        <Col>
          <Row>
            <Col xs={1} />
            <Col xs={5}>Business Address:</Col>
            <Col xs={5}>{constructContactBusinessAddress(props.contact) || 'n/a'}</Col>
          </Row>
        </Col>
      </Row>
    </ExpandableSection>
  )
}

ContactExpandableSection.defaultProps = {
  contact: {},
}

ContactExpandableSection.propTypes = {
  contact: PropTypes.object,
}

export default ContactExpandableSection
