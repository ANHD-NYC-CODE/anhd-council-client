import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import InfoModalButton from 'shared/components/InfoModalButton'

import './style.scss'

const sortedLimitedYears = props => {
  const years = Object.keys(props.profile.rentstabilizationrecord)
    .filter(key => key.includes('uc20'))
    .map(year => year.replace('uc', ''))
    .filter(year => {
      let maxYear = parseInt(
        (props.config.datasets.find(ds => ds.model_name === 'RentStabilizationRecord') || {}).version
      )
      if (isNaN(maxYear)) {
        maxYear = parseInt(
          moment(moment.now())
            .subtract(1, 'year')
            .year()
        )
      }
      return parseInt(year) <= maxYear
    })
    .map(year => parseInt(year))
    .sort()

  return years
}

const RentStabilizationSection = props => {
  return props.profile.rentstabilizationrecord ? (
    <div className="rentstabilization-section property-section property-summary-body">
      <div className="rentstabilization-section__top-section">
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Stabilized Units (most recent): </span>
          <span className="profile-summary-body__value">{props.profile.unitsrentstabilized || 0}</span>
        </div>
        <div className="lookup-profile-summary__group">
          <span className="profile-summary-body__label">Change since 2007</span>
          <span className="profile-summary-body__value">
            {props.profile.rsunits_percent_lost > 0 ? '+' : ''}
            {(props.profile.rsunits_percent_lost * 100).toFixed(1) || 0}%
          </span>
        </div>
      </div>
      <div>
        <div className="renstabilization-section__table-header">
          <h6 className="profile-summary-body__label">
            # Stabilized Units{' '}
            <InfoModalButton className="lookup-profile-summary__info" modalConstant="LOOKUP_STABILIZATION" />
          </h6>
        </div>
        <table className="renstabilization-section__table">
          <tbody>
            {sortedLimitedYears(props)
              .map(year => {
                return (
                  <tr className="renstabilization-section__table--row" key={`rstable-year-${year}`}>
                    <th>{year}</th>
                    <td>{props.profile.rentstabilizationrecord[`uc${year}`]}</td>
                  </tr>
                )
              })
              .filter(f => f)}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="rentstabilization-section property-section property-summary-body">
      <div>No Rent Stabilization History</div>
    </div>
  )
}

RentStabilizationSection.propTypes = {
  profile: PropTypes.object,
  dispatch: PropTypes.func,
  request: PropTypes.object,
}

export default RentStabilizationSection
