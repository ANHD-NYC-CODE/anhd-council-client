import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { dateFormatter } from 'shared/utilities/tableUtils'
import { capitalizeWords } from 'shared/utilities/languageUtils'
import BaseLink from 'shared/components/BaseLink'
import './style.scss'
const getLatestHPDRegistration = hpdRegistrations => {
  if (!hpdRegistrations.length) return
  return hpdRegistrations.sort((a, b) => b.lastregistrationdate > a.lastregistrationdate)[0]
}

const OwnershipSection = props => {
  const latestHPDRegistration = getLatestHPDRegistration(props.profile.hpdregistrations)
  let siteManager
  let headOfficer
  let agent
  if (latestHPDRegistration) {
    siteManager = latestHPDRegistration.contacts.find(contact =>
      contact.type ? contact.type.toLowerCase().replace(' ', '') == 'sitemanager' : null
    )
    headOfficer = latestHPDRegistration.contacts.find(contact =>
      contact.type ? contact.type.toLowerCase().replace(' ', '') == 'headofficer' : null
    )
    agent = latestHPDRegistration.contacts.find(contact =>
      contact.type ? contact.type.toLowerCase().replace(' ', '') == 'agent' : null
    )
  }
  return (
    <Row className="ownership-section my-4">
      <Col>
        {latestHPDRegistration ? (
          <Row>
            <Col>
              <Row>
                <Col>
                  <span className="d-block">
                    <h5 className="property-summary__table-header text-light font-weight-bold d-inline">
                      HPD Registration
                    </h5>
                    <span className="text-light"> ({dateFormatter(latestHPDRegistration.lastregistrationdate)})</span>
                  </span>
                </Col>
              </Row>
              <hr />

              <Row className="ownership-section__hpdcontact-row">
                <Col xs={5} className="profile-summary-body__label">
                  Site Manager:
                </Col>
                {siteManager && <Col>{capitalizeWords([siteManager.firstname, siteManager.lastname].join(' '))}</Col>}
              </Row>
              <Row className="ownership-section__hpdcontact-row">
                <Col xs={5} className="profile-summary-body__label">
                  Head Officer:
                </Col>
                {headOfficer && <Col>{capitalizeWords([headOfficer.firstname, headOfficer.lastname].join(' '))}</Col>}
              </Row>
              <Row className="ownership-section__hpdcontact-row">
                <Col xs={5} className="profile-summary-body__label">
                  Agent:
                </Col>
                {agent && <Col>{capitalizeWords([agent.firstname, agent.lastname].join(' '))}</Col>}
              </Row>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="text-info text-center font-weight-bold my-4">No HPD Registrations Found</Col>
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

OwnershipSection.propTypes = {}

export default OwnershipSection
