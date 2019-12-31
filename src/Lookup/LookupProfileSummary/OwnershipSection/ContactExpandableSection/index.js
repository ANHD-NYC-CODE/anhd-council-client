import React from 'react'
import PropTypes from 'prop-types'
import {
  addStringIfPresent,
  splitCamelCase,
  capitalizeWords,
  expandHpdRegistrationAbbreviations,
} from 'shared/utilities/languageUtils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
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
      iconClass="contact-expandable-section__icon"
      collapseIcon={<FontAwesomeIcon size="" icon={faChevronUp} />}
      expandIcon={<FontAwesomeIcon size="" icon={faChevronDown} />}
      aboveFoldElement={
        <div className="ownership-section__hpdcontact-row">
          <div className="profile-summary-body__label">{capitalizeWords(splitCamelCase(props.contact.type))}:</div>
          {props.contact && <div>{capitalizeWords([props.contact.firstname, props.contact.lastname].join(' '))}</div>}
        </div>
      }
    >
      <div className="contact-expandable-section__below-fold-info">
        <div className="contact-expandable-section__section__label">Title:</div>
        <div className="contact-expandable-section__value">
          {capitalizeWords(expandHpdRegistrationAbbreviations(props.contact.title)) || 'n/a'}
        </div>
      </div>
      <div className="contact-expandable-section__below-fold-info">
        <div className="contact-expandable-section__section__label">Business Address:</div>
        <div className="contact-expandable-section__value">
          {constructContactBusinessAddress(props.contact) || 'n/a'}
        </div>
      </div>
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
