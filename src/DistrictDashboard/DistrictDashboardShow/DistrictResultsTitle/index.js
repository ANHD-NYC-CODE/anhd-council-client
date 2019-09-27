import React from 'react'
import PropTypes from 'prop-types'
import * as c from 'shared/constants'

const DistrictResultsTitle = props => {
  return (props.displayedRequest || {}).type === c.ADVANCED_SEARCH ? (
    <h5 className="font-weight-bold text-uppercase mb-4">Custom Search</h5>
  ) : (
    <h5 className="font-weight-bold text-uppercase mb-4">
      Properties Found: {props.records.length}
      {/* {constructSummaryFilterSentence({ request: props.displayedRequest, resultsFilter: props.displayedResultsFilter })} */}
    </h5>
  )
}

DistrictResultsTitle.propTypes = {
  displayedRequest: PropTypes.object,
  displayedResultsFilter: PropTypes.object,
  records: PropTypes.array,
}

export default DistrictResultsTitle
