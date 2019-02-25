import React from 'react'
import PropTypes from 'prop-types'
import { convertConditionMappingToSentence } from 'shared/utilities/advancedSearchUtils'

const AdvancedSearchSentence = props => {
  return <div className="advanced-search-sentence">{convertConditionMappingToSentence(props.conditions)}</div>
}

AdvancedSearchSentence.propTypes = {
  conditions: PropTypes.array,
}

export default AdvancedSearchSentence
