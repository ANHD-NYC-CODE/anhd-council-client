import React from 'react'
import PropTypes from 'prop-types'
import { convertConditionMappingToSentence } from 'AdvancedSearch/utilities/sentenceUtils'

const AdvancedSearchSentence = props => {
  return <div className="advanced-search-sentence">{convertConditionMappingToSentence(props.conditions)}</div>
}

AdvancedSearchSentence.propTypes = {
  conditions: PropTypes.object,
}

export default AdvancedSearchSentence
