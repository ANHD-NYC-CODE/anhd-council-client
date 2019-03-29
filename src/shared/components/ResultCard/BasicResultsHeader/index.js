import React from 'react'
import PropTypes from 'prop-types'

const BasicResultsHeader = props => {
  return (
    <h5>
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
