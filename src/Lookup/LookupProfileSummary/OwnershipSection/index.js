import React from 'react'
import PropTypes from 'prop-types'
import { dateFormatter } from 'shared/utilities/tableUtils'
import { capitalizeWords, expandHpdRegistrationAbbreviations } from 'shared/utilities/languageUtils'
import BaseLink from 'shared/components/BaseLink'
import ContactExpandableSection from 'Lookup/LookupProfileSummary/OwnershipSection/ContactExpandableSection'

import './style.scss'
const getLatestHPDRegistration = hpdRegistrations => {
  if (!hpdRegistrations.length) return
  return hpdRegistrations.sort((a, b) => b.lastregistrationdate > a.lastregistrationdate)[0]
}

const OwnershipSection = props => {
  const latestHPDRegistration = getLatestHPDRegistration(props.profile.hpdregistrations)
  let headOfficer
  let siteManager
  let officer
  let agent
  let ownershipType

  if (latestHPDRegistration) {
    headOfficer = latestHPDRegistration.contacts.find(contact =>
      contact.type ? contact.type.toLowerCase().replace(' ', '') == 'headofficer' : null
    )
    siteManager = latestHPDRegistration.contacts.find(contact =>
      contact.type ? contact.type.toLowerCase().replace(' ', '') == 'sitemanager' : null
    )
    officer = latestHPDRegistration.contacts.find(contact =>
      contact.type ? contact.type.toLowerCase().replace(' ', '') == 'officer' : null
    )
    agent = latestHPDRegistration.contacts.find(contact =>
      contact.type ? contact.type.toLowerCase().replace(' ', '') == 'agent' : null
    )

    ownershipType =
      (siteManager || {}).contactdescription ||
      (headOfficer || {}).contactdescription ||
      (officer || {}).contactdescription ||
      (agent || {}).contactdescription
  }

  return (
    <div className="ownership-section property-section property-summary-body">
      {latestHPDRegistration ? (
        <div>
          <div className="ownership-section__update-section">
            Last updated {dateFormatter(latestHPDRegistration.lastregistrationdate)}
          </div>
          <div className="ownership-section__contacts-section">
            {headOfficer && <ContactExpandableSection contact={headOfficer} />}
            {siteManager && <ContactExpandableSection contact={siteManager} />}
            {officer && <ContactExpandableSection contact={officer} />}
            {agent && <ContactExpandableSection contact={agent} />}
          </div>
          <div className="ownership-section__bottom-section">
            {ownershipType && (
              <div className="ownership-section__bottom-value">
                This property's ownership type is{' '}
                <strong>{capitalizeWords(expandHpdRegistrationAbbreviations(ownershipType))}</strong>.
              </div>
            )}
            {props.profile.ownername && (
              <div className="ownership-section__bottom-value">
                The owner on record with the DOF is <strong>{capitalizeWords(props.profile.ownername)}</strong>.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="ownership-section__bottom-section">
          <div className="text-center font-weight-bold mt-4">
            No HPD Registrations Found
            <hr />
          </div>
          <div>
            {props.profile.ownername && (
              <div className="ownership-section__bottom-value">
                The owner on record with the DOF is <strong>{capitalizeWords(props.profile.ownername)}</strong>.
              </div>
            )}
          </div>
        </div>
      )}
      <div className="ownership-section__bottom-section">
        <div className="ownership-section__bottom-value">
          There are <strong>{props.wowData['bldgs'] || '0'}</strong> buildings associated with this property's owner.
        </div>
        <div className="ownership-section__bottom-value">
          For more on ownership visit{' '}
          <BaseLink className="text-link" href={`https://whoownswhat.justfix.nyc/bbl/${props.profile.bbl}`}>
            Who Owns What?
          </BaseLink>
        </div>
      </div>
    </div>
  )
}

OwnershipSection.defaultProps = {
  profile: {},
  wowData: {},
}

OwnershipSection.propTypes = {
  profile: PropTypes.object,
  wowData: PropTypes.object,
}

export default OwnershipSection
