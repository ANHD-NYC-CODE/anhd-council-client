import React from 'react'
import PropTypes from 'prop-types'
import { constructSummaryFilterSentence } from 'shared/utilities/sentenceUtils'

const DistrictResultsTitle = props => {
  return (props.displayedRequest || {}).type === 'ADVANCED_SEARCH' ? (
    <h5 className="font-weight-bold text-uppercase mb-4">Custom Search</h5>
  ) : (
    <h5 className="font-weight-bold text-uppercase mb-4">
      {constructSummaryFilterSentence(props.displayedRequest, props.displayedResultsFilter)}
    </h5>
  )
}

DistrictResultsTitle.propTypes = {
  displayedRequest: PropTypes.object,
  displayedResultsFilter: PropTypes.object,
}

export default DistrictResultsTitle
