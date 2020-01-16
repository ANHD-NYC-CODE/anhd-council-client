import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { formatNumber } from 'shared/utilities/languageUtils'

import './style.scss'
const DashboardResultsHeader = props => {
  const numberOfUnits = props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres']), 0)
  const totalDistrictUnits = props.totalResults.reduce(
    (total, result) => parseInt(total) + parseInt(result['unitsres']),
    0
  )
  return (
    <div className="dashboard-results-header">
      <div className="dashboard-results-header__wrapper">
        <p className="dashboard-results-header__title">{props.label}</p>
        <div className="dashboard-results-header__inner-wrapper">
          <div className="dashboard-results-header__group">
            <span className="dashboard-results-header__label">Properties Found:</span>{' '}
            <span className="dashboard-results-header__value">{formatNumber(props.results.length)}</span>
          </div>
          <div className="dashboard-results-header__group">
            <span className="dashboard-results-header__label">Units:</span>{' '}
            <span className="dashboard-results-header__value">{formatNumber(numberOfUnits)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

DashboardResultsHeader.propTypes = {
  label: PropTypes.string,
  percentageOfWhole: PropTypes.bool,
  results: PropTypes.array,
  totalResults: PropTypes.array,
}
DashboardResultsHeader.defaultProps = {
  percentageOfWhole: false,
  results: [],
  totalResults: [],
}

export default DashboardResultsHeader
