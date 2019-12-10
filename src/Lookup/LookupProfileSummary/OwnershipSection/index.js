import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { dateFormatter } from 'shared/utilities/tableUtils'
import { capitalizeWords } from 'shared/utilities/languageUtils'
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
    <Row className="ownership-section property-section property-summary-body my-4">
      <Col>
        {latestHPDRegistration ? (
          <Row>
            <Col>
              <Row>
                <Col>
                  <span className="d-block">
                    <h5 className="property-summary__table-header  font-weight-bold d-inline">HPD Registration</h5>
                    <span className="">
                      {' '}
                      (last updated {dateFormatter(latestHPDRegistration.lastregistrationdate)})
                    </span>
                  </span>
                </Col>
              </Row>
              <hr />
              {headOfficer && <ContactExpandableSection contact={headOfficer} />}
              {siteManager && <ContactExpandableSection contact={siteManager} />}
              {officer && <ContactExpandableSection contact={officer} />}
              {agent && <ContactExpandableSection contact={agent} />}
              {ownershipType && (
                <div>
                  This property's ownership type is <strong>{capitalizeWords(ownershipType)}</strong>.
                </div>
              )}
              {props.profile.ownername && (
                <div>
                  The owner on record with the DOF is <strong>{capitalizeWords(props.profile.ownername)}</strong>.
                </div>
              )}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="text-dark text-center font-weight-bold my-4">No HPD Registrations Found</Col>
          </Row>
        )}
        <hr />
        <Row>
          {!props.print && (
            <Col xs={12} className="mb-2 ownership-section__hpdcontact__whoownswhat">
              <BaseLink href={`https://whoownswhat.justfix.nyc/bbl/${props.profile.bbl}`}>
                For more on ownership visit <b>"Who Owns What?"</b>
              </BaseLink>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  )
}

OwnershipSection.defaultProps = {
  profile: {},
}

OwnershipSection.propTypes = {
  profile: PropTypes.object,
}

export default OwnershipSection
