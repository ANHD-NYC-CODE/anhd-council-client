import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import BaseLink from 'shared/components/BaseLink'
import BaseTable from 'shared/components/BaseTable'

import { getTableColumns } from 'shared/models/tables'
import TableConfig from 'shared/classes/TableConfig'

const OwnershipSection = props => {
  return (
    <Row className="ownership-section my-4">
      <Col>
        {props.profile.hpdregistrations.length ? (
          <Row>
            <Col>
              <Row>
                <Col>
                  <h5 className="property-summary__table-header text-light">HPD Registrations</h5>
                </Col>
              </Row>
              <Row>
                <Col>
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
                </Col>
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
  )
}

OwnershipSection.propTypes = {}

export default OwnershipSection
