import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { constantToModelName } from 'shared/utilities/filterUtils'
import TableHeader from 'shared/components/BaseTable/TableHeader'

import './style.scss'
const RentStabilizationSection = props => {
  return (
    <div>
      {props.profile.rentstabilizationrecord ? (
        <div className="my-4">
          <Row className="rentstabilization-section property-section property-summary-body">
            <Col xs={12} className="my-4">
              <Row>
                <Col>
                  <h5 className="font-weight-bold mb-2">Rent Stabilization</h5>
                  <hr />
                </Col>
              </Row>
              <Row className="lookup-profile-summary__group">
                <Col>
                  <label className="profile-summary-body__label">Stabilized Units (most recent): </label>
                  <span className="profile-summary-body__value">{props.profile.unitsrentstabilized || 0}</span>
                </Col>
              </Row>
              <Row className="lookup-profile-summary__group">
                <Col>
                  <label className="profile-summary-body__label">Change since 2007</label>
                  <span className="profile-summary-body__value">
                    {props.profile.rsunits_percent_lost > 0 ? '+' : ''}
                    {(props.profile.rsunits_percent_lost * 100).toFixed(1) || 0}%
                  </span>
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <TableHeader
                className="property-summary__table-header"
                showUpdate={false}
                title="Rent Stabilization History"
                datasetModelName={constantToModelName('RENT_STABILIZATION_RECORD')}
                size="sm"
              />
              <table className="renstabilization-section__table">
                {Object.keys(props.profile.rentstabilizationrecord)
                  .filter(key => key.includes('uc20'))
                  .map(year => year.replace('uc', ''))
                  .map(year => {
                    if (
                      parseInt(year) >
                      parseInt(
                        (props.config.datasets.find(ds => ds.model_name === 'RentStabilizationRecord') || {}).version
                      )
                    )
                      return
                    return (
                      <Row className="renstabilization-section__table--row" key={`rstable-year-${year}`}>
                        <Col xs={4}>
                          <th>{year}</th>
                        </Col>
                        <Col>
                          <td>{props.profile.rentstabilizationrecord[`uc${year}`]}</td>
                        </Col>
                      </Row>
                    )
                  })
                  .filter(f => f)}
              </table>
            </Col>
          </Row>
        </div>
      ) : (
        <Row className="text-dark text-center font-weight-bold my-4 rentstabilization-section property-section property-summary-body">
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
