import React from 'react'
import PropTypes from 'prop-types'

import { formatNumber } from 'shared/utilities/languageUtils'
import './style.scss'

const DashboardResultsHeader = props => {
  const numberOfUnits = props.housingResults.reduce(
    (total, result) => parseInt(total) + parseInt(result['unitsres']),
    0
  )

  return (
    <div className="dashboard-results-header" data-test-id="dashboard-results-header">
      <div className="dashboard-results-header__wrapper">
        <div className="dashboard-results-header__inner-wrapper">
          <p className="dashboard-results-header__title">{props.label}</p>
          <div className="dashboard-results-header__units-group">
            <div className="dashboard-results-header__group">
              <span className="dashboard-results-header__label">Properties:</span>{' '}
              <span className="dashboard-results-header__value">{formatNumber(props.housingResults.length)}</span>
            </div>
            <div className="dashboard-results-header__group">
              <span className="dashboard-results-header__label">Units:</span>{' '}
              <span className="dashboard-results-header__value">{formatNumber(numberOfUnits)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DashboardResultsHeader.propTypes = {
  label: PropTypes.string,
  percentageOfWhole: PropTypes.bool,
  housingResults: PropTypes.array,
  totalResults: PropTypes.array,
}
DashboardResultsHeader.defaultProps = {
  percentageOfWhole: false,
  housingResults: [],
  totalResults: [],
}

export default DashboardResultsHeader
