import React from 'react'
import PropTypes from 'prop-types'
import { constructSentence } from 'AdvancedSearch/utilities/sentenceUtils'

export const AdvancedSearchSentence = props => {
  return <div className="advanced-search__sentence">{constructSentence(props.advancedSearch)}</div>
}

AdvancedSearchSentence.propTypes = {
  advancedSearch: PropTypes.object,
}

export default AdvancedSearchSentence
