import React from 'react'
import PropTypes from 'prop-types'
import InnerLoader from 'shared/components/InnerLoader'

import TableAlert from 'shared/components/BaseTable/TableAlert'
import { boroCodeToName, constructAddressString } from 'shared/utilities/languageUtils'
import { councilIdToString, communityIdToString } from 'shared/utilities/languageUtils'
import { geographyToLink } from 'shared/utilities/routeUtils'
import BaseLink from 'shared/components/BaseLink'
import BaseTable from 'shared/components/BaseTable'
import { getTableColumns } from 'shared/models/tables'
import { TableConfig } from 'shared/classes/TableConfig'
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
            <Col xs={12}>
              <Row>
                <Col>
                  <h5>
                    {constructAddressString({
                      street: profile.address,
                      borough: boroCodeToName(profile.borough),
                      zip: profile.zipcode,
                    })}
                  </h5>
                </Col>
              </Row>
            </Col>
            <Col xs={6}>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label--block">Owner Name: </label>
                <span className="lookup-profile-summary__value">{profile.ownername}</span>
              </Card.Text>

              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">Year Built: </label>
                <span className="lookup-profile-summary__value">{profile.yearbuilt}</span>
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label">Zoning: </label>
                <span className="lookup-profile-summary__value">{profile.zonedist1}</span>
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <label className="lookup-profile-summary__label--block">Rent Programs: </label>
                <span className="lookup-profile-summary__value">
                  {profile.coresubsidyrecords.length
                    ? profile.coresubsidyrecords.map(record => record.programname).join(' ')
                    : ''}
                </span>
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
                <span className="lookup-profile-summary__value">{profile.unitstotal || 0}</span>
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
          <Row>
            <Col>
              {profile.hpdregistrations.length ? (
                <div>
                  <Card.Text>HPD Registrations</Card.Text>
                  <BaseTable
                    classes="fluid-table"
                    columns={getTableColumns('HPD_REGISTRATION')}
                    records={profile.hpdregistrations}
                    tableConfig={new TableConfig({ resourceConstant: 'HPD_REGISTRATION' })}
                  />
                </div>
              ) : (
                <Card.Text>No HPD Registrations Found</Card.Text>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text className="lookup-profile-summary__group">
                <BaseLink
                  href={geographyToLink('COUNCIL', profile.council)}
                  text={councilIdToString(profile.council)}
                />
              </Card.Text>
              <Card.Text className="lookup-profile-summary__group">
                <BaseLink
                  href={geographyToLink('COMMUNITY', profile.cd)}
                  text={`Community District  ${communityIdToString(profile.cd)}`}
                />
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
