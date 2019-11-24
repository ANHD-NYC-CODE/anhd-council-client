import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'

const DistrictResultsTitle = props => {
  return <h5 className="font-weight-bold text-uppercase mb-4">Properties Found: {props.records.length}</h5>
}

DistrictResultsTitle.propTypes = {
  records: PropTypes.array,
}

export default DistrictResultsTitle
