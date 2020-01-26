import React from 'react'
import PropTypes from 'prop-types'

import * as c from 'shared/constants'
import { formatNumber } from 'shared/utilities/languageUtils'

import StandardizedInput from 'shared/classes/StandardizedInput'

import { mapFilterDateToLabel, longAmountComparisonString } from 'shared/utilities/languageUtils'

import Property from 'shared/models/resources/Property'

import './style.scss'

const AdvancedSearchSentenceEditor = props => {
  const numberOfUnits = props.results.reduce((total, result) => parseInt(total) + parseInt(result['unitsres']), 0)

  const constructSentenceEditor = () => {
    return '...'
  }

  return (
    <div className="advanced-search-sentence-editor">
      <div className="advanced-search-sentence-editor__sentence-section">
        {constructSentenceEditor(
          props.housingTypeResultFilter,
          props.selectedFilters,
          props.mapFilterDate,
          props.filterCondition
        )}
      </div>
      <div className="advanced-search-sentence-editor__inner-wrapper">
        <div className="advanced-search-sentence-editor__group">
          <span className="advanced-search-sentence-editor__label">Properties:</span>{' '}
          <span className="advanced-search-sentence-editor__value">{formatNumber(props.results.length)}</span>
        </div>
        <div className="advanced-search-sentence-editor__group">
          <span className="advanced-search-sentence-editor__label">Units:</span>{' '}
          <span className="advanced-search-sentence-editor__value">{formatNumber(numberOfUnits)}</span>
        </div>
      </div>
    </div>
  )
}

AdvancedSearchSentenceEditor.propTypes = {
  dispatch: PropTypes.func,
  results: PropTypes.array,
  loading: PropTypes.bool,
}
AdvancedSearchSentenceEditor.defaultProps = {
  results: [],
  loading: false,
}

export default AdvancedSearchSentenceEditor
