import React, { useState } from 'react'
import PropTypes from 'prop-types'

const DashboardResultsHeader = props => {
  const numberOfUnits = props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres']), 0)
  const totalDistrictUnits = props.totalResults.reduce(
    (total, result) => parseInt(total) + parseInt(result['unitsres']),
    0
  )
  return (
    <div className="dashboard-results-header">
      <div className="housingtype-summary-result-card__wrapper">
        <h5 className="housingtype-summary-result-card__title">{props.label}</h5>
        <div className="housingtype-summary-result-card__inner-wrapper">
          <div className="">
            <p>
              <span className="">{props.results.length}</span> <span className="summary-units">properties</span>
            </p>
            <p>
              <span className="">{numberOfUnits}</span> <span className="summary-units">units</span>
            </p>
          </div>
          {props.percentageOfWhole && !!props.totalResults.length && (
            <div className="">
              <h5 className="">{`${((numberOfUnits / totalDistrictUnits) * 100).toFixed(1)}%`} </h5>
            </div>
          )}
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
