import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/InnerLoader'

import TableAlert from 'shared/components/BaseTable/TableAlert'

import { Card, Row, Col } from 'react-bootstrap'
import './style.scss'

const LookupProfileSummary = props => {
  if (props.loading) {
    return <InnerLoader />
  } else if (props.error) {
    return <TableAlert message={props.error.messge} />
  } else if (Object.keys(props.records).length) {
    const profile = props.records
    return (
      <Card className="lookup-profile-summary">
        <Card.Body className="lookup-profile-summary__body">
          <Row>
            <Col xs={6}>
              {profile.hpdcontacts.length ? (
                <div>HPD CONTACTS FOUND</div>
              ) : (
                <Card.Text className="lookup-profile-summary__group">
                  <label className="lookup-profile-summary__label--block">Owner Name: </label>
                  <span className="lookup-profile-summary__value">{profile.ownername}</span>
                </Card.Text>
              )}
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">Year Built: </label>
                <span className="lookup-profile-summary__value">{profile.yearbuilt}</span>
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">Zoning: </label>
                <span className="lookup-profile-summary__value">{profile.zonedist1}</span>
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">NYCHA? </label>
                <span className="lookup-profile-summary__value">{profile.nycha ? 'Yes' : 'No'}</span>
              </Card.Text>
            </Col>
            <Col xs={6}>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">BBL: </label>
                <span className="lookup-profile-summary__value">{profile.bbl}</span>
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">Total Units: </label>
                <span className="lookup-profile-summary__value">{profile.totalunits || 0}</span>
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">Residential Units: </label>
                <span className="lookup-profile-summary__value">{profile.unitsres || 0}</span>
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">Stabilized Units: </label>
                <span className="lookup-profile-summary__value">{profile.unitsrentstabilized || 0}</span>
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">Tax Lien? </label>
                <span className="lookup-profile-summary__value">{profile.taxliens || 'No'}</span>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  } else {
    return null
  }
}
LookupProfileSummary.propTypes = {
  records: {},
}

LookupProfileSummary.propTypes = {
  records: PropTypes.object,
}

export default LookupProfileSummary
