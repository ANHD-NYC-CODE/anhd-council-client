import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { constantToModelName } from 'shared/utilities/filterUtils'
import TableHeader from 'shared/components/BaseTable/TableHeader'

import BaseTable from 'shared/components/BaseTable'
import { getTableColumns } from 'shared/models/tables'
import TableConfig from 'shared/classes/TableConfig'
const RentStabilizationSection = props => {
  return (
    <div>
      {props.profile.rentstabilizationrecord ? (
        <div className="my-4">
          <Row className="property-section property-summary-body">
            <Col>
              <Row>
                <Col>
                  <h5 className="font-weight-bold mb-2">Rent Stabilization</h5>
                  <hr />
                </Col>
              </Row>
              <Row className="lookup-profile-summary__group">
                <Col>
                  <label className="profile-summary-body__label">
                    Stabilized Units (
                    {(props.config.datasets.find(ds => ds.model_name === 'RentStabilizationRecord') || {}).version}):{' '}
                  </label>
                  <span className="profile-summary-body__value">{props.profile.unitsrentstabilized || 0}</span>
                </Col>
              </Row>
              <Row className="lookup-profile-summary__group">
                <Col>
                  <label className="profile-summary-body__label">Change since 2007: </label>
                  <span className="profile-summary-body__value">
                    {(props.profile.rsunits_percent_lost * 100).toFixed(2) || 0}%
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="my-4">
            <Col>
              <TableHeader
                className="property-summary__table-header"
                showUpdate={false}
                title="Rent Stabilization History"
                datasetModelName={constantToModelName('RENT_STABILIZATION_RECORD')}
                size="sm"
              />
              <BaseTable
                expandable={false}
                wrapperClasses="text-dark property-summary__table"
                columns={getTableColumns('RENT_STABILIZATION_RECORD')}
                dispatch={props.dispatch}
                records={[props.profile.rentstabilizationrecord]}
                request={props.request}
                tableConfig={new TableConfig({ resourceConstant: 'RENT_STABILIZATION_RECORD' })}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <Row className="text-info text-center font-weight-bold my-4">
          <Col>No Rent Stabilization History</Col>
        </Row>
      )}
    </div>
  )
}

RentStabilizationSection.propTypes = {
  profile: PropTypes.object,
  dispatch: PropTypes.func,
  request: PropTypes.object,
}

export default RentStabilizationSection
