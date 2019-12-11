import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
const getSubsidiesText = props => {
  if (props.profile.subsidyprograms) {
    return [...new Set(props.profile.subsidyprograms.split(', '))].join(', ')
  } else if (props.profile.subsidyj51 || props.profile.subsidy421a) {
    return [
      props.profile.subsidyj51 ? 'J-51 Tax Incentive' : undefined,
      props.profile.subsidy421a ? '421a Tax Incentive Program' : '',
    ]
      .filter(sp => sp)
      .join(', ')
  } else {
    return 'None'
  }
}

const ProgramSection = props => {
  return (
    <Row className="program-section property-section property-summary-body">
      <Col>
        <Row>
          <Col>
            <h5 className="font-weight-bold">Programs / Statuses</h5>
            <hr />
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col>
            <span className="profile-summary-body__label">Subsidy Programs </span>
            <small>
              (from <BaseLink href="http://app.coredata.nyc">Furman's CoreData</BaseLink> and DOF's{' '}
              <BaseLink href="https://www1.nyc.gov/site/finance/benefits/benefits-421a.page">421a</BaseLink> and{' '}
              <BaseLink href="https://www1.nyc.gov/site/finance/benefits/benefits-j51.page">J-51</BaseLink> data)
            </small>
            <ul>
              {getSubsidiesText(props)
                .split(',')
                .map(program => {
                  return (
                    <li key={`${props.profile.bbl} - ${program}`} className="profile-summary-body__value">
                      {program}
                    </li>
                  )
                })}
            </ul>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col>
            <span className="profile-summary-body__value">
              {props.profile.nycha && (
                <span className="text-danger font-weight-bold">
                  This property is a{' '}
                  <BaseLink href="https://www1.nyc.gov/site/nycha/about/developments.page">NYCHA development.</BaseLink>
                </span>
              )}
            </span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col>
            <span className="profile-summary-body__value">
              {props.profile.conhrecord && (
                <span className="text-danger font-weight-bold">
                  A building on this property is eligible for the{' '}
                  <BaseLink href="https://www1.nyc.gov/site/hpd/owners/certification-of-no-harassment.page">
                    Certificate of No Harassment Pilot Program.
                  </BaseLink>
                </span>
              )}
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="lookup-profile-summary__group">
            {/* <label className="profile-summary-body__label">
              Tax Lien? ({(props.config.datasets.find(ds => ds.model_name === 'TaxLien') || {}).version})
            </label> */}
            <span className="profile-summary-body__value">
              {props.profile.taxlien && (
                <span className="text-danger font-weight-bold">
                  This property is subject to a{' '}
                  <BaseLink href="https://www1.nyc.gov/site/finance/taxes/property-lien-sales.page">tax lien</BaseLink>{' '}
                  as of the most recent data.
                </span>
              )}
            </span>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ProgramSection.propTypes = {}

export default ProgramSection
