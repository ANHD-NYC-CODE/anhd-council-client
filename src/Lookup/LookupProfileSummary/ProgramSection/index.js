import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

const getSubsidiesText = props => {
  if (props.profile.subsidyprograms) {
    return [...new Set(props.profile.subsidyprograms.split(', '))].join(', ')
  } else if (props.profile.subsidyj51 || props.profile.subsidy421a) {
    return [
      props.profile.subsidyj51 ? 'J-51 Tax Incentive' : undefined,
      props.profile.subsidy421a ? '421a Tax Incentive Program' : '',
    ].filter(sp => sp)
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
            <h5 className="font-weight-bold">Special Programs / Statuses</h5>
            <hr />
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col>
            <label className="profile-summary-body__label">Subsidy Programs</label>
            <span className="profile-summary-body__value">{getSubsidiesText(props)}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col>
            <label className="profile-summary-body__label">NYCHA? </label>
            <span className="profile-summary-body__value">{props.profile.nycha ? 'Yes' : 'No'}</span>
          </Col>
        </Row>
        <Row className="lookup-profile-summary__group">
          <Col>
            <label className="profile-summary-body__label">
              CONH? ({(props.config.datasets.find(ds => ds.model_name === 'CONHRecord') || {}).version})
            </label>
            <span className="profile-summary-body__value">{props.profile.conhrecord ? 'Yes' : 'No'}</span>
          </Col>
        </Row>
        <Row>
          <Col className="lookup-profile-summary__group">
            <label className="profile-summary-body__label">
              Tax Lien? ({(props.config.datasets.find(ds => ds.model_name === 'TaxLien') || {}).version})
            </label>
            <span className="profile-summary-body__value">{props.profile.taxlien ? 'Yes' : 'No'}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ProgramSection.propTypes = {}

export default ProgramSection
