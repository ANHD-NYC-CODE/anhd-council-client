import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import BaseTable from 'shared/components/BaseTable'
import TableHeader from 'shared/components/BaseTable/TableHeader'
import { constantToModelName } from 'shared/utilities/filterUtils'
import { getTableColumns } from 'shared/models/tables'
import TableConfig from 'shared/classes/TableConfig'

const OwnershipSection = props => {
  return (
    <div>
      <Row className="property-section property-summary-body my-4">
        <Col>
          <Row>
            <Col>
              <h5 className="text-dark">Ownership</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="profile-summary-body__label">Owner Name:&nbsp;</label>
              <span className="profile-summary-body__value">{props.profile.ownername}</span>
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              <BaseLink
                className="lookup-links__link"
                href={`https://whoownswhat.justfix.nyc/bbl/${props.profile.bbl}`}
                text="View more at Who Owns What?"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          {props.profile.hpdregistrations.length ? (
            <Row>
              <Col>
                <Row>
                  <h5 className="text-light">HPD Registrations</h5>
                </Row>
                <Row>
                  <BaseTable
                    classes="fluid-table"
                    wrapperClasses="text-dark property-summary__table"
                    columns={getTableColumns('HPD_REGISTRATION')}
                    dispatch={props.dispatch}
                    records={props.profile.hpdregistrations}
                    request={props.request}
                    includeHeader={false}
                    tableConfig={new TableConfig({ resourceConstant: 'HPD_REGISTRATION' })}
                  />
                </Row>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className="text-info text-center font-weight-bold my-4">No HPD Registrations Found</Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  )
}

OwnershipSection.propTypes = {}

export default OwnershipSection
