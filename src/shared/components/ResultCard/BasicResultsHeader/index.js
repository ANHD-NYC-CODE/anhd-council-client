import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
const BasicResultsHeader = props => {
  return (
    <h5 className="basic-results-header">
      {props.label} {props.results.length ? props.results.length : '...'}
    </h5>
  )
}

BasicResultsHeader.defaultProps = {
  results: [],
}

BasicResultsHeader.propTypes = {
  results: PropTypes.array,
}
export default BasicResultsHeader
